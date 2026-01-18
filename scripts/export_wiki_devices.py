#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

import yaml


def load_yaml(path: Path) -> dict:
    if not path.exists():
        return {}
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    return data or {}


def write_yaml(path: Path, data: dict) -> None:
    lines = ["# Auto-synced device compatibility data."]
    for slug in sorted(data.keys()):
        entry = data[slug] or {}
        status = entry.get("status", "unknown") or "unknown"
        notes = entry.get("notes", "") or ""
        lines.append(f"{slug}:")
        lines.append(f"  status: {status}")
        lines.append(f"  notes: {json.dumps(notes)}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def normalize_devices(devices: dict) -> list[dict]:
    records = []
    for slug, info in devices.items():
        if not isinstance(info, dict):
            continue
        title = info.get("title", slug)
        brand = info.get("brand", "")
        soc = ", ".join(info.get("soc") or [])
        board_url = info.get("board_url", "")
        records.append(
            {
                "slug": slug,
                "title": title,
                "brand": brand,
                "soc": soc,
                "board_url": board_url,
            }
        )
    return sorted(records, key=lambda item: item["title"].lower())


def write_json(path: Path, records: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(records, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")


def write_compat_markdown(path: Path, records: list[dict], compat: dict) -> None:
    lines = [
        "# Compatibility matrix",
        "",
        "REG Linux device coverage is tracked here. Status values are editable in",
        "`assets/data/device-compatibility.yml`.",
        "",
        "| Device | Brand | SoC | Status | Notes |",
        "| --- | --- | --- | --- | --- |",
    ]
    for record in records:
        slug = record["slug"]
        entry = compat.get(slug, {})
        status = entry.get("status", "unknown") or "unknown"
        notes = entry.get("notes", "") or ""
        title = record["title"]
        link = record["board_url"] or ""
        device_cell = f"[{title}]({link})" if link else title
        lines.append(
            f"| {device_cell} | {record['brand']} | {record['soc']} | {status} | {notes} |"
        )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Export website devices into wiki data.")
    parser.add_argument("--devices", required=True, type=Path)
    parser.add_argument("--socs", type=Path)
    parser.add_argument("--wiki-root", required=True, type=Path)
    args = parser.parse_args()

    devices = load_yaml(args.devices)
    records = normalize_devices(devices)

    compat_path = args.wiki_root / "assets" / "data" / "device-compatibility.yml"
    compat = load_yaml(compat_path)
    for record in records:
        compat.setdefault(record["slug"], {"status": "unknown", "notes": ""})
    write_yaml(compat_path, compat)

    write_json(args.wiki_root / "assets" / "data" / "devices.json", records)
    write_compat_markdown(args.wiki_root / "devices" / "compatibility.md", records, compat)

    if args.socs:
        socs = load_yaml(args.socs)
        socs_path = args.wiki_root / "assets" / "data" / "socs.yml"
        socs_path.parent.mkdir(parents=True, exist_ok=True)
        socs_path.write_text(
            "# Auto-synced SoC catalog.\n"
            + yaml.safe_dump(socs, sort_keys=True, allow_unicode=False),
            encoding="utf-8",
        )
        write_json(args.wiki_root / "assets" / "data" / "socs.json", socs)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
