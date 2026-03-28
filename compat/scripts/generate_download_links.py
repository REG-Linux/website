#!/usr/bin/env python3
"""Generate _data/download_links.yml from GitHub releases + download_map.yml.

Fetches the latest REG-Linux release from GitHub, matches each device
to its release asset via the mapping in _data/download_map.yml, and
writes direct download URLs to _data/download_links.yml.

Run from the website repo root:
    python3 compat/scripts/generate_download_links.py

Requires: GITHUB_TOKEN env var or gh CLI authenticated.
"""

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


def fetch_latest_release() -> dict:
    """Fetch the latest release from GitHub API."""
    # Try gh CLI first
    try:
        result = subprocess.run(
            ["gh", "api", f"repos/{REPO}/releases", "--jq", ".[0]"],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode == 0 and result.stdout.strip():
            return json.loads(result.stdout)
    except (subprocess.TimeoutExpired, FileNotFoundError, json.JSONDecodeError):
        pass

    # Fallback: direct API call
    import urllib.request
    headers = {}
    token = os.environ.get("GITHUB_TOKEN", "")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    headers["User-Agent"] = "reg-linux-download-gen"

    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/releases?per_page=1",
        headers=headers,
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        releases = json.loads(resp.read())
        return releases[0] if releases else {}


def main() -> None:
    print("Loading download map...")
    with open(DOWNLOAD_MAP) as f:
        download_map = yaml.safe_load(f) or {}

    print(f"  {len(download_map)} device mappings")

    print(f"Fetching latest release from {REPO}...")
    release = fetch_latest_release()

    if not release:
        print("ERROR: No releases found")
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
