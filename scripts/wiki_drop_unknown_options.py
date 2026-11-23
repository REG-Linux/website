#!/usr/bin/env python3
"""Drop option-table rows whose key REG Station does not define.

usage: wiki_drop_unknown_options.py <path to REG-Linux es_features.yml>
Rows are kept when the key (after "<system>.") appears in es_features.yml,
for header rows, and for file names (BIOS tables).
"""
import collections
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "wiki" / "docs"
tokens = set(re.findall(r"[A-Za-z0-9_\-]+", Path(sys.argv[1]).read_text()))
row = re.compile(r"^\|[^|\n]*`([a-z0-9_]+)\.([a-zA-Z0-9_\-\.]+)`[^\n]*\|\s*\n", re.M)
FILE = re.compile(r"\.(zip|7z|bin|rom|img|chd|iso|dat|sys|ic\d+)$", re.I)
removed = []
for f in sorted(DOCS.rglob("*.md")):
    t = f.read_text(encoding="utf-8")
    if "`system.conf` key" not in t:
        continue

    def keep(m):
        line, sysname, key = m.group(0), m.group(1), m.group(2)
        if "`system.conf` key" in line or sysname == "system" or FILE.search(sysname + "." + key):
            return line
        if key in tokens:
            return line
        removed.append((f.name, f"{sysname}.{key}"))
        return ""

    n = row.sub(keep, t)
    if n != t:
        f.write_text(n, encoding="utf-8")
print(len(removed), "rows removed:", dict(collections.Counter(f for f, _ in removed)))
for f, k in removed:
    print(f"  {f}: {k}")
