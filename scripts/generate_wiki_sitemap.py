#!/usr/bin/env python3
import datetime as dt
import sys
from pathlib import Path
from urllib.parse import urljoin


def build_urls(site_dir: Path, base_url: str) -> list[tuple[str, str]]:
    urls = []
    for path in sorted(site_dir.rglob("*.html")):
        rel = path.relative_to(site_dir).as_posix()
        if rel in ("404.html", "search.html"):
            continue
        if rel.endswith("/search/index.html"):
            continue
        if rel.endswith("index.html"):
            rel = rel[: -len("index.html")]
        url = urljoin(base_url, rel)
        lastmod = dt.datetime.fromtimestamp(
            path.stat().st_mtime, dt.timezone.utc
        ).date().isoformat()
        urls.append((url, lastmod))
    return urls


def write_sitemap(dest: Path, urls: list[tuple[str, str]]) -> None:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url, lastmod in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append("  </url>")
    lines.append("</urlset>")
    dest.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: generate_wiki_sitemap.py SITE_DIR BASE_URL")
        return 2
    site_dir = Path(sys.argv[1]).resolve()
    base_url = sys.argv[2].rstrip("/") + "/"
    if not site_dir.exists():
        print(f"Site dir not found: {site_dir}")
        return 1
    urls = build_urls(site_dir, base_url)
    if not urls:
        print("No HTML pages found; sitemap not written.")
        return 1
    dest = site_dir / "sitemap.xml"
    write_sitemap(dest, urls)
    print(f"Wrote {dest} with {len(urls)} URLs")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
