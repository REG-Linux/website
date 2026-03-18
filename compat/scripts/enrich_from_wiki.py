#!/usr/bin/env python3
"""Enrich _data/devices.yml with hardware specs and feature data from wiki pages.

Parses wiki/docs/handhelds/**/*.md and wiki/docs/sbcs/**/*.md to extract:
  - Display size + resolution
  - RAM
  - Storage (eMMC)
  - WiFi/BT chip info
  - Compositor
  - has_fan
  - Feature support → pre-seed test_results SQL

Run from the website repo root:
    python3 compat/scripts/enrich_from_wiki.py [--dry-run]
"""

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[2]
WIKI_DOCS = REPO_ROOT / "wiki" / "docs"
DEVICES_YML = REPO_ROOT / "_data" / "devices.yml"
SEED_SQL_OUT = Path(__file__).resolve().parent / "seed_wiki_results.sql"

# ---------------------------------------------------------------------------
# Wiki slug → devices.yml ID mapping
# Wiki pages use different naming than devices.yml in many cases.
# ---------------------------------------------------------------------------
WIKI_SLUG_TO_DEVICE_IDS = {
    # Anbernic pages that cover multiple devices
    "rg35xx-plus": ["anbernic-rg35xx-plus"],
    "rg35xx-h": ["anbernic-rg35xx-h"],
    "rg35xx-2024": ["anbernic-rg35xx-2024"],
    "rg35xx-sp": ["anbernic-rg35xx-sp"],
    "rg35xx-pro": ["anbernic-rg35xx-pro"],
    "rg40xx-h": ["anbernic-rg40xx-h"],
    "rg40xx-v": ["anbernic-rg40xx-v"],
    "rg28xx": ["anbernic-rg28xx"],
    "rg34xx": ["anbernic-rg34xx"],
    "rg-cubexx": ["anbernic-rg-cubexx"],
    "rg353pmvvs": ["anbernic-rg353p-s", "anbernic-rg353m", "anbernic-rg353v-s"],
    "rg503": ["anbernic-rg503"],
    "rg351pmv": ["anbernic-rg351-p-m-mp", "anbernic-rg351v"],
    "rg552": ["anbernic-rg552"],
    "rgarc": ["anbernic-rgarc"],
    "rg-ds": ["anbernic-rg-ds"],
    # Powkiddy
    "rgb30": ["powkiddy-rgb30"],
    "rgb10": ["powkiddy-rgb10", "powkiddy-rgb10x"],
    "rgb20-pro": ["powkiddy-rgb20-pro"],
    "rgb20sx": ["powkiddy-rgb20sx"],
    "rgb10-max-3": ["powkiddy-rgb10-max-3"],
    "rgb10-max-3-pro": ["powkiddy-rgb10-max-3-pro"],
    "rk2023": ["powkiddy-rk2023"],
    "x55": ["powkiddy-x55"],
    "x35h": ["powkiddy-x35h"],
    "x35s": ["powkiddy-x35s"],
    "xu10": ["powkiddy-xu10"],
    # Hardkernel
    "odroid-go-advance": ["hardkernel-odroid-go-advance"],
    "odroid-go-super": ["hardkernel-odroid-go-super"],
    "odroid-go-ultra": ["hardkernel-odroid-go-ultra"],
    # Others
    "gameforce-ace": ["gameforce-ace"],
    "gameforce-chi": ["gameforce-chi"],
    "xu-mini-m": ["magicx-xu-mini-m"],
    "game-console-r35s-r36s": ["unbranded-game-console-r35s-r36s"],
    "game-console-r33s": ["unbranded-game-console-r33s"],
    "rk3326-clones": ["unbranded-rk3326-clones"],
    "odin2": ["ayn-odin2"],
    "pockets": ["ayaneo-pockets"],
    "retroid-pocket-5": ["retroid-pocket-5"],
    "retroid-pocket-mini": ["retroid-pocket-mini"],
    "retroid-pocket-flip2": ["retroid-pocket-flip2"],
    "steam-deck": ["steam-deck"],
    "asus-rog-ally": ["asus-rog-ally"],
    # SBCs (filename without .md → device ID mapping)
    "raspberry-pi-4": ["raspberry-pi-4"],
    "raspberry-pi-5": ["raspberry-pi-5"],
    "raspberry-pi-400": ["raspberry-pi-400"],
    "raspberry-pi-3": ["raspberry-pi-3"],
    "raspberry-pi-2": ["raspberry-pi-2"],
    "raspberry-pi-zero": ["raspberry-pi-zero"],
    "raspberry-pi-zero-2": ["raspberry-pi-zero-2"],
    "orange-pi-zero-3": ["orange-pi-zero-3"],
    "orange-pi-zero-2w": ["orange-pi-zero-2w"],
    "orange-pi-zero-2": ["orange-pi-zero-2"],
    "orange-pi-5": ["orange-pi-5"],
    "orange-pi-pc": ["orange-pi-pc"],
    "orange-pi-one": ["orange-pi-one"],
    "radxa-rock-5b": ["radxa-rock-5b"],
    "radxa-rock-5a": ["radxa-rock-5a"],
    "radxa-nio-12l": ["radxa-nio-12l"],
    "khadas-vim-4": ["khadas-vim-4"],
    "khadas-vim-3": ["khadas-vim-3"],
    "khadas-edge-2": ["khadas-edge-2"],
    "banana-pi-m7": ["banana-pi-m7"],
    "hardkernel-odroid-c4": ["hardkernel-odroid-c4"],
    "hardkernel-odroid-m1": ["hardkernel-odroid-m1"],
    "starfive-visionfive-2": ["starfive-visionfive-2"],
    "milk-v-meles": ["milk-v-meles"],
    "capcom-home-arcade": ["capcom-home-arcade"],
}

# Wiki feature name → compat matrix feature_id
FEATURE_MAP = {
    "wifi": "wifi",
    "bluetooth": "bluetooth",
    "rumble": "rumble",
    "fan": None,            # maps to has_fan device field, not a test_result
    "led": None,            # informational, no compat feature
    "joystick leds": None,  # informational
    "storage": None,        # informational
    "dual screen addon": None,
}


# ---------------------------------------------------------------------------
# Parsers
# ---------------------------------------------------------------------------

def parse_md_table(lines: list[str], start: int) -> list[dict[str, str]]:
    """Parse a markdown table starting at line index `start`.
    Returns list of row dicts keyed by header names (lowercased, stripped)."""
    if start >= len(lines):
        return []

    # Find header row (first row with |)
    header_line = lines[start].strip()
    if not header_line.startswith("|"):
        return []

    headers = [h.strip().lower() for h in header_line.split("|")[1:-1]]

    # Skip separator row
    if start + 1 >= len(lines):
        return []

    rows = []
    for i in range(start + 2, len(lines)):
        line = lines[i].strip()
        if not line.startswith("|"):
            break
        cells = [c.strip() for c in line.split("|")[1:-1]]
        row = {}
        for j, h in enumerate(headers):
            row[h] = cells[j] if j < len(cells) else ""
        rows.append(row)

    return rows


def find_section_tables(text: str, section_name: str) -> list[list[dict[str, str]]]:
    """Find all markdown tables under a given ## section heading."""
    lines = text.split("\n")
    tables = []
    in_section = False

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Check for section heading
        if line.startswith("## "):
            heading = line[3:].strip().lower()
            in_section = (heading == section_name.lower())
            i += 1
            continue

        if in_section and line.startswith("|") and "---" not in line:
            table = parse_md_table(lines, i)
            if table:
                tables.append(table)
                # Skip past this table
                i += len(table) + 2
                continue

        i += 1

    return tables


def parse_display(text: str) -> tuple[str | None, str | None]:
    """Parse display info like '3.5-inch 640*480' or '4.0-inch 640x480'."""
    # Match patterns like "3.5-inch 640*480", "4-inch 720x720"
    m = re.search(r"(\d+\.?\d*)[- ]*inch", text, re.IGNORECASE)
    size = f"{m.group(1)} inch" if m else None

    m = re.search(r"(\d{3,4})\s*[x*×]\s*(\d{3,4})", text)
    res = f"{m.group(1)}x{m.group(2)}" if m else None

    return size, res


def parse_connectivity(text: str) -> tuple[str | None, str | None]:
    """Parse connectivity info to extract wifi_chip and bt_chip."""
    if not text or text.lower() in ("none", "varies by board", ""):
        return None, None

    wifi_chip = None
    bt_chip = None

    # Look for chip model in parentheses: (RTL8821CS), (ESP32-S2)
    m = re.search(r"\(([A-Z0-9][\w-]+)\)", text)
    if m:
        chip = m.group(1)
        wifi_chip = chip
        bt_chip = chip  # usually same chip handles both

    return wifi_chip, bt_chip


def parse_features(text: str) -> dict:
    """Parse ## Features table. Returns dict of extracted info."""
    tables = find_section_tables(text, "Features")
    if not tables:
        return {}

    result = {
        "feature_statuses": {},  # feature_id → "works"
        "has_fan": None,
    }

    for table in tables:
        for row in table:
            feature_name = row.get("feature", "").strip().lower()
            notes = row.get("notes", "").strip()

            if not feature_name or not notes:
                continue

            # Fan detection
            if "fan" in feature_name:
                result["has_fan"] = True

            # Map to compat feature
            feature_id = FEATURE_MAP.get(feature_name)
            if feature_id and notes:
                # If there are notes describing the feature, it works
                # (wiki only documents working features)
                if "not supported" not in notes.lower():
                    result["feature_statuses"][feature_id] = "works"

    return result


def parse_wiki_page(path: Path) -> dict | None:
    """Parse a wiki device page and extract enrichment data."""
    text = path.read_text(encoding="utf-8")
    data: dict = {}

    # --- Hardware tables ---
    hw_tables = find_section_tables(text, "Hardware")

    for table in hw_tables:
        for row in table:
            # Display/RAM/eMMC/Connectivity table
            if "display" in row:
                display_size, display_res = parse_display(row["display"])
                if display_size:
                    data["display_size"] = display_size
                if display_res:
                    data["display_res"] = display_res

            if "ram" in row:
                ram = row["ram"].strip()
                if ram and ram.lower() not in ("varies by board", ""):
                    data["ram"] = ram

            if "emmc" in row:
                emmc = row["emmc"].strip()
                if emmc and emmc.lower() != "none":
                    data["storage"] = f"{emmc} eMMC + SD"
                elif emmc and emmc.lower() == "none":
                    data["storage"] = "SD only"

            if "storage" in row:
                storage = row["storage"].strip()
                if storage and storage.lower() not in ("varies by board", ""):
                    data["storage"] = storage

            if "connectivity" in row:
                wifi_chip, bt_chip = parse_connectivity(row["connectivity"])
                if wifi_chip:
                    data["wifi_chip"] = wifi_chip
                if bt_chip:
                    data["bt_chip"] = bt_chip

    # --- Software table ---
    sw_tables = find_section_tables(text, "Software")
    for table in sw_tables:
        for row in table:
            if "compositor" in row:
                comp = row["compositor"].strip()
                if comp and comp.lower() not in ("device-specific", ""):
                    # Normalize: "Sway + REG-ES" → "Sway", "Weston + REG-ES" → "Weston"
                    comp = comp.split("+")[0].strip().split("/")[0].strip()
                    data["compositor"] = comp

    # --- Features ---
    features = parse_features(text)
    if features.get("has_fan") is not None:
        data["has_fan"] = features["has_fan"]
    data["_feature_statuses"] = features.get("feature_statuses", {})

    if not data or (len(data) == 1 and "_feature_statuses" in data and not data["_feature_statuses"]):
        return None

    return data


def resolve_device_ids(path: Path) -> list[str]:
    """Map a wiki file path to device IDs."""
    stem = path.stem  # e.g. "rg35xx-plus", "raspberry-pi-4"

    if stem in WIKI_SLUG_TO_DEVICE_IDS:
        return WIKI_SLUG_TO_DEVICE_IDS[stem]

    # Try the stem directly as a device ID
    return [stem]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Enrich devices.yml from wiki pages")
    parser.add_argument("--dry-run", action="store_true", help="Report only, don't write files")
    args = parser.parse_args()

    print("Loading devices.yml...")
    with open(DEVICES_YML) as f:
        devices = yaml.safe_load(f) or {}

    # Scan wiki pages
    wiki_pages = list(WIKI_DOCS.glob("handhelds/**/*.md")) + list(WIKI_DOCS.glob("sbcs/**/*.md"))
    # Filter out index/brand overview pages
    wiki_pages = [p for p in wiki_pages if p.stem not in ("index", "catalog") and "/" in str(p.relative_to(WIKI_DOCS))]

    print(f"Found {len(wiki_pages)} wiki device pages")

    enriched_count = 0
    enriched_fields = 0
    all_feature_seeds: list[tuple[str, str, str]] = []  # (device_id, feature_id, status)

    new_fields = ("display_size", "display_res", "ram", "storage", "wifi_chip", "bt_chip", "has_fan", "compositor")

    for page in sorted(wiki_pages):
        data = parse_wiki_page(page)
        if not data:
            continue

        device_ids = resolve_device_ids(page)
        feature_statuses = data.pop("_feature_statuses", {})

        for device_id in device_ids:
            if device_id not in devices:
                continue

            device = devices[device_id]
            fields_added = 0

            for field in new_fields:
                if field in data and not device.get(field):
                    device[field] = data[field]
                    fields_added += 1

            if fields_added > 0:
                enriched_count += 1
                enriched_fields += fields_added
                print(f"  {device_id}: +{fields_added} fields ({', '.join(f for f in new_fields if f in data and data[f])})")

            # Collect feature seeds
            for feature_id, status in feature_statuses.items():
                all_feature_seeds.append((device_id, feature_id, status))

    print(f"\nEnriched {enriched_count} devices with {enriched_fields} new field values")
    print(f"Feature seeds: {len(all_feature_seeds)} test results from wiki")

    # Show summary of what was found
    field_counts: dict[str, int] = {}
    for device_id, device in devices.items():
        for field in new_fields:
            if device.get(field):
                field_counts[field] = field_counts.get(field, 0) + 1

    print("\nField coverage after enrichment:")
    for field in new_fields:
        count = field_counts.get(field, 0)
        print(f"  {field:20s} {count:3d}/{len(devices)} devices")

    if args.dry_run:
        print(f"\n[DRY RUN] Would update devices.yml and write {len(all_feature_seeds)} seed results")
        if all_feature_seeds:
            print("\nSample seeds:")
            for dev, feat, status in all_feature_seeds[:10]:
                print(f"  {dev} / {feat} = {status}")
        return

    # Write updated devices.yml
    print(f"\nWriting updated devices.yml...")
    sorted_devices = dict(sorted(devices.items()))
    with open(DEVICES_YML, "w") as f:
        yaml.dump(sorted_devices, f, default_flow_style=False, allow_unicode=True,
                  sort_keys=False, width=120)

    # Write seed SQL
    if all_feature_seeds:
        print(f"Writing {len(all_feature_seeds)} seed results to {SEED_SQL_OUT}...")
        lines = [
            "-- Auto-generated from wiki feature tables",
            "-- author='', build_date='2025-01-01'",
            "",
        ]
        for device_id, feature_id, status in all_feature_seeds:
            dev_esc = device_id.replace("'", "''")
            lines.append(
                f"INSERT OR IGNORE INTO test_results (device_id, feature_id, build_date, author, status, notes) "
                f"VALUES ('{dev_esc}', '{feature_id}', '2025-01-01', '', '{status}', '');"
            )
        with open(SEED_SQL_OUT, "w") as f:
            f.write("\n".join(lines) + "\n")

    print("Done.")


if __name__ == "__main__":
    main()
