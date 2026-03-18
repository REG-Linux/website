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

# SoC family installation guides
SOC_INSTALL_GUIDES = {
    "allwinner-h700": "Download the current H700 REG Linux image for this device from the REG Linux download page, then follow the steps in the Installation guide.\n\nBefore booting the device, see the Installation Guide for H700 devices",
    "rockchip-rk3326": "Download the current RK3326 REG Linux image from the REG Linux download page. Flash it to an SD card using balenaEtcher or dd.",
    "rockchip-rk3566": "Download the current RK3566/RK3568 REG Linux image from the REG Linux download page. Flash it to an SD card.",
    "rockchip-rk3568": "Download the current RK3566/RK3568 REG Linux image from the REG Linux download page. Flash it to an SD card.",
    "rockchip-rk3588": "Download the current RK3588 REG Linux image from the REG Linux download page. Flash it to an SD card or eMMC.",
}

DEFAULT_INSTALL = "Download the latest REG Linux image for this device from the REG Linux download page. Flash it to an SD card using balenaEtcher, Raspberry Pi Imager, or dd. Insert the media, power on, and let REG Linux expand the filesystem on first boot."

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


def generate_handheld_page(device: dict, soc: dict | None, preserved_sections: str | None = None, widget_url: str = "") -> str:
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

    soc_slug = device.get("soc_slug", "")
    install_text = SOC_INSTALL_GUIDES.get(soc_slug, DEFAULT_INSTALL)

    slug = f"{BRAND_DIRS.get(brand, brand.lower())}/{dev_id.replace(brand.lower() + '-', '').replace(brand.lower(), '')}"
    slug = slug.strip("/").replace("--", "-")

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Features section
    features_rows = []
    features_rows.append("| Storage | REG Linux can be run from an SD Card. |")
    if connectivity != "None":
        features_rows.append("| Wifi | Can be turned on in REG-ES under Main Menu > Network Settings |")
        features_rows.append("| Bluetooth | Supports bluetooth audio and controllers |")
    if device.get("has_fan"):
        features_rows.append("| Fan | Fan control can be adjusted per system or per game |")

    # Use preserved manual sections if available, otherwise default
    if preserved_sections:
        tail = preserved_sections
    else:
        tail = f"""## Install REG Linux

### Installation

{install_text}

## Additional References"""

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

    for dev_id, dev in sorted(devices_raw.items()):
        # Detect type using canonical JSON if available, else patterns
        device_type = canonical_types.get(dev_id, dev.get("type", "unknown"))
        if not device_type or device_type == "unknown":
            for pat in ["x96", "h96", "a95x", "tx3", "nexbox", "wetek", "tronsmart", "mxiii", "beelink"]:
                if pat in dev_id:
                    device_type = "tvbox"
                    break
        if not device_type or device_type == "unknown":
            for pat in ["rg", "rgb", "pocket", "odin", "gameforce", "powkiddy", "trimui", "steam-deck", "rog-ally", "ayaneo"]:
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
            preserved = extract_manual_sections(out_path)
            content = generate_handheld_page(device, soc, preserved, widget_url)
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

    # Generate data files
    if not args.dry_run:
        print("\nGenerating data files...")
        generate_data_files(devices_raw, socs_raw)

    print("Done.")


if __name__ == "__main__":
    main()
