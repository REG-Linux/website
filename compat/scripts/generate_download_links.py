#!/usr/bin/env python3
"""Generate _data/download_links.yml from GitHub releases + download_map.yml.

Fetches the REG-Linux release named in _data/release.yml (`tag`, or the
newest release when it is "latest") from GitHub, matches each device to its
release asset via the mapping in _data/download_map.yml, and writes direct
download URLs to _data/download_links.yml.

Run from the website repo root:
    python3 compat/scripts/generate_download_links.py [--tag TAG]

Requires: GITHUB_TOKEN env var or gh CLI authenticated.
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

import yaml

REPO = "REG-Linux/REG-Linux"
REPO_ROOT = Path(__file__).resolve().parents[2]
DOWNLOAD_MAP = REPO_ROOT / "_data" / "download_map.yml"
OUTPUT = REPO_ROOT / "_data" / "download_links.yml"
RELEASE_FILE = REPO_ROOT / "_data" / "release.yml"


def configured_tag() -> str:
    """Release tag from _data/release.yml ("latest" if unset)."""
    if RELEASE_FILE.exists():
        data = yaml.safe_load(RELEASE_FILE.read_text()) or {}
        return str(data.get("tag") or "latest")
    return "latest"


def fetch_release(tag: str) -> dict:
    """Fetch the release for `tag` (or the newest one for "latest")."""
    endpoint = (
        f"repos/{REPO}/releases/tags/{tag}" if tag != "latest" else f"repos/{REPO}/releases"
    )
    jq = "." if tag != "latest" else ".[0]"
    # Try gh CLI first
    try:
        result = subprocess.run(
            ["gh", "api", endpoint, "--jq", jq],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode == 0 and result.stdout.strip():
            return json.loads(result.stdout)
    except (subprocess.TimeoutExpired, FileNotFoundError, json.JSONDecodeError):
        pass

    # Fallback: direct API call
    import urllib.error
    import urllib.request
    headers = {}
    token = os.environ.get("GITHUB_TOKEN", "")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    headers["User-Agent"] = "reg-linux-download-gen"

    url = (
        f"https://api.github.com/repos/{REPO}/releases/tags/{tag}"
        if tag != "latest"
        else f"https://api.github.com/repos/{REPO}/releases?per_page=1"
    )
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError:
        return {}
    if tag == "latest":
        return data[0] if data else {}
    return data


def main() -> None:
    print("Loading download map...")
    with open(DOWNLOAD_MAP) as f:
        download_map = yaml.safe_load(f) or {}

    print(f"  {len(download_map)} device mappings")

    parser = argparse.ArgumentParser()
    parser.add_argument("--tag", help="release tag (default: _data/release.yml)")
    wanted = parser.parse_args().tag or configured_tag()

    print(f"Fetching release {wanted!r} from {REPO}...")
    release = fetch_release(wanted)

    if not release:
        print(f"ERROR: release {wanted!r} not found in {REPO}")
        sys.exit(1)

    tag = release.get("tag_name", "unknown")
    assets = release.get("assets", [])
    print(f"  Release: {tag} ({len(assets)} assets)")

    # Build asset lookup: slug → download URL
    # Asset name format: reglinux-{slug}-{version}-{date}.img.gz
    asset_urls: dict[str, str] = {}
    for asset in assets:
        name = asset["name"]
        url = asset["browser_download_url"]

        # Strip "reglinux-" prefix and "-{version}-{date}.img.gz" suffix
        # e.g. "reglinux-h700-anbernic-rg35xx-25.09-20251003.img.gz"
        #   → "h700-anbernic-rg35xx"
        slug = name.removeprefix("reglinux-")
        # Remove version-date suffix: find the version pattern
        import re
        slug = re.sub(r'-\d+\.\d+-\d{8}\.img\.gz$', '', slug)

        asset_urls[slug] = url

    print(f"  {len(asset_urls)} asset slugs indexed")

    # Match devices to assets
    links: dict[str, str] = {}
    matched = 0
    unmatched = []

    for device_id, asset_slug in sorted(download_map.items()):
        if asset_slug in asset_urls:
            links[device_id] = asset_urls[asset_slug]
            matched += 1
        else:
            # Try fuzzy match (the release might have slightly different naming)
            found = False
            for known_slug, url in asset_urls.items():
                if asset_slug in known_slug or known_slug in asset_slug:
                    links[device_id] = url
                    matched += 1
                    found = True
                    break
            if not found:
                # Point to generic releases page as fallback
                links[device_id] = f"https://github.com/{REPO}/releases/tag/{tag}"
                unmatched.append((device_id, asset_slug))

    print(f"\nMatched: {matched}/{len(download_map)}")
    if unmatched:
        print(f"Unmatched ({len(unmatched)}):")
        for dev_id, slug in unmatched:
            print(f"  {dev_id} → {slug}")

    # Write output
    with open(OUTPUT, "w") as f:
        f.write(f"# Auto-generated from GitHub release {tag}\n")
        f.write(f"# {matched} direct download links, {len(unmatched)} fallbacks\n\n")
        for device_id, url in sorted(links.items()):
            f.write(f"{device_id}: {url}\n")

    print(f"\nWrote {len(links)} links to {OUTPUT}")


if __name__ == "__main__":
    main()
