#!/usr/bin/env python3
"""Fetch bundled game metadata and assets from REG-Linux repo."""
from __future__ import annotations

import json
import re
import sys
import textwrap
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
TOKEN_PATH = ROOT / "gh_token"
if not TOKEN_PATH.exists():
    sys.exit("Missing gh_token file for GitHub access")
TOKEN = TOKEN_PATH.read_text().strip()
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "User-Agent": "reglinux-site-bot"
}
API_BASE = "https://api.github.com/repos/REG-Linux/REG-Linux/contents/package/emulationstation/es-system/roms"
RAW_BASE = "https://raw.githubusercontent.com/REG-Linux/REG-Linux/master/package/emulationstation/es-system/roms"
ASSET_DIR = ROOT / "assets" / "images" / "games"
DATA_PATH = ROOT / "_data" / "bundled_games.yml"
ASSET_DIR.mkdir(parents=True, exist_ok=True)


def request_json(url: str):
    req = Request(url, headers=HEADERS)
    with urlopen(req) as resp:
        return json.loads(resp.read())


def fetch_gamelist(folder: str) -> str | None:
    url = f"{RAW_BASE}/{folder}/gamelist.xml"
    req = Request(url, headers={k: v for k, v in HEADERS.items() if k != "Accept"})
    try:
        with urlopen(req) as resp:
            return resp.read().decode("utf-8")
    except HTTPError:
        return None


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "game"


def pretty_platform(name: str) -> str:
    cleaned = name.replace("_", " ")
    if len(cleaned) <= 4:
        return cleaned.upper()
    return cleaned.title()


def download_asset(folder: str, rel_path: str, slug: str) -> str | None:
    rel_path = rel_path.lstrip("./")
    url = f"{RAW_BASE}/{folder}/{rel_path}"
    ext = Path(rel_path).suffix or ".png"
    dest = ASSET_DIR / f"{slug}{ext}"
    req = Request(url, headers={k: v for k, v in HEADERS.items() if k != "Accept"})
    try:
        with urlopen(req) as resp, open(dest, "wb") as fh:
            fh.write(resp.read())
        return f"/assets/images/games/{dest.name}"
    except HTTPError:
        return None


def parse_gamelist(xml_text: str) -> list[dict]:
    root = ET.fromstring(xml_text)
    games = []
    for game in root.findall("game"):
        data = {child.tag: child.text.strip() if child.text else "" for child in game}
        games.append(data)
    return games


def main():
    directories = request_json(API_BASE)
    games_output = []
    for item in directories:
        if item.get("type") != "dir":
            continue
        folder = item["name"]
        xml_text = fetch_gamelist(folder)
        if not xml_text:
            continue
        games = parse_gamelist(xml_text)
        for game in games:
            name = game.get("name") or folder
            slug = slugify(f"{name}-{folder}")
            image_path = game.get("image")
            local_image = download_asset(folder, image_path, slug) if image_path else None
            releasedate = game.get("releasedate", "")
            if releasedate:
                releasedate = releasedate[:4]
            games_output.append(
                {
                    "name": name,
                    "platform": pretty_platform(folder),
                    "description": game.get("desc", "").replace("\n", " ").strip(),
                    "developer": game.get("developer", ""),
                    "publisher": game.get("publisher", ""),
                    "players": game.get("players", ""),
                    "genre": game.get("genre", ""),
                    "language": game.get("lang", ""),
                    "release_year": releasedate,
                    "image": local_image or "",
                    "video": game.get("video", ""),
                }
            )
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    with DATA_PATH.open("w") as fh:
        for game in games_output:
            fh.write("- name: \"{}\"\n".format(game["name"]))
            fh.write("  platform: \"{}\"\n".format(game["platform"]))
            description = game["description"] or "No description provided."
            wrapped = textwrap.fill(description, width=90)
            fh.write("  description: |\n")
            for line in wrapped.splitlines():
                fh.write(f"    {line}\n")
            fh.write("  developer: \"{}\"\n".format(game["developer"]))
            fh.write("  publisher: \"{}\"\n".format(game["publisher"]))
            fh.write("  players: \"{}\"\n".format(game["players"]))
            fh.write("  genre: \"{}\"\n".format(game["genre"]))
            fh.write("  language: \"{}\"\n".format(game["language"]))
            fh.write("  release_year: \"{}\"\n".format(game["release_year"]))
            fh.write("  image: \"{}\"\n".format(game["image"]))
            fh.write("  video: \"{}\"\n".format(game["video"]))
    print(f"Wrote {len(games_output)} games to {DATA_PATH}")


if __name__ == "__main__":
    import json
    main()
