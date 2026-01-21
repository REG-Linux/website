#!/usr/bin/env python3
from __future__ import annotations

import io
import json
import urllib.parse
import urllib.request
from pathlib import Path

import cairosvg
from PIL import Image


USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) reglinux-bot/1.0"
WIKI_API = "https://en.wikipedia.org/w/api.php"
LOGO_DIR = Path("wiki/docs/assets/systems/logos")
ICON_DIR = Path("wiki/docs/assets/systems/icons")

PORT_LOGO_SOURCES = {
    "dxx-rebirth": {"url": "https://www.dxx-rebirth.com/logo.png"},
    "etlegacy": {"wiki_file": "Wolfenstein Enemy Territory logo.png"},
    "fury": {"wiki_file": "Ion Fury logo.jpg"},
    "iortcw": {"wiki_file": "Return to Castle Wolfenstein Coverart.jpg"},
    "jazz2": {"wiki_file": "Jazz Jackrabbit 2.PNG"},
    "openjazz": {"wiki_file": "Jazz Jackrabbit.jpg"},
    "rott": {"wiki_file": "Rise of the Triad cover.jpg"},
    "sonic3-air": {"url": "https://sonic3air.org/images/title_sonic3air.png"},
    "uqm": {"wiki_file": "The Ur-Quan Masters.jpg"},
    "flatpak": {"wiki_file": "Flatpak Logo.svg"},
    "vemulator": {"wiki_file": "Sega-Dreamcast-VMU.jpg"},
}


def fetch_url(url: str) -> tuple[bytes, str]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read(), response.headers.get("Content-Type", "")


def wikipedia_file_url(filename: str) -> str:
    params = {
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "iiprop": "url",
        "titles": f"File:{filename}",
    }
    url = f"{WIKI_API}?{urllib.parse.urlencode(params)}"
    data_bytes, _ = fetch_url(url)
    data = json.loads(data_bytes)
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()), {})
    info = page.get("imageinfo", [{}])[0]
    if "url" not in info:
        raise RuntimeError(f"Could not resolve Wikipedia file URL for {filename}")
    return info["url"]


def ensure_png(data: bytes, content_type: str, url: str) -> bytes:
    header = data.lstrip()[:200].lower()
    is_svg = (
        url.lower().endswith(".svg")
        or "svg" in content_type.lower()
        or header.startswith(b"<svg")
        or header.startswith(b"<?xml")
    )
    if is_svg:
        return cairosvg.svg2png(bytestring=data)
    return data


def save_images(data: bytes, content_type: str, url: str, logo_path: Path, icon_path: Path) -> None:
    image = Image.open(io.BytesIO(ensure_png(data, content_type, url)))
    image.load()
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGBA")

    logo = image.copy()
    logo.thumbnail((640, 640))
    logo_path.parent.mkdir(parents=True, exist_ok=True)
    logo.save(logo_path, format="PNG", optimize=True)

    icon = image.copy()
    icon.thumbnail((256, 256))
    icon_path.parent.mkdir(parents=True, exist_ok=True)
    icon.save(icon_path, format="WEBP", quality=85, method=6)


def main() -> int:
    for slug, source in PORT_LOGO_SOURCES.items():
        if "wiki_file" in source:
            url = wikipedia_file_url(source["wiki_file"])
        else:
            url = source["url"]

        data, content_type = fetch_url(url)
        save_images(data, content_type, url, LOGO_DIR / f"{slug}.png", ICON_DIR / f"{slug}.webp")
        print(f"Updated {slug} from {url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
