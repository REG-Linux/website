#!/usr/bin/env python3
import argparse
import os
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser

IGNORE_SCHEMES = ("mailto:", "tel:", "javascript:", "data:")
IGNORE_LINK_RELS = {"preconnect", "dns-prefetch"}


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.entries = []

    def handle_starttag(self, tag, attrs):
        attr_map = {k.lower(): v for k, v in attrs}
        url = attr_map.get("href") or attr_map.get("src")
        if not url:
            return
        rels = set()
        rel = attr_map.get("rel")
        if rel:
            rels = {part.strip().lower() for part in rel.split() if part.strip()}
        self.entries.append((tag.lower(), url, rels))


def internal_exists(url, source_path, site_root):
    url_no_frag = url.split("#", 1)[0].split("?", 1)[0]
    if not url_no_frag:
        return True

    if url_no_frag.startswith("/"):
        target = os.path.join(site_root, url_no_frag.lstrip("/"))
    else:
        target = os.path.normpath(os.path.join(os.path.dirname(source_path), url_no_frag))

    if os.path.exists(target):
        return True
    if os.path.isdir(target):
        return os.path.exists(os.path.join(target, "index.html"))
    if not os.path.splitext(target)[1]:
        return os.path.exists(target + ".html")
    return False


def check_url(url, timeout=20):
    headers = {"User-Agent": "reglinux-link-check/1.0 (+https://reglinux.org)"}

    def do_req(method):
        req = urllib.request.Request(url, method=method, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status
        except urllib.error.HTTPError as exc:
            return exc.code
        except Exception:
            return None

    status = do_req("HEAD")
    if status is None or status >= 400:
        status = do_req("GET")
    return status


def collect_links(site_root):
    links = []
    for dirpath, _, filenames in os.walk(site_root):
        for filename in filenames:
            if not filename.endswith(".html"):
                continue
            path = os.path.join(dirpath, filename)
            try:
                data = open(path, "r", encoding="utf-8", errors="ignore").read()
            except Exception:
                continue
            parser = LinkParser()
            parser.feed(data)
            for tag, url, rels in parser.entries:
                links.append((tag, url.strip(), rels, path))
    return links


def main():
    parser = argparse.ArgumentParser(description="Check built site links for 404s.")
    parser.add_argument("--site", default="_site", help="Path to built site directory.")
    parser.add_argument("--no-internal", action="store_true", help="Skip internal link checks.")
    args = parser.parse_args()

    site_root = os.path.abspath(args.site)
    if not os.path.isdir(site_root):
        print(f"Site directory not found: {site_root}", file=sys.stderr)
        return 2

    links = collect_links(site_root)
    external = {}
    internal = {}

    for tag, url, rels, source_path in links:
        if not url or url.startswith("#"):
            continue
        if any(url.lower().startswith(scheme) for scheme in IGNORE_SCHEMES):
            continue
        if tag == "link" and rels & IGNORE_LINK_RELS:
            continue
        if url.startswith("//"):
            url = "https:" + url
        if url.startswith("http://") or url.startswith("https://"):
            external.setdefault(url, []).append(source_path)
        else:
            internal.setdefault(url, []).append(source_path)

    broken_internal = []
    if not args.no_internal:
        for url, sources in sorted(internal.items()):
            if not internal_exists(url, sources[0], site_root):
                broken_internal.append((url, sources[0]))

    broken_external = []
    for url, sources in sorted(external.items()):
        status = check_url(url)
        if status is None or status >= 400:
            broken_external.append((url, status, sources[0]))

    if broken_internal:
        print("BROKEN_INTERNAL", len(broken_internal))
        for url, source in broken_internal:
            print(f"{url} -> {source}")

    if broken_external:
        print("BROKEN_EXTERNAL", len(broken_external))
        for url, status, source in broken_external:
            print(f"{status} {url} -> {source}")

    if broken_internal or broken_external:
        return 1
    print("OK: no broken links found")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
