# Lovable.dev Design Instructions

## What this project is

REG Linux is a retro gaming OS website. The site is **Jekyll** (static HTML + Liquid templates). Lovable should only redesign the **CSS and HTML structure** — not change the build system.

## What to redesign

The CSS file is at `assets/css/styles.css`. The layout templates are in `_layouts/` and `_includes/`. The pages are `.md` files at the root.

**Pages to redesign:**
- `/` (home) — `index.md`
- `/download/` — `download.md`
- `/play/` — `play.md`
- `/credits/` — `credits.md`
- `/community/` — `community.md`
- `/download/:device/` — `_layouts/device.html`

## Design constraints

- **Dark theme only** — background `#05060a`, text `#f4f6fb`
- **Accent color** — `#2bb0e9` (cyan blue)
- **Fonts** — Space Grotesk (headings), Inter (body), JetBrains Mono (code/data)
- **Keep all existing CSS variables** in `:root` — they're used by the compat widget
- **Mobile responsive** — must work on phones
- **No JavaScript frameworks** — vanilla JS only for interactions (filters, search)

## What NOT to touch

- `compat/` directory — separate Cloudflare Workers project, not part of Jekyll
- `wiki/` directory — MkDocs site, separate
- `_data/*.yml` files — data sources, don't restructure
- `_devices/*.md` files — generated, don't edit individually
- Any Python scripts in `compat/scripts/`
- `CLAUDE.md` — project spec, not part of the website

## Design references

Look at these sites for inspiration:
- **Batocera.org** — clean, minimal, dark retro gaming OS site
- **ROCKNIX.org** — documentation-focused, good use of badges and feature pills
- **Recalbox.com** — polished dark theme with purple/green accents, sidebar nav on mobile

## What to deliver

1. Updated `assets/css/styles.css`
2. Updated `_layouts/default.html` (inline critical CSS)
3. Any new CSS files if needed
4. Updated page `.md` files if HTML structure changes

## How to test

```bash
jekyll build && jekyll serve --host 0.0.0.0 --port 4000
```

## Current live preview

- v2 preview: https://reg-linux-v2.pages.dev/
- Production (old design): https://reglinux.org/

## How changes will be integrated back

CSS changes from Lovable's commits will be merged into the `website-cleanup` branch. If Lovable changes HTML structure in the `.md` pages, those changes will be ported to the Jekyll templates.
