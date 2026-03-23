#!/usr/bin/env python3
"""Extract and normalize device data from _data/devices.yml and _data/socs.yml.

Run from the website repo root:
    python3 compat/scripts/extract_devices.py

Outputs compat/scripts/devices_canonical.json
"""

import json
import re
import sys
from pathlib import Path

import yaml

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).resolve().parents[2]
DEVICES_YML = REPO_ROOT / "_data" / "devices.yml"
SOCS_YML = REPO_ROOT / "_data" / "socs.yml"
OVERRIDES_YML = REPO_ROOT / "_data" / "device_overrides.yml"
OUTPUT = Path(__file__).resolve().parent / "devices_canonical.json"

# ---------------------------------------------------------------------------
# Device type detection patterns (matched against device ID)
# ---------------------------------------------------------------------------
TVBOX_PATTERNS = [
    "x96", "h96", "a95x", "tx3", "nexbox", "wetek", "tronsmart",
    "mxiii", "s905-tvbox", "s905x3-tvbox",
]

HANDHELD_PATTERNS = [
    "rg", "rgb", "rk2023", "x35", "x55", "xu10", "odin",
    "pocket", "steam-deck", "rog-ally", "gameforce", "ayaneo",
    "magicx", "odroid-go", "powkiddy", "game-console", "rk3326-clones",
]

SBC_PATTERNS = [
    "raspberry-pi", "banana-pi", "orange-pi", "nano-pi", "khadas",
    "radxa", "firefly", "hardkernel-odroid-c", "hardkernel-odroid-m",
    "hardkernel-odroid-n", "hardkernel-odroid-xu", "milk-v", "starfive",
    "mqmaker", "asus-tinker", "pine64", "indiedroid", "beaglev",
    "sipeed", "musepi", "libretech", "armsom",
]

CONSOLE_PATTERNS = ["capcom", "nes-classic", "snes-classic", "nintendo"]

PC_PATTERNS = ["steam-deck", "rog-ally", "ayaneo"]

# N/A features by device type
NA_BY_TYPE = {
    "sbc":      ["battery", "analog_sticks", "buttons", "suspend", "rumble"],
    "tvbox":    ["battery", "analog_sticks", "buttons", "suspend", "rumble"],
    "handheld": ["ethernet"],
    "console":  ["analog_sticks", "ethernet", "battery"],
    "pc":       ["battery", "buttons", "analog_sticks"],
}

# Arch inference from cpu.arch string
ARCH_MAP = {
    "ARMv6":   "armv7",    # Pi Zero/1 — runs armv7 userspace in REG-Linux
    "ARMv7-A": "armv7",
    "ARMv8-A": "aarch64",
    "AArch64": "aarch64",
    "x86_64":  "x86_64",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
warnings: list[str] = []


def warn(msg: str) -> None:
    warnings.append(msg)
    print(f"  WARNING: {msg}", file=sys.stderr)


def normalize_soc_name(name: str) -> str:
    """Normalize a SoC display name to a slug for matching.

    'Rockchip RK3566' -> 'rockchip-rk3566'
    'Allwinner H2+'   -> 'allwinner-h2'
    'Amlogic S905(X)' -> 'amlogic-s905-x'  (via parentheses → hyphen-content)
    """
    s = name.lower().strip()
    # Replace parenthesised content: "(X)" → "-x", "(SM8550)" → "-sm8550"
    s = re.sub(r"\(([^)]+)\)", r"-\1", s)
    # Remove stray non-alphanumeric chars except spaces and hyphens
    s = re.sub(r"[^a-z0-9 \-]", "", s)
    # Collapse whitespace to single hyphen
    s = re.sub(r"\s+", "-", s)
    # Collapse multiple hyphens
    s = re.sub(r"-+", "-", s)
    return s.strip("-")


def detect_type(device_id: str) -> str:
    """Detect device type from its ID using pattern matching.

    PC patterns are checked first since steam-deck/rog-ally/ayaneo would also
    match handheld patterns.
    """
    for pat in PC_PATTERNS:
        if pat in device_id:
            return "pc"
    for pat in TVBOX_PATTERNS:
        if pat in device_id:
            return "tvbox"
    for pat in HANDHELD_PATTERNS:
        if pat in device_id:
            return "handheld"
    for pat in SBC_PATTERNS:
        if pat in device_id:
            return "sbc"
    for pat in CONSOLE_PATTERNS:
        if pat in device_id:
            return "console"
    return "unknown"


def infer_arch(cpu_arch: str) -> str | None:
    """Map cpu.arch string to REG-Linux arch identifier."""
    if not cpu_arch:
        return None
    for key, val in ARCH_MAP.items():
        if key.lower() in cpu_arch.lower():
            return val
    # RISC-V variants
    if "risc" in cpu_arch.lower():
        return "riscv64"
    return None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> None:
    print(f"Reading {DEVICES_YML}")
    with open(DEVICES_YML) as f:
        devices_raw = yaml.safe_load(f)

    print(f"Reading {SOCS_YML}")
    with open(SOCS_YML) as f:
        socs_raw = yaml.safe_load(f)

    # Apply manual overrides
    overrides: dict = {}
    if OVERRIDES_YML.exists():
        with open(OVERRIDES_YML) as f:
            overrides = yaml.safe_load(f) or {}
        override_count = 0
        for dev_id, fixes in overrides.items():
            if dev_id in devices_raw and isinstance(fixes, dict):
                for key, val in fixes.items():
                    if val is not None and val != "":
                        devices_raw[dev_id][key] = val
                    elif val == "":
                        devices_raw[dev_id][key] = None
                override_count += 1
        if override_count:
            print(f"Applied {override_count} overrides from {OVERRIDES_YML.name}")

    # Build SoC lookup tables
    # 1. By "{manufacturer} {model}" (exact display name used in devices.yml)
    soc_by_display_name: dict[str, tuple[str, dict]] = {}
    # 2. By model name alone (fallback for e.g. "TH1520")
    soc_by_model: dict[str, tuple[str, dict]] = {}
    # 3. By normalized slug
    soc_by_slug: dict[str, tuple[str, dict]] = {}

    for slug, soc in socs_raw.items():
        mfr = soc.get("manufacturer", "")
        model = soc.get("model", "")
        display = f"{mfr} {model}".strip() if mfr else model
        entry = (slug, soc)
        soc_by_display_name[display] = entry
        if model:
            soc_by_model[model] = entry
        soc_by_slug[slug] = entry

    # Process devices
    output: list[dict] = []

    for device_id, dev in sorted(devices_raw.items()):
        soc_names = dev.get("soc", []) or []
        soc_name_raw = soc_names[0] if soc_names else None

        # Match SoC
        soc_slug = None
        soc_data = None

        if soc_name_raw:
            # Try exact display name match
            if soc_name_raw in soc_by_display_name:
                soc_slug, soc_data = soc_by_display_name[soc_name_raw]
            # Try model-only match
            elif soc_name_raw in soc_by_model:
                soc_slug, soc_data = soc_by_model[soc_name_raw]
            else:
                # Try normalized slug match
                normalized = normalize_soc_name(soc_name_raw)
                if normalized in soc_by_slug:
                    soc_slug, soc_data = soc_by_slug[normalized]
                else:
                    warn(f"{device_id}: no SoC match for '{soc_name_raw}' (normalized: '{normalized}')")

        # Extract SoC fields
        cpu = soc_data.get("cpu", {}) if soc_data else {}
        gpu = soc_data.get("gpu", {}) if soc_data else {}
        cpu_arch_raw = cpu.get("arch", "") or ""
        gpu_model = gpu.get("model", "") or ""
        kernel = str(soc_data.get("kernel_version", "") or "") if soc_data else ""

        if soc_data and not cpu_arch_raw:
            warn(f"{device_id}: SoC '{soc_slug}' missing cpu.arch")
        if soc_data and not gpu_model:
            warn(f"{device_id}: SoC '{soc_slug}' missing gpu.model")

        # Detect type and arch
        device_type = detect_type(device_id)
        arch = infer_arch(cpu_arch_raw)

        # Special handling for RISC-V SoCs with missing cpu.arch
        if not arch and soc_slug:
            if soc_slug in ("starfive-jh7110", "th1520"):
                arch = "riscv64"

        if device_type == "unknown":
            warn(f"{device_id}: type detected as 'unknown'")

        # Determine SoC display name
        soc_name_display = None
        if soc_data:
            mfr = soc_data.get("manufacturer", "")
            model = soc_data.get("model", "")
            soc_name_display = f"{mfr} {model}".strip() if mfr else model
        elif soc_name_raw:
            soc_name_display = soc_name_raw

        record = {
            "id": device_id,
            "title": dev.get("title", device_id),
            "brand": dev.get("brand", ""),
            "type": device_type,
            "soc_slug": soc_slug,
            "soc_name": soc_name_display,
            "cpu_arch": cpu_arch_raw or None,
            "cpu_model": cpu.get("model") or None,
            "cpu_cores": cpu.get("cores") or None,
            "cpu_clock": cpu.get("max_clock") or None,
            "gpu_model": gpu_model or None,
            "gpu_driver": gpu.get("driver") or None,
            "gpu_api": gpu.get("api") or None,
            "kernel": kernel or None,
            "arch": arch,
            "wiki_url": dev.get("board_url") or None,
            "image": dev.get("image") or None,
            "na_features": NA_BY_TYPE.get(device_type, []),
            "display_size": dev.get("display_size") or None,
            "display_res": dev.get("display_res") or None,
            "ram": dev.get("ram") or None,
            "storage": dev.get("storage") or None,
            "wifi_chip": dev.get("wifi_chip") or None,
            "bt_chip": dev.get("bt_chip") or None,
            "has_fan": 1 if dev.get("has_fan") else (0 if dev.get("has_fan") is False else None),
            "compositor": dev.get("compositor") or None,
            "install_notes": dev.get("install_notes") or None,
        }
        output.append(record)

    # Write output
    with open(OUTPUT, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    # Summary
    print(f"\nWrote {len(output)} devices to {OUTPUT}")

    types = {}
    for d in output:
        types[d["type"]] = types.get(d["type"], 0) + 1
    print(f"Types: {types}")

    no_soc = [d["id"] for d in output if not d["soc_slug"]]
    if no_soc:
        print(f"No SoC match ({len(no_soc)}): {no_soc}")

    no_arch = [d["id"] for d in output if not d["arch"]]
    if no_arch:
        print(f"No arch ({len(no_arch)}): {no_arch}")

    if warnings:
        print(f"\n{len(warnings)} warning(s) total")
    else:
        print("\nNo warnings!")


if __name__ == "__main__":
    main()
