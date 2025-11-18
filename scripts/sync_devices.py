#!/usr/bin/env python3
"""Fetch REG Linux device data and generate Jekyll collection files."""

from __future__ import annotations

import re
import shutil
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen, urlretrieve

from bs4 import BeautifulSoup

BASE = "https://reglinux.org"
ROOT = Path(__file__).resolve().parents[1]
DOWNLOAD_URL = urljoin(BASE, "/download")
ASSETS_DIR = ROOT / "assets" / "images"
DEVICES_DIR = ROOT / "_devices"
DATA_DIR = ROOT / "_data"
DEVICES_DATA_PATH = DATA_DIR / "devices.yml"


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = text.strip("-")
    return text or "device"


def fetch_html(url: str) -> BeautifulSoup:
    with urlopen(url) as resp:
        html = resp.read()
    return BeautifulSoup(html, "html.parser")


def extract_devices() -> tuple[list[dict], list[str]]:
    soup = fetch_html(DOWNLOAD_URL)
    view = soup.find("div", class_="view-content")
    devices: list[dict] = []
    brand_order: list[str] = []
    current_brand = None
    for node in view.children:
        if getattr(node, "name", None) == "h3":
            current_brand = node.get_text(strip=True)
            brand_order.append(current_brand)
        elif (
            getattr(node, "name", None) == "div"
            and current_brand
            and node.has_attr("class")
            and "views-view-responsive-grid" in node["class"]
        ):
            for card in node.select(".views-view-responsive-grid__item-inner"):
                title_link = card.select_one(".views-field-title a")
                if not title_link:
                    continue
                title = title_link.get_text(strip=True)
                href = urljoin(BASE, title_link["href"])
                img = card.select_one("img")
                width = img.get("width") if img else None
                height = img.get("height") if img else None
                img_src = urljoin(BASE, img["src"]) if img else None
                devices.append(
                    {
                        "brand": current_brand,
                        "title": title,
                        "board_url": href,
                        "image": img_src,
                        "image_width": width,
                        "image_height": height,
                    }
                )
    return devices, brand_order


def download_image(url: str, slug: str, used_names: dict[str, str]) -> tuple[str, int | None, int | None]:
    if not url:
        return "", None, None
    parsed = urlparse(url)
    filename = Path(parsed.path).name or f"{slug}.png"
    name, ext = Path(filename).stem, Path(filename).suffix or ".png"
    candidate = filename
    counter = 1
    while candidate in used_names:
        candidate = f"{name}-{counter}{ext}"
        counter += 1
    used_names[candidate] = url
    dest = ASSETS_DIR / candidate
    dest.parent.mkdir(parents=True, exist_ok=True)
    urlretrieve(url, dest)
    return f"/assets/images/{candidate}", None, None


def extract_board_meta(board_url: str) -> tuple[list[str], list[str]]:
    soup = fetch_html(board_url)
    manufacturer_nodes = soup.select(".field--name-field-manufacturer .taxonomy-terms li")
    soc_nodes = soup.select(".field--name-field-soc .taxonomy-terms li")
    manufacturers = [node.get_text(strip=True) for node in manufacturer_nodes]
    socs = [node.get_text(strip=True) for node in soc_nodes]
    return manufacturers, socs


def write_brand_order(brands: list[str]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with (DATA_DIR / "brand_order.yml").open("w") as fh:
        for brand in brands:
            fh.write(f"- {brand}\n")


def write_device_page(device: dict) -> None:
    DEVICES_DIR.mkdir(parents=True, exist_ok=True)
    slug = device["slug"]
    title = device["title"].replace('"', '\\"')
    content = f"""---
layout: device
title: "{title}"
---
"""
    (DEVICES_DIR / f"{slug}.md").write_text(content)


def quote(value: str | int | None) -> str:
    if value is None:
        return '""'
    if isinstance(value, (int, float)):
        return f"{value}"
    text = str(value).replace('"', '\\"')
    return f"\"{text}\""


def write_devices_data(devices: list[dict]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    lines: list[str] = ["---"]
    for record in sorted(devices, key=lambda item: item["slug"]):
        lines.append(f"{record['slug']}:")
        lines.append(f"  title: {quote(record['title'])}")
        lines.append(f"  brand: {quote(record['brand'])}")
        manufacturers = record["manufacturers"] or [record["brand"]]
        lines.append("  manufacturer:")
        for name in manufacturers:
            lines.append(f"  - {quote(name)}")
        socs = record["socs"] or ["Unknown"]
        lines.append("  soc:")
        for soc in socs:
            lines.append(f"  - {quote(soc)}")
        lines.append(f"  image: {quote(record['image_path'] or '')}")
        image_width = record["image_width"] or ""
        image_height = record["image_height"] or ""
        lines.append(f"  image_width: {image_width}")
        lines.append(f"  image_height: {image_height}")
        lines.append(f"  board_url: {quote(record['board_url'])}")
        lines.append(f"  description: {quote(record['description'])}")
        lines.append(f"  lede: {quote(record['lede'])}")
    DEVICES_DATA_PATH.write_text("\n".join(lines) + "\n")


def main() -> None:
    if DEVICES_DIR.exists():
        shutil.rmtree(DEVICES_DIR)
    devices, brand_order = extract_devices()
    used_names: dict[str, str] = {}
    dataset: list[dict] = []
    for device in devices:
        slug = slugify(device["title"])
        manufacturers, socs = extract_board_meta(device["board_url"])
        image_path, _, _ = download_image(device["image"], slug, used_names)
        soc_list = socs or ["Unknown"]
        description = (
            f"REG Linux image for {device['title']} powered by {', '.join(soc_list)}."
            if soc_list and soc_list[0] != "Unknown"
            else f"REG Linux image for {device['title']}."
        )
        lede = (
            f"{device['title']} pairs the {soc_list[0]} SoC with the REG Linux stack for a polished retro console."
            if soc_list and soc_list[0] != "Unknown"
            else f"{device['title']} runs REG Linux for a reliable retro gaming setup."
        )
        dataset.append(
            {
                **device,
                "slug": slug,
                "manufacturers": manufacturers or [device["brand"]],
                "socs": socs or ["Unknown"],
                "image_path": image_path,
                "image_width": int(device["image_width"]) if device["image_width"] else "",
                "image_height": int(device["image_height"]) if device["image_height"] else "",
                "description": description,
                "lede": lede,
            }
        )
    write_brand_order(brand_order)
    write_devices_data(dataset)
    for record in dataset:
        write_device_page(record)
    print(f"Generated {len(dataset)} device files.")


if __name__ == "__main__":
    main()
