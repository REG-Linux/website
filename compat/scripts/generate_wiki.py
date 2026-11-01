#!/usr/bin/env python3
"""Generate wiki device pages from _data/devices.yml + _data/socs.yml.

Single source of truth: the YAML files in _data/ and the compat matrix DB.
Wiki pages become read-only generated output.

Run from the website repo root:
    python3 compat/scripts/generate_wiki.py [--dry-run]
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[2]
DEVICES_YML = REPO_ROOT / "_data" / "devices.yml"
SOCS_YML = REPO_ROOT / "_data" / "socs.yml"
WIKI_DOCS = REPO_ROOT / "wiki" / "docs"
WIKI_DATA = WIKI_DOCS / "assets" / "data"
# REG-verified, hand-written notes appended to a device page: wiki/notes/<device-id>.md
WIKI_NOTES = REPO_ROOT / "wiki" / "notes"
MKDOCS_YML = REPO_ROOT / "wiki" / "mkdocs.yml"
NAV_BEGIN = "    # BEGIN generated handhelds nav (compat/scripts/generate_wiki.py)"
NAV_END = "    # END generated handhelds nav"
CANONICAL_JSON = Path(__file__).resolve().parent / "devices_canonical.json"

# Type → wiki directory
TYPE_DIRS = {
    "handheld": "handhelds",
    "sbc": "sbcs",
    "tvbox": "tvboxes",
    "console": "handhelds",  # consoles go with handhelds for now
    "pc": "handhelds/x86_64",
    "unknown": "sbcs",
}

# Brand → wiki subdirectory (for handhelds only)
BRAND_DIRS = {
    "Anbernic": "anbernic",
    "Powkiddy": "powkiddy",
    "HardKernel": "hardkernel",
    "Gameforce": "gameforce",
    "MagicX": "magicx",
    "Ayn": "ayn",
    "AYANEO": "ayaneo",
    "Retroid": "retroid",
    "Valve": "x86_64",
    "ASUS": "x86_64",
    "Unbranded": "unbranded",
    "Nintendo": "unbranded",
    "TrimUI": "trimui",
    "MiniLoong": "miniloong",
    "Mangmi": "mangmi",
    "BatlExp": "unbranded",
    "Beelink": "beelink",
    "X96": "x96",
    "H96": "h96",
    "A95X": "a95x",
    "WeTek": "wetek",
    "Tronsmart": "tronsmart",
    "Nexbox": "nexbox",
    "Minix": "minix",
}

# Installation and file layout, written for REG Linux (same for every device that
# boots REG from an SD card).
INSTALL_TEXT = """1. Download the image for this device, a `reglinux-<target>-<board>-<version>.img.gz`
   file, from the [download page](https://reglinux.org/download/). REG Linux is in
   pre-release: images are not published for every device yet.
2. Write the image to a microSD card with balenaEtcher or Raspberry Pi Imager, or from
   a Linux shell: check with `lsblk` which device is the card, then
   `gunzip -c reglinux-*.img.gz | sudo dd of=/dev/sdX bs=4M conv=fsync`.
   Writing the image erases the card.
3. Insert the card and power the device on. On the first boot REG Linux grows its data
   partition to the size of the card, then reboots once.

REG Linux runs from the card and leaves the device's internal storage alone."""

# Devices that don't simply boot from the card (verified notes go in wiki/notes/<id>.md)
BOOT_CAVEATS = {
    "qualcomm": "This device has a Qualcomm SoC: its stock bootloader does not start REG Linux "
                "from the card by itself, and a bootloader change is needed first. The steps "
                "will be documented here once they are verified for this device.",
    "x86": "This is an x86_64 device: write the image to a USB stick or microSD card and pick "
           "it from the firmware boot menu.",
}


def boot_caveat(device: dict) -> str:
    soc = (device.get("soc_name", "") or "").lower()
    if "qualcomm" in soc or "snapdragon" in soc:
        return BOOT_CAVEATS["qualcomm"]
    if any(x in soc for x in ("intel", "amd", "x86")) or device.get("id", "") in ("valve-steam-deck", "asus-rog-ally"):
        return BOOT_CAVEATS["x86"]
    return ""

FILES_TEXT = """The card has two partitions:

| Partition | Format | Contents |
|---|---|---|
| `REGLINUX` | FAT | boot files and `system-boot.conf` |
| `SHARE` | ext4, mounted at `/userdata` | games in `/userdata/roms/<system>/`, BIOS files in `/userdata/bios/`, settings in `/userdata/system/system.conf` |

The `SHARE` partition is also reachable over the network through Samba when the
service is enabled."""

WIDGET_TEMPLATE = """
## Hardware & Compatibility

<div data-reg-compat="{device_id}:specs"></div>
<script src="{widget_url}"></script>
"""


def extract_manual_sections(path: Path) -> str | None:
    """Extract manually written sections from an existing wiki page.

    Preserves everything from '## Install REG Linux' onwards (including
    '## Additional References', '## Resources', '## Board family guidance', etc.)
    Returns None if the file doesn't exist or has no manual sections.
    """
    if not path.exists():
        return None

    text = path.read_text(encoding="utf-8")

    # Find the first manual section heading
    manual_headings = [
        "## Install REG Linux",
        "## Installation notes",
        "## Additional References",
        "## Resources",
        "## Board family guidance",
    ]

    earliest_pos = len(text)
    for heading in manual_headings:
        pos = text.find(heading)
        if pos >= 0 and pos < earliest_pos:
            earliest_pos = pos

    if earliest_pos >= len(text):
        return None

    manual = text[earliest_pos:].strip()
    return manual if manual else None


def load_device_notes(dev_id: str) -> str:
    """REG-verified notes for a device, from wiki/notes/<device-id>.md, if any."""
    path = WIKI_NOTES / f"{dev_id}.md"
    if path.exists():
        text = path.read_text(encoding="utf-8").strip()
        if text:
            return text
    return "No device-specific notes yet."


def generate_handheld_page(device: dict, soc: dict | None, widget_url: str = "") -> str:
    """Generate a wiki page for a handheld/tvbox device (Template A/B)."""
    dev_id = device["id"]
    title = device["title"]
    brand = device.get("brand", "")
    soc_name = device.get("soc_name", "") or ""
    cpu_model = ""
    gpu_name = ""

    if soc:
        cpu_info = soc.get("cpu", {})
        gpu_info = soc.get("gpu", {})
        cores = cpu_info.get("cores", "")
        clock = cpu_info.get("max_clock", "")
        model = cpu_info.get("model", "")
        core_str = f" ({cores}-core)" if cores else ""
        clock_str = f" @ {clock}" if clock else ""
        cpu_model = f"ARM {model}{core_str}{clock_str}" if model else ""
        gpu_name = gpu_info.get("model", "") or ""

    display = device.get("display_size", "")
    display_res = device.get("display_res", "")
    if display and display_res:
        display_str = f"{display} {display_res}"
    elif display:
        display_str = display
    elif display_res:
        display_str = display_res
    else:
        display_str = "—"

    ram = device.get("ram", "") or "—"
    storage = device.get("storage", "") or "—"
    emmc = "None" if storage == "SD only" else storage.replace(" + SD", "") if storage != "—" else "—"

    connectivity = "None"
    wifi_chip = device.get("wifi_chip", "")
    if wifi_chip:
        connectivity = f"2.4/5 GHz WiFi + BT ({wifi_chip})"
    elif device.get("bt_chip"):
        connectivity = f"WiFi + BT ({device['bt_chip']})"
    else:
        # Infer from na_features
        na = device.get("na_features", [])
        if isinstance(na, str):
            try:
                na = json.loads(na)
            except Exception:
                na = []
        if "wifi" not in [n for n in na]:
            connectivity = "WiFi + BT"

    compositor = device.get("compositor", "") or "Sway"
    gpu_driver = ""
    if soc:
        gpu_info = soc.get("gpu", {})
        driver = gpu_info.get("driver", "")
        api = gpu_info.get("api", "")
        gpu_driver = f"{driver} ({api})" if driver and api else driver or ""

    kernel = device.get("kernel", "") or "Mainline Linux"
    kernel_str = f"Mainline Linux" if not kernel.startswith("Mainline") else kernel


    slug = f"{BRAND_DIRS.get(brand, brand.lower())}/{dev_id.replace(brand.lower() + '-', '').replace(brand.lower(), '')}"
    slug = slug.strip("/").replace("--", "-")

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    notes = load_device_notes(dev_id)
    caveat = boot_caveat(device)
    install = f"!!! note\n    {caveat}\n\n{INSTALL_TEXT}" if caveat else INSTALL_TEXT
    tail = f"""## Install REG Linux

{install}

## Files and settings

{FILES_TEXT}

## Notes

{notes}"""

    widget = WIDGET_TEMPLATE.format(device_id=device["id"], widget_url=widget_url)

    page = f"""---
title: {title}
description: REG Linux on {title} powered by {soc_name}.
manufacturer: {brand}
slug: {slug}
generated: {now}
---

# {title}

{widget}
{tail}
"""
    return page


def generate_sbc_page(device: dict, soc: dict | None, preserved_sections: str | None = None, widget_url: str = "") -> str:
    """Generate a wiki page for an SBC/tvbox device (Template C)."""
    title = device["title"]
    brand = device.get("brand", "")
    soc_name = device.get("soc_name", "") or "—"
    dev_id = device["id"]

    cpu_model = ""
    gpu_name = ""
    gpu_driver = ""

    if soc:
        cpu_info = soc.get("cpu", {})
        gpu_info = soc.get("gpu", {})
        cores = cpu_info.get("cores", "")
        model = cpu_info.get("model", "")
        core_str = f" ({cores}-core)" if cores else ""
        cpu_model = f"ARM {model}{core_str}" if model else "—"
        gpu_name = gpu_info.get("model", "") or "—"
        driver = gpu_info.get("driver", "")
        api = gpu_info.get("api", "")
        gpu_driver = f"{driver}" if driver else "—"

    lede = device.get("lede", "") or device.get("description", "") or f"{title} pairs the {soc_name} SoC with the REG Linux stack for a polished retro console."

    wiki_url = device.get("wiki_url", "") or device.get("board_url", "")
    download_url = f"https://reglinux.org/download/{dev_id}/"

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if preserved_sections:
        tail = preserved_sections
    else:
        tail = f"""## Installation notes

1. Grab the image. Download the latest {title} build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your {title}, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: {download_url}"""

    widget = WIDGET_TEMPLATE.format(device_id=dev_id, widget_url=widget_url)

    page = f"""---
title: {title}
description: {lede[:200]}
generated: {now}
---

# {title}

{lede}

{widget}
{tail}
"""
    return page


def grouped_handhelds(pages: list[tuple[str, str, str]]) -> dict[str, list[tuple[str, str]]]:
    groups: dict[str, list[tuple[str, str]]] = {}
    for brand, title, rel in sorted(pages, key=lambda p: (p[0].lower(), p[1].lower())):
        groups.setdefault(brand, []).append((title, rel))
    return groups


def write_handheld_index(pages: list[tuple[str, str, str]]) -> None:
    """handhelds/index.md: every handheld page, grouped by manufacturer."""
    lines = [
        "---",
        "title: Handhelds",
        "description: Handheld devices with a REG Linux page.",
        "---",
        "",
        "# Handhelds",
        "",
        "Each page shows the device's REG Linux status, its hardware and how to",
        "install REG Linux. The status comes from the compatibility matrix.",
        "",
    ]
    for brand, items in grouped_handhelds(pages).items():
        lines.append(f"## {brand}")
        lines.append("")
        for title, rel in items:
            link = rel[len("handhelds/"):] if rel.startswith("handhelds/") else "../" + rel
            lines.append(f"- [{title}]({link})")
        lines.append("")
    (WIKI_DOCS / "handhelds" / "index.md").write_text("\n".join(lines), encoding="utf-8")


def write_handheld_nav(pages: list[tuple[str, str, str]]) -> None:
    """Replace the Handhelds part of the nav in mkdocs.yml, between NAV_BEGIN and NAV_END."""
    text = MKDOCS_YML.read_text(encoding="utf-8")
    start, end = text.find(NAV_BEGIN), text.find(NAV_END)
    if start < 0 or end < 0:
        print("  mkdocs.yml has no generated handhelds nav markers, nav left alone")
        return
    block = [NAV_BEGIN, "  - Handhelds:", "    - Overview: handhelds/index.md"]
    for brand, items in grouped_handhelds(pages).items():
        block.append(f"    - {brand}:")
        for title, rel in items:
            block.append(f"      - \"{title}\": {rel}")
    text = text[:start] + "\n".join(block) + "\n" + text[end:]
    MKDOCS_YML.write_text(text, encoding="utf-8")


def generate_data_files(devices_raw: dict, socs_raw: dict) -> None:
    """Generate wiki/docs/assets/data/ JSON files from canonical data."""
    WIKI_DATA.mkdir(parents=True, exist_ok=True)

    # devices.json
    devices_list = []
    for dev_id, dev in sorted(devices_raw.items()):
        devices_list.append({
            "slug": dev_id,
            "title": dev.get("title", dev_id),
            "brand": dev.get("brand", ""),
            "soc": (dev.get("soc", []) or [""])[0] if isinstance(dev.get("soc"), list) else "",
            "board_url": dev.get("board_url", ""),
        })
    with open(WIKI_DATA / "devices.json", "w") as f:
        json.dump(devices_list, f, indent=2, ensure_ascii=False)

    # socs.json
    with open(WIKI_DATA / "socs.json", "w") as f:
        json.dump(socs_raw, f, indent=2, ensure_ascii=False)

    print(f"  Wrote {WIKI_DATA / 'devices.json'} ({len(devices_list)} devices)")
    print(f"  Wrote {WIKI_DATA / 'socs.json'} ({len(socs_raw)} SoCs)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate wiki pages from device data")
    parser.add_argument("--dry-run", action="store_true", help="Report only, don't write files")
    parser.add_argument("--local", action="store_true", help="Use local widget URL for testing")
    args = parser.parse_args()

    widget_url = "/wiki/assets/widget.js" if args.local else "https://compat.reglinux.org/widget.js"

    print("Loading data...")
    with open(DEVICES_YML) as f:
        devices_raw = yaml.safe_load(f) or {}
    with open(SOCS_YML) as f:
        socs_raw = yaml.safe_load(f) or {}

    # Load types from canonical JSON (has accurate type detection)
    canonical_types: dict[str, str] = {}
    if CANONICAL_JSON.exists():
        with open(CANONICAL_JSON) as f:
            for d in json.load(f):
                canonical_types[d["id"]] = d.get("type", "unknown")

    # Build SoC lookup
    soc_lookup: dict[str, dict] = {}
    for slug, soc in socs_raw.items():
        mfr = soc.get("manufacturer", "")
        model = soc.get("model", "")
        display_name = f"{mfr} {model}".strip()
        soc_lookup[display_name] = soc
        soc_lookup[model] = soc
        soc_lookup[slug] = soc

    generated = 0
    skipped = 0
    handheld_pages: list[tuple[str, str, str]] = []

    for dev_id, dev in sorted(devices_raw.items()):
        # Detect type using canonical JSON if available, else patterns
        device_type = canonical_types.get(dev_id, dev.get("type", "unknown"))
        if not device_type or device_type == "unknown":
            for pat in ["x96", "h96", "a95x", "tx3", "nexbox", "wetek", "tronsmart", "mxiii", "beelink"]:
                if pat in dev_id:
                    device_type = "tvbox"
                    break
        if not device_type or device_type == "unknown":
            for pat in ["nes-classic", "snes-classic", "capcom-home-arcade"]:
                if pat in dev_id:
                    device_type = "console"
                    break
        if not device_type or device_type == "unknown":
            for pat in ["rg", "rgb", "pocket", "odin", "gameforce", "powkiddy", "trimui", "steam-deck", "rog-ally", "ayaneo",
                        "odroid-go", "game-console", "rk3326-clones", "xu-mini"]:
                if pat in dev_id:
                    device_type = "handheld"
                    break

        brand = dev.get("brand", "")
        soc_names = dev.get("soc", []) or []
        soc_name = soc_names[0] if soc_names else ""
        soc = soc_lookup.get(soc_name)

        # Build device dict with all fields for the generator
        device = {
            "id": dev_id,
            "title": dev.get("title", dev_id),
            "brand": brand,
            "soc_name": soc_name,
            "soc_slug": "",
            "kernel": "",
            "compositor": dev.get("compositor", ""),
            "display_size": dev.get("display_size", ""),
            "display_res": dev.get("display_res", ""),
            "ram": dev.get("ram", ""),
            "storage": dev.get("storage", ""),
            "wifi_chip": dev.get("wifi_chip", ""),
            "bt_chip": dev.get("bt_chip", ""),
            "has_fan": dev.get("has_fan"),
            "na_features": dev.get("na_features", []),
            "lede": dev.get("lede", ""),
            "description": dev.get("description", ""),
            "wiki_url": dev.get("board_url", ""),
        }

        # Find SoC slug
        for slug, s in socs_raw.items():
            mfr = s.get("manufacturer", "")
            model = s.get("model", "")
            if soc_name == f"{mfr} {model}".strip() or soc_name == model:
                device["soc_slug"] = slug
                device["kernel"] = str(s.get("kernel_version", ""))
                break

        # Determine output path and template
        if device_type in ("handheld", "console", "pc", "tvbox"):
            type_dir = TYPE_DIRS.get(device_type, "handhelds")
            if device_type in ("handheld", "console") and brand in BRAND_DIRS:
                brand_dir = BRAND_DIRS[brand]
                out_dir = WIKI_DOCS / type_dir / brand_dir
            elif device_type == "pc":
                out_dir = WIKI_DOCS / type_dir
            elif device_type == "tvbox":
                out_dir = WIKI_DOCS / type_dir / brand.lower().replace(" ", "-")
            else:
                out_dir = WIKI_DOCS / type_dir / brand.lower().replace(" ", "-")

            # Filename: strip brand prefix from device ID
            brand_lower = brand.lower().replace(" ", "-")
            filename = dev_id.replace(f"{brand_lower}-", "", 1) if dev_id.startswith(brand_lower) else dev_id
            filename = filename.strip("-") + ".md"

            out_path = out_dir / filename
            # Handheld, console and TV box pages are generated in full: earlier
            # hand-written tails are not carried over (they held text taken from
            # other projects' docs). Verified notes go in wiki/notes/<id>.md.
            preserved = None
            content = generate_handheld_page(device, soc, widget_url)
            if device_type in ("handheld", "console", "pc"):
                handheld_pages.append((brand or "Other", device["title"], out_path.relative_to(WIKI_DOCS).as_posix()))
        else:
            out_dir = WIKI_DOCS / "sbcs"
            filename = f"{dev_id}.md"
            out_path = out_dir / filename
            preserved = extract_manual_sections(out_path)
            content = generate_sbc_page(device, soc, preserved, widget_url)

        if args.dry_run:
            exists = "overwrite" if out_path.exists() else "NEW"
            pres = " [preserved manual sections]" if preserved else ""
            print(f"  [{exists}] {out_path.relative_to(WIKI_DOCS)}{pres}")
            generated += 1
        else:
            out_dir.mkdir(parents=True, exist_ok=True)
            out_path.write_text(content, encoding="utf-8")
            generated += 1

    print(f"\n{'[DRY RUN] Would generate' if args.dry_run else 'Generated'} {generated} wiki pages")

    # Generate data files, the handheld index and the Handhelds nav
    if not args.dry_run:
        print("\nGenerating data files...")
        generate_data_files(devices_raw, socs_raw)
        write_handheld_index(handheld_pages)
        write_handheld_nav(handheld_pages)

    print("Done.")


if __name__ == "__main__":
    main()
