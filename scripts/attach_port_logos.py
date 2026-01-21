#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

import yaml


LOGO_DIR = Path("wiki/docs/assets/systems/logos")
ICON_DIR = Path("wiki/docs/assets/systems/icons")
FALLBACK_LOGO = "/wiki/assets/systems/logos/ports.png"


def slug_from_url(url: str) -> str:
    return url.rstrip("/").split("/")[-1]


def find_asset(slug: str) -> tuple[str, str] | None:
    for ext in (".png", ".webp", ".svg"):
        candidate = LOGO_DIR / f"{slug}{ext}"
        if candidate.exists():
            return (f"/wiki/assets/systems/logos/{candidate.name}", "logo")
    for ext in (".webp", ".png", ".svg"):
        candidate = ICON_DIR / f"{slug}{ext}"
        if candidate.exists():
            return (f"/wiki/assets/systems/icons/{candidate.name}", "icon")
    return None


def main() -> int:
    data_path = Path("_data/ports.yml")
    ports = yaml.safe_load(data_path.read_text(encoding="utf-8")) or []

    for port in ports:
        url = port.get("url", "")
        if not url:
            continue
        slug = slug_from_url(url)
        asset = find_asset(slug)
        if asset:
            src, _kind = asset
        else:
            src = FALLBACK_LOGO
        port["logo"] = {
            "src": src,
            "alt": f"{port.get('name', 'Port')} logo",
        }

    data_path.write_text(
        yaml.safe_dump(ports, sort_keys=False, allow_unicode=False),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
