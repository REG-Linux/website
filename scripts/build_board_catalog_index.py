#!/usr/bin/env python3
"""Build a catalog index that links all generated board pages."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BOARD_DIR = ROOT / 'docs' / 'board'
OUTPUT = BOARD_DIR / 'catalog.md'
AGGREGATOR_FILES = {
    'allwinner.md',
    'amlogic.md',
    'broadcom.md',
    'mediatek.md',
    'qualcomm.md',
    'rockchip.md',
    'samsung.md',
}


def first_sentence(text: str) -> str:
    text = text.replace('\n', ' ').strip()
    if not text:
        return ''
    sentences = [sentence.strip() for sentence in text.split('. ') if sentence.strip()]
    if not sentences:
        return ''
    sentence = sentences[0]
    if not sentence.endswith('.'):
        sentence = f'{sentence}.'
    return sentence


def parse_board(path: Path) -> tuple[str, str, str, str]:
    text = path.read_text(encoding='utf-8').splitlines()
    title = ''
    body_start = 0

    for idx, line in enumerate(text):
        if line.startswith('# '):
            title = line[2:].strip()
            body_start = idx + 1
            break
    lede_lines: list[str] = []
    in_quick = False
    manufacturer = 'Unknown'
    soc = ''

    for line in text[body_start:]:
        if line.strip().startswith('## '):
            if line.strip().lower().startswith('## quick facts'):
                in_quick = True
                continue
            break
        if not line.strip():
            continue
        lede_lines.append(line.strip())

    for line in text:
        if line.strip().lower().startswith('- **manufacturer**'):
            parts = line.split(':', 1)
            if len(parts) == 2:
                manufacturer = parts[1].strip()
        if line.strip().lower().startswith('- **soc**'):
            parts = line.split(':', 1)
            if len(parts) == 2:
                soc = parts[1].strip()
        if line.strip().startswith('## ') and 'quick facts' in line.lower():
            in_quick = True
        if in_quick and line.strip().startswith('## ') and 'quick facts' not in line.lower():
            break

    summary = first_sentence(' '.join(lede_lines))

    return title or path.stem, manufacturer or 'Unknown', soc, summary


def main() -> None:
    entries: dict[str, list[tuple[str, str, str, str]]] = {}
    for path in sorted(BOARD_DIR.glob('*.md')):
        if path.name in AGGREGATOR_FILES or path.name == OUTPUT.name:
            continue
        title, manufacturer, soc, summary = parse_board(path)
        entries.setdefault(manufacturer, []).append((title, path.stem, soc, summary))

    for values in entries.values():
        values.sort(key=lambda item: item[0].lower())

    lines: list[str] = []
    lines.append('# Board catalog')
    lines.append('The download catalog now exposes one REG Linux page per supported single-board product. Use this index to jump directly to the device guide, then follow the quick facts for flashing notes and background context.')
    lines.append('')
    lines.append('## Catalog by manufacturer')
    for manufacturer in sorted(entries.keys(), key=str.lower):
        lines.append(f'### {manufacturer}')
        for title, slug, soc, summary in entries[manufacturer]:
            parts: list[str] = [f'- [{title}](board/{slug}.md)']
            if soc:
                parts.append(f'**SoC:** {soc}')
            if summary:
                parts.append(summary)
            lines.append(' — '.join(parts))
        lines.append('')
    lines.append('## See also')
    for agg in sorted(AGGREGATOR_FILES):
        name = agg.replace('.md', '').replace('-', ' ').title()
        lines.append(f'- [{name} boards](board/{agg})')
    lines.append('')
    OUTPUT.write_text('\n'.join(lines).strip() + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
