# MSX Turbo-R

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/msxturbor.webp" alt="MSX Turbo-R icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/msxturbor.png" alt="MSX Turbo-R logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1990 by Microsoft, the MSX Turbo-R was a computer system. Its platform tag is `msxturbor` for proper filtering.

## Technical specifications

- CPU: R800 (a 16-bit tweaked Z80-compatible) running at 7.16 MHz plus a secondary Zilog Z80 for backward compatibility.
- Memory: 64 KB main RAM with bank-switching, dedicated 32 KB for video/ROM windows, and optional cartridge RAM.
- Display: Yamaha V9958 VDP with 192 colors on-screen, hardware sprite rotation/scaling, and support for interlaced 512 resolutions.
- Sound: AY-3-8910 PSG plus high-quality PCM channels exposed through the V9958 DACs.

## Supported ROM extensions

dsk, mx2, rom, zip, 7z, openmsx, m3u

## Emulators

- **bluemsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BLUEMSX | Incompatible extensions: openmsx
- **openmsx** (openmsx) – Requires BR2_PACKAGE_OPENMSX

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
