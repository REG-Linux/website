#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

import yaml


GPU_MAP = {
    "BR2_PACKAGE_SYSTEM_PANFROST_MESA3D=y": "Mali (Panfrost)",
    "BR2_PACKAGE_SYSTEM_LIMA_MESA3D=y": "Mali (Lima)",
    "BR2_PACKAGE_SYSTEM_RPI_MESA3D=y": "Broadcom V3D",
    "BR2_PACKAGE_SYSTEM_FREEDRENO_MESA3D=y": "Adreno (Freedreno)",
    "BR2_PACKAGE_SYSTEM_GPU_X86=y": "x86 GPU",
    "BR2_PACKAGE_IMG_GPU_POWERVR=y": "PowerVR",
}


def load_yaml(path: Path) -> dict:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    return data or {}


def dump_yaml(path: Path, data: dict) -> None:
    header = "# System-on-Chip catalog. Fill CPU/GPU/kernel details as you verify them.\n"
    payload = yaml.safe_dump(data, sort_keys=True, allow_unicode=False)
    path.write_text(header + payload, encoding="utf-8")


def parse_board(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    info: dict[str, str] = {"cpu_model": "", "cpu_arch": "", "gpu_model": "", "kernel_version": ""}

    cortex_match = re.search(r"BR2_cortex_([a-z0-9_]+)=y", text)
    if cortex_match:
        token = cortex_match.group(1).upper().replace("_", "/")
        info["cpu_model"] = f"Cortex-{token}"

    if "BR2_x86_64=y" in text:
        info["cpu_arch"] = "x86_64"
        if not info["cpu_model"]:
            info["cpu_model"] = "x86_64"
    elif "BR2_aarch64=y" in text:
        info["cpu_arch"] = "ARMv8-A"
    elif "BR2_arm=y" in text:
        info["cpu_arch"] = "ARMv7-A"

    version_match = re.search(r'BR2_LINUX_KERNEL_CUSTOM_VERSION_VALUE="([^"]+)"', text)
    if version_match:
        info["kernel_version"] = version_match.group(1)
    else:
        headers_match = re.search(r"BR2_KERNEL_HEADERS_([0-9_]+)=y", text)
        if not headers_match:
            headers_match = re.search(r"BR2_PACKAGE_HOST_LINUX_HEADERS_CUSTOM_([0-9_]+)=y", text)
        if headers_match:
            info["kernel_version"] = headers_match.group(1).replace("_", ".")

    for marker, gpu_name in GPU_MAP.items():
        if marker in text:
            info["gpu_model"] = gpu_name
            break

    return info


def load_board_map(path: Path) -> dict:
    if not path.exists():
        print(f"Board map not found: {path}")
        return {}
    data = load_yaml(path)
    if not isinstance(data, dict):
        print(f"Board map is not a mapping: {path}")
        return {}
    return data


def collect_soc_names(socs: dict) -> set[str]:
    names: set[str] = set()
    for soc in socs.values():
        model = f"{soc.get('manufacturer', '')} {soc.get('model', '')}".strip()
        if model:
            names.add(model)
    return names


def validate_board_map(soc_names: set[str], board_map: dict, configs_dir: Path) -> int:
    warnings = 0
    missing_map = sorted(name for name in soc_names if name not in board_map)
    unknown_map = sorted(name for name in board_map if name not in soc_names)
    missing_files = sorted(
        f"{name} -> {board}" for name, board in board_map.items() if not (configs_dir / board).exists()
    )

    if missing_map:
        warnings += 1
        print("Warning: SoCs missing board map entries:")
        for name in missing_map:
            print(f"  - {name}")
    if unknown_map:
        warnings += 1
        print("Warning: board map entries not found in SoC catalog:")
        for name in unknown_map:
            print(f"  - {name}")
    if missing_files:
        warnings += 1
        print("Warning: board files not found under configs directory:")
        for entry in missing_files:
            print(f"  - {entry}")
    return warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed SoC catalog from REG-Linux board configs.")
    parser.add_argument("--socs", required=True, type=Path)
    parser.add_argument("--configs", required=True, type=Path)
    parser.add_argument(
        "--board-map",
        type=Path,
        default=Path(__file__).with_name("seed_socs_board_map.yml"),
    )
    parser.add_argument("--strict", action="store_true", help="Fail on validation warnings.")
    args = parser.parse_args()

    socs = load_yaml(args.socs)
    if not socs:
        print("SoC catalog is empty; aborting.")
        return 1
    if not args.configs.exists():
        print(f"Configs directory not found: {args.configs}")
        return 1
    if not args.configs.is_dir():
        print(f"Configs path is not a directory: {args.configs}")
        return 1

    board_map = load_board_map(args.board_map)
    if not board_map:
        print("Board map is empty; aborting.")
        return 1
    soc_names = collect_soc_names(socs)
    warning_count = validate_board_map(soc_names, board_map, args.configs)
    if warning_count and args.strict:
        print(f"Validation failed with {warning_count} warning group(s).")
        return 2

    for soc in socs.values():
        model = soc.get("manufacturer", "") + " " + soc.get("model", "")
        model = model.strip()
        board_name = board_map.get(model)
        if not board_name:
            continue
        board_path = args.configs / board_name
        if not board_path.exists():
            continue
        info = parse_board(board_path)

        cpu = soc.get("cpu", {}) or {}
        gpu = soc.get("gpu", {}) or {}

        if not cpu.get("model") and info["cpu_model"]:
            cpu["model"] = info["cpu_model"]
        if not cpu.get("arch") and info["cpu_arch"]:
            cpu["arch"] = info["cpu_arch"]
        if not gpu.get("model") and info["gpu_model"]:
            gpu["model"] = info["gpu_model"]
        if not soc.get("kernel_version") and info["kernel_version"]:
            soc["kernel_version"] = info["kernel_version"]

        soc["cpu"] = cpu
        soc["gpu"] = gpu

    dump_yaml(args.socs, socs)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
