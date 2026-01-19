---
title: Abuse
description: Abuse documentation for REG Linux.
---

# Abuse

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/abuse.webp" alt="Abuse icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

Abuse is a 2D run-and-gun classic that ships as a native SDL port on REG-Linux. It lives in the `ports` category so it stays apart from console systems while still sharing the familiar front-end controls.

### Quick reference

- **ROM folder:** `/userdata/roms/abuse`
- **Accepted format:** `.game`
- **Engine:** SDL-based Abuse port
- **System group:** `ports`

## BIOS

No BIOS files are needed.

## Game data

Install the data via the Content Downloader (`ports-abuse` package) or manually extract one of the archives such as `abuse-data-2.00.tar.gz` into `/userdata/roms/abuse/abuse_data/`. Create a blank marker file `/userdata/roms/abuse/abuse.game` so the system appears in the ports list.

## Engine

The SDL-based Abuse engine reads the files from `abuse_data` and launches them using the `.game` entry. The port exposes `abuse.videomode` for display scaling.

## Controls

Abuse defaults to keyboard + mouse, but REG-Linux ships with a pad2key profile that maps movement/aim to the Retropad. Adjust buttons in `/remapping_controls_per_emulator` if you prefer a different layout.

## Troubleshooting

- Ensure `abuse.game` exists and that `abuse_data/` contains the unpacked content.
- If files go missing or the engine crashes, reinstall via the Content Downloader or re-extract the archive.
- For broader bugs consult the generic support pages.
