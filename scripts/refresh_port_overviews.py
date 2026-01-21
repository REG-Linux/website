#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

import yaml


DOCS_ROOT = Path("wiki/docs")
PORTS_DATA = Path("_data/ports.yml")
PLACEHOLDER_PATTERNS = [
    "port platform developed by Ports",
    "port system",
    "ports titles",
    "platform tag",
]


def slug_from_url(url: str) -> str:
    return url.rstrip("/").split("/")[-1]


def strip_front_matter(text: str) -> str:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return text
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            return "\n".join(lines[idx + 1 :])
    return text


def clean_markdown(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_overview(path: Path) -> str:
    text = strip_front_matter(path.read_text(encoding="utf-8"))
    lines = text.splitlines()
    start = None
    for idx, line in enumerate(lines):
        if line.strip().lower() == "## overview":
            start = idx + 1
            break
    if start is None:
        for idx, line in enumerate(lines):
            if line.lstrip().startswith("# "):
                start = idx + 1
                break
    if start is None:
        return ""

    paragraph = []
    for line in lines[start:]:
        stripped = line.strip()
        if stripped.startswith("#"):
            if paragraph:
                break
            continue
        if stripped.startswith("<"):
            continue
        if not stripped:
            if paragraph:
                break
            continue
        paragraph.append(stripped)

    return clean_markdown(" ".join(paragraph))


def polish_text(name: str, text: str) -> str:
    text = text.replace("REG-Linux", "REG Linux")
    text = text.replace("EmulationStation", "REG-Station")
    text = text.replace("`ports`", "Ports").replace("`port`", "Ports")
    text = text.replace("`", "")

    lower = text.lower()
    name_lower = name.lower()
    if lower.startswith(f"{name_lower} is "):
        text = f"Enjoy {name}, {text[len(name) + 4 :]}"
    elif lower.startswith(f"the {name_lower} is "):
        text = f"Enjoy {name}, {text[len(name) + 8 :]}"
    elif lower.startswith(f"{name_lower} was "):
        text = f"Enjoy {name}, {text[len(name) + 4 :]}"
    elif lower.startswith(f"the {name_lower} was "):
        text = f"Enjoy {name}, {text[len(name) + 8 :]}"

    sentences = re.split(r"(?<=[.!?])\s+", text)
    if len(sentences) > 2:
        text = " ".join(sentences[:2]).strip()

    if text and text[-1] not in ".!?":
        text = text + "."
    return text


def should_replace(overview: str) -> bool:
    return any(pattern in overview for pattern in PLACEHOLDER_PATTERNS)


def main() -> int:
    ports = yaml.safe_load(PORTS_DATA.read_text(encoding="utf-8")) or []

    updated = 0
    for port in ports:
        overview = port.get("overview", "") or ""
        if not should_replace(overview):
            continue
        url = port.get("url", "")
        if not url:
            continue
        slug = slug_from_url(url)
        doc_path = None
        if "/wiki/ports/" in url:
            doc_path = DOCS_ROOT / "ports" / f"{slug}.md"
        elif "/wiki/games/" in url:
            doc_path = DOCS_ROOT / "games" / f"{slug}.md"
        if not doc_path or not doc_path.exists():
            continue

        extracted = extract_overview(doc_path)
        if not extracted:
            continue
        port["overview"] = polish_text(port.get("name", slug), extracted)
        updated += 1

    PORTS_DATA.write_text(
        yaml.safe_dump(
            ports,
            sort_keys=False,
            allow_unicode=False,
            width=1000,
        ),
        encoding="utf-8",
    )
    print(f"Updated overviews: {updated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
