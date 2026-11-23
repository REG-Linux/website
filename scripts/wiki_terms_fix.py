#!/usr/bin/env python3
"""One-shot wording pass over wiki/docs: REG product names and leftovers.

- EmulationStation / REG-ES -> REG Station (the REG-Linux frontend)
- REG-Linux.conf -> system.conf
- option table headers: REG Station setting / system.conf key
- the /remapping_controls_per_emulator link (not a REG page) -> the controllers page

Run from the website repo root:  python3 scripts/wiki_terms_fix.py [--dry-run]
"""
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "wiki" / "docs"
DRY = "--dry-run" in sys.argv

RULES = [
    # names
    (re.compile(r"\bREG-ES\b"), "REG Station"),
    (re.compile(r"\bEmulationStation's\b"), "REG Station's"),
    (re.compile(r"\bEmulationStation’s\b"), "REG Station’s"),
    (re.compile(r"\bEmulationStation\b"), "REG Station"),
    (re.compile(r"\bREG-Linux\.conf\b"), "system.conf"),
    # option tables: REG's own column names
    (re.compile(r"\bES setting name\b"), "REG Station setting"),
    (re.compile(r"\bREG-Linux\.conf_key\b"), "`system.conf` key"),
    (re.compile(r"Description => ES option key_value"), "Description => values"),
    # dead link
    (re.compile(r"`?/remapping_controls_per_emulator`?"), "[Controllers](/wiki/start-here/controllers/)"),
]

changed = 0
hits = 0
for md in sorted(DOCS.rglob("*.md")):
    text = md.read_text(encoding="utf-8")
    new = text
    for rx, rep in RULES:
        new, n = rx.subn(rep, new)
        hits += n
    if new != text:
        changed += 1
        if not DRY:
            md.write_text(new, encoding="utf-8")
print(f"{'would change' if DRY else 'changed'} {changed} files, {hits} replacements")
