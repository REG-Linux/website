---
title: Flash Player
description: Flash Player documentation for REG Linux.
---

# Flash Player

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/flash.webp" alt="Flash Player icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/flash.png" alt="Flash Player logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Adobe Flash Player once powered countless browser games and interactive experiences, but it was deprecated in 2020. REG-Linux now relies on open-source reimplementations (Lightspark and Ruffle) to keep `.swf` content playable locally without the security issues of the legacy plugin.

### Quick reference

- **ROM folder:** `/userdata/roms/flash`
- **Accepted formats:** `.swf`
- **Emulators:** Lightspark (native), `libretro: ruffle`
- **System group:** `engines`

## BIOS

No BIOS is required.

## Game files

Copy your Flash movies/games (`.swf`) into `/userdata/roms/flash/`. There are no additional assets to drop unless the game points at relative folders—keep any `assets/`, `images/`, or sound folders next to the SWF so Lightspark/Ruffle can load them naturally.

## Emulators

### Lightspark

Lightspark is a C/C++ reimplementation of Flash Player that targets modern PCs and offers AS3 coverage plus OpenGL rendering.

#### Options

Standardized options: `flash.videomode`, `flash.padtokeyboard`, `flash.decoration`.

### Ruffle (libretro)

Ruffle is the Rust-based port that focuses on AS1/2 compatibility and sandboxed playback.

#### Options

Standardized options: `flash.videomode`, `flash.padtokeyboard`, `flash.decoration`.

## Controls

Flash games usually expect keyboard + mouse input. A default RETROpad mapping is provided, but you can remap to shoulder buttons or extra controllers if a title uses arrow keys, space, or mouse clicks.

## Troubleshooting

- If a SWF refuses to start, ensure the file is not corrupted and that any required asset folders remain next to it.
- Some Flash releases depend on unsupported features (like video playback). Try the other engine if one falls back to an error.
- Refer to the generic support pages for additional help.
