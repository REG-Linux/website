#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from collections import OrderedDict, defaultdict
from pathlib import Path

import yaml


HEADER_RE = re.compile(r"^#{1,6}\s+(.*)")
LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")
CODE_RE = re.compile(r"`([^`]+)`")
HTML_RE = re.compile(r"<[^>]+>")


def load_mkdocs_meta(path: Path) -> tuple[str, str]:
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    site_name = data.get("site_name", "REG Linux Wiki")
    site_description = data.get("site_description", "")
    return site_name, site_description


def split_front_matter(text: str) -> tuple[dict, str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            fm_text = "\n".join(lines[1:idx]).strip()
            body = "\n".join(lines[idx + 1 :])
            meta = yaml.safe_load(fm_text) or {}
            return meta, body
    return {}, text


def merge_front_matter(meta: dict, body: str) -> str:
    ordered = {}
    for key in ("title", "description"):
        if key in meta:
            ordered[key] = meta[key]
    for key, value in meta.items():
        if key not in ordered:
            ordered[key] = value
    header = yaml.safe_dump(ordered, sort_keys=False, allow_unicode=False).strip()
    body = body.lstrip("\n")
    return f"---\n{header}\n---\n\n{body}"


def titleize(segment: str) -> str:
    segment = segment.replace("_", " ").replace("-", " ").strip()
    segment = re.sub(r"\s+", " ", segment)
    if not segment:
        return ""
    words = []
    for word in segment.split(" "):
        if word.isupper() or any(ch.isdigit() for ch in word):
            words.append(word.upper() if word.isalpha() else word)
        else:
            words.append(word.capitalize())
    return " ".join(words)


def section_from_path(path: Path, docs_root: Path) -> str:
    rel = path.relative_to(docs_root)
    parts = list(rel.parts)
    if parts and parts[-1] == "index.md":
        parts = parts[:-1]
    if not parts:
        return "Home"
    return " / ".join(titleize(part.replace(".md", "")) for part in parts)


def extract_title(body: str) -> str:
    in_code = False
    for line in body.splitlines():
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        match = HEADER_RE.match(line.strip())
        if match:
            return match.group(1).strip()
    return ""


def extract_description(body: str) -> str:
    in_code = False
    after_title = False
    paragraph = []
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if stripped.startswith("#"):
            after_title = True
            continue
        if not after_title:
            continue
        if not stripped:
            if paragraph:
                break
            continue
        if stripped.startswith((">", "-", "*")):
            if paragraph:
                break
            continue
        paragraph.append(stripped)
    text = " ".join(paragraph).strip()
    text = LINK_RE.sub(r"\\1", text)
    text = CODE_RE.sub(r"\\1", text)
    text = HTML_RE.sub("", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def truncate(text: str, max_len: int) -> str:
    if len(text) <= max_len:
        return text
    trimmed = text[: max_len - 3].rstrip()
    return f"{trimmed}..."


def dedupe_title(title: str, section: str) -> str:
    if not section:
        return title
    if section.lower() in title.lower():
        return title
    if title.lower() in {"overview", "devices", "home"}:
        return f"{section} - {title}"
    return f"{title} - {section}"


def dedupe_description(desc: str, section: str, max_len: int) -> str:
    if not section or section.lower() in desc.lower():
        return desc
    suffix = f" Section: {section}."
    if len(desc) + len(suffix) <= max_len:
        return desc + suffix
    return truncate(desc, max_len)


def main() -> int:
    parser = argparse.ArgumentParser(description="Auto-generate unique titles/descriptions for MkDocs pages.")
    parser.add_argument("--docs", type=Path, default=Path("wiki/docs"))
    parser.add_argument("--mkdocs", type=Path, default=Path("wiki/mkdocs.yml"))
    parser.add_argument("--max-desc", type=int, default=160)
    parser.add_argument("--apply", action="store_true", help="Write changes to files.")
    args = parser.parse_args()

    docs_root = args.docs
    if not docs_root.is_dir():
        print(f"Docs directory not found: {docs_root}")
        return 1

    site_name, site_description = load_mkdocs_meta(args.mkdocs)

    pages = []
    for path in sorted(docs_root.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        meta, body = split_front_matter(text)
        title = (meta.get("title") or extract_title(body)).strip()
        desc = (meta.get("description") or extract_description(body)).strip()
        section = section_from_path(path, docs_root)
        pages.append(
            {
                "path": path,
                "text": text,
                "meta": meta,
                "body": body,
                "title": title,
                "desc": desc,
                "section": section,
            }
        )

    title_counts = defaultdict(int)
    desc_counts = defaultdict(int)
    for page in pages:
        if page["title"]:
            title_counts[page["title"]] += 1
        if page["desc"]:
            desc_counts[page["desc"]] += 1

    updated = 0
    for page in pages:
        meta = dict(page["meta"])
        title = page["title"]
        desc = page["desc"]
        if not title:
            title = titleize(page["path"].stem)
        if title_counts[title] > 1:
            title = dedupe_title(title, page["section"])
        if not desc or desc == site_description:
            desc = extract_description(page["body"]).strip()
        if not desc:
            if title and title != site_name:
                desc = f"{title} documentation for REG Linux."
            else:
                desc = "REG Linux documentation and resources."
        desc = truncate(desc, args.max_desc)
        if desc_counts[desc] > 1:
            desc = dedupe_description(desc, page["section"], args.max_desc)

        changed = False
        if meta.get("title") != title:
            meta["title"] = title
            changed = True
        if meta.get("description") != desc:
            meta["description"] = desc
            changed = True

        if changed:
            updated += 1
            if args.apply:
                new_text = merge_front_matter(meta, page["body"])
                page["path"].write_text(new_text, encoding="utf-8")

    print(f"Pages scanned: {len(pages)}")
    print(f"Pages updated: {updated}")
    if not args.apply:
        print("Dry run only. Use --apply to write changes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
