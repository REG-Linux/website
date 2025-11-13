# Triforce

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/triforce.webp" alt="Triforce icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/triforce.png" alt="Triforce logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2003 by Namco, Sega, Nintendo, the Triforce was a arcade system. Its platform tag is `triforce, arcade` for proper filtering.

## Technical specifications

- CPU: IBM PowerPC Gekko core at 485 MHz (GameCube-based) with a 256-bit SIMD unit.
- Memory: 24 MB of 1T-SRAM plus 16 MB of auxiliary texture RAM and 4 MB of embedded framebuffer memory.
- Display: ATI “Flipper”-derived GPU capable of 480p/720p tiled 3D polygons with hardware lighting and texture mapping.
- Sound: Custom Dolby Pro Logic II-capable audio pipeline with 24-bit PCM mixing derived from the GameCube architecture.

## Supported ROM extensions

gcm, iso, gcz, ciso, wbfs, elf, dol, m3u

## Emulators

- **dolphin_triforce** (dolphin_triforce) – Requires BR2_PACKAGE_DOLPHIN_TRIFORCE

## Notes

Triforce is an arcade machine based on the GameCube's hardware. This build only supports certain games.
Playable - Mario Kart GP 1, Mario Kart GP 2 (after loading save state).
Intro - F-Zero AX, Virtua Striker 2002.
Nothing - All other Triforce games.

For the most up-to-date information and questions about manual save state download, visit https://wiki.batocera.org/systems:triforce

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
