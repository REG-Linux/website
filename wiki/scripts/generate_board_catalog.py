#!/usr/bin/env python3
"""Generate per-board markdown files from REG Linux download data."""

from __future__ import annotations

import re
import sys
import textwrap
import time
from pathlib import Path
from typing import Iterable, Mapping

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT / 'docs' / 'board'
DOWNLOAD_URL = 'https://reglinux.org/download/'
AGGREGATOR_FILES = {
    'allwinner.md',
    'amlogic.md',
    'broadcom.md',
    'mediatek.md',
    'qualcomm.md',
    'rockchip.md',
    'samsung.md',
}


def build_slug_context() -> dict[str, dict[str, str]]:
    """Parse existing board summaries to link slugs back to SoC/section info."""

    slug_context: dict[str, dict[str, str]] = {}

    for filename in sorted(AGGREGATOR_FILES):
        path = DOCS_DIR / filename
        if not path.exists():
            continue
        section = None
        buffer: list[str] = []

        def flush() -> None:
            nonlocal section, buffer
            if section is None:
                return
            desc_parts: list[str] = []
            slugs: list[str] = []
            for line in buffer:
                stripped = line.strip()
                if not stripped:
                    continue
                if stripped.startswith('*'):
                    matches = re.findall(r'`([^`]+)`', stripped)
                    slugs.extend(matches)
                else:
                    desc_parts.append(stripped)
            desc = ' '.join(desc_parts).replace('\n', ' ').strip()
            for slug in slugs:
                slug_context.setdefault(slug, {})['section'] = section
                slug_context[slug]['source'] = filename
                if desc:
                    slug_context[slug]['section_desc'] = desc
            buffer = []

        for raw in path.read_text(encoding='utf-8').splitlines():
            if raw.startswith('## '):
                flush()
                section = raw[3:].strip()
                buffer = []
            elif section is not None:
                buffer.append(raw)
        flush()
    return slug_context


def fetch_soup(url: str, session: requests.Session) -> BeautifulSoup:
    resp = session.get(url, timeout=15)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, 'html.parser')


def extract_cards(soup: BeautifulSoup) -> list[dict[str, str]]:
    cards: list[dict[str, str]] = []
    for card in soup.select('a.device-card'):
        href = card.get('href', '').strip()
        if not href:
            continue
        slug = href.strip('/').split('/')[-1]
        name_elem = card.select_one('h3')
        summary_elem = card.select_one('p')
        cards.append({
            'slug': slug,
            'name': name_elem.get_text(' ', strip=True) if name_elem else slug,
            'summary': summary_elem.get_text(' ', strip=True) if summary_elem else '',
        })
    return cards


def parse_board_page(slug: str, session: requests.Session) -> dict[str, object]:
    page = fetch_soup(f"{DOWNLOAD_URL}{slug}/", session)
    hero = page.select_one('section.hero') or page.select_one('header.hero')
    title = hero.select_one('h1').get_text(' ', strip=True) if hero else slug
    lede = ''
    if hero:
        lede_elem = hero.select_one('.lede')
        if lede_elem:
            lede = lede_elem.get_text(' ', strip=True)
    highlights = []
    for li in page.select('.hero-highlights li'):
        highlights.append(li.get_text(' ', strip=True))
    specs: list[tuple[str, str]] = []
    for card in page.select('.device-specs .spec-card'):
        key_elem = card.select_one('h3')
        value_elem = card.select_one('p')
        if key_elem and value_elem:
            key = key_elem.get_text(' ', strip=True)
            value = value_elem.get_text(' ', strip=True)
            specs.append((key, value))
    steps = [li.get_text(' ', strip=True) for li in page.select('section.install-notes ol.steps li')]
    detail_blocks: list[tuple[str | None, list[str]]] = []
    for card in page.select('.board-details article.card'):
        heading_elem = card.select_one('h3')
        heading = heading_elem.get_text(' ', strip=True) if heading_elem else None
        block_lines: list[str] = []
        # capture paragraphs and lists
        for elem in card.find_all(['p', 'ul'], recursive=False):
            if elem.name == 'p':
                text = elem.get_text(' ', strip=True)
                if text:
                    block_lines.append(text)
            elif elem.name == 'ul':
                for li in elem.select('li'):
                    text = li.get_text(' ', strip=True)
                    if text:
                        block_lines.append(f'- {text}')
        if block_lines:
            detail_blocks.append((heading, block_lines))
    # fallback for cases where details exist outside structure
    if not detail_blocks:
        generic = page.select_one('div.board-details')
        if generic:
            detail_blocks.append((None, [generic.get_text(' ', strip=True)]))
    board_link = ''
    for btn in page.select('.hero-cta a'):
        href = btn.get('href', '')
        if '/board/' in href:
            board_link = href.strip()
            if board_link.startswith('/'):
                board_link = f'https://reglinux.org{board_link}'
            break
    return {
        'title': title,
        'lede': lede,
        'highlights': highlights,
        'specs': specs,
        'install': steps,
        'details': detail_blocks,
        'board_page': board_link,
    }


def render_markdown(slug: str, info: dict[str, object], context: dict[str, str]) -> str:
    title = info['title']
    lede = info['lede']
    highlights = info['highlights']
    specs = info['specs']
    steps = info['install']
    details = info['details']
    board_page = info['board_page']

    pieces: list[str] = []
    pieces.append(f"# {title}")
    if lede:
        pieces.append(f"{lede}")
    # quick facts
    if highlights:
        pieces.append('## Quick facts')
        for item in highlights:
            if ':' in item:
                key, value = item.split(':', 1)
                pieces.append(f"- **{key.strip()}**: {value.strip()}")
            else:
                pieces.append(f"- {item}")
    # specs table
    if specs:
        pieces.append('## Specs')
        pieces.append('| Property | Value |')
        pieces.append('| --- | --- |')
        for key, value in specs:
            pieces.append(f'| {key} | {value} |')
    # install steps
    if steps:
        pieces.append('## Installation notes')
        for idx, step in enumerate(steps, 1):
            pieces.append(f"{idx}. {step}")
    # board details
    if details:
        pieces.append('## Board family guidance')
        for heading, lines in details:
            if heading:
                pieces.append(f'### {heading}')
            pieces.extend(lines)
    # vendor context
    if context:
        section = context.get('section')
        desc = context.get('section_desc')
        source = context.get('source')
        if section or desc or source:
            pieces.append('## Vendor context')
            if desc:
                pieces.append(desc)
            if section and source:
                md_link = f'docs/board/{source}'
                pieces.append(f'See the *{section}* section in [{source}]({md_link}) for the supported device matrix.')
    # resources
    pieces.append('## Resources')
    pieces.append(f'- REG Linux download page: https://reglinux.org/download/{slug}/')
    if board_page:
        pieces.append(f'- Official REG Linux board page: {board_page}')
    return '\n\n'.join(pieces).strip() + '\n'


def main() -> int:
    session = requests.Session()
    slug_context = build_slug_context()
    catalog_soup = fetch_soup(DOWNLOAD_URL, session)
    cards = extract_cards(catalog_soup)
    if not cards:
        print('no boards found on download page', file=sys.stderr)
        return 1
    for card in cards:
        slug = card['slug']
        try:
            board_info = parse_board_page(slug, session)
        except Exception as exc:  # pragma: no cover - network
            print(f'skipping {slug} due to {exc}', file=sys.stderr)
            continue
        board_info.setdefault('title', card['name'])
        board_info.setdefault('lede', card['summary'])
        data = render_markdown(slug, board_info, slug_context.get(slug, {}))
        target = DOCS_DIR / f"{slug}.md"
        target.write_text(data, encoding='utf-8')
        time.sleep(0.1)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
