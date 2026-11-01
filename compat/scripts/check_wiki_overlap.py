#!/usr/bin/env python3
"""Check that wiki pages don't reuse text from another project's documentation.

Compares every Markdown page of the wiki with one or more reference doc trees
(for example a checkout of github.com/ROCKNIX/rocknix.org) using 8-word
shingles, after undoing the usual brand swaps, and fails when a page shares
more than --max-percent of its shingles with the references.

    python3 compat/scripts/check_wiki_overlap.py wiki/docs /path/to/rocknix.org/docs [...]
"""

import argparse
import re
import sys
from pathlib import Path

K = 8
SWAPS = [("rocknix", "reg linux"), ("emulation station", "reg-es"), ("emulationstation", "reg-es")]


def words(text: str, swap: bool) -> list[str]:
    text = re.sub(r"^---\n.*?\n---\n", " ", text, flags=re.S)
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.lower()
    if swap:
        for old, new in SWAPS:
            text = text.replace(old, new)
    return re.findall(r"[a-z0-9][a-z0-9'+.-]*[a-z0-9]|[a-z0-9]", text)


def shingles(ws: list[str]) -> set[tuple[str, ...]]:
    return {tuple(ws[i:i + K]) for i in range(len(ws) - K + 1)}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("wiki", type=Path, help="wiki docs directory")
    ap.add_argument("refs", type=Path, nargs="+", help="reference documentation trees")
    ap.add_argument("--max-percent", type=float, default=10.0)
    args = ap.parse_args()

    ref: set[tuple[str, ...]] = set()
    for root in args.refs:
        for p in root.rglob("*.md"):
            ref |= shingles(words(p.read_text(encoding="utf-8", errors="replace"), swap=True))

    worst = []
    for p in sorted(args.wiki.rglob("*.md")):
        sh = shingles(words(p.read_text(encoding="utf-8", errors="replace"), swap=False))
        if not sh:
            continue
        pct = 100.0 * len(sh & ref) / len(sh)
        worst.append((pct, p.relative_to(args.wiki).as_posix()))

    worst.sort(reverse=True)
    over = [w for w in worst if w[0] > args.max_percent]
    for pct, page in worst[:15]:
        print(f"{pct:5.1f} %  {page}")
    print(f"\n{len(worst)} pages checked, {len(over)} above {args.max_percent} %")
    return 1 if over else 0


if __name__ == "__main__":
    sys.exit(main())
