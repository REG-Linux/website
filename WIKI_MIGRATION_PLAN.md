# Wiki Move Plan (reglinux.org/wiki)

## Phase 1: Build + URL move
- Update MkDocs `site_url` to `https://reglinux.org/wiki/`.
- Build Jekyll to `_site/`, then build MkDocs into `_site/wiki`.
- Deploy the merged `_site` to GitHub Pages.
- Add `https://reglinux.org/wiki/sitemap.xml` to `robots.txt`.

## Phase 2: Redirect + SEO
- Cloudflare 301 redirect: `wiki.reglinux.org/*` → `https://reglinux.org/wiki/$1`.
- Keep the subdomain redirect long‑term (recommended).
- Disable old wiki GH Pages publish after `/wiki` is live.

## Phase 3: Shared data model
- Define a canonical `devices.yml` (manufacturers, device families, devices, compatibility).
- Jekyll consumes the dataset for downloads/manufacturers/compatibility.
- MkDocs uses macros to inject device facts and generate device tables.

## Phase 4: Validation
- CI checks for missing wiki paths, missing device IDs, and schema drift.
