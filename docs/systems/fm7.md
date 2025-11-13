# FM-7

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/fm7.webp" alt="FM-7 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/fm7.png" alt="FM-7 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1982 by Fujitsu, the FM-7 was a computer system.

## Technical specifications

- CPU: Motorola 6809E dual-processor setup running at 2 MHz (with two CPUs for foreground/background tasks).
- Memory: 64 KB RAM (expandable with external RAM boards) plus 32 KB ROM for BASIC/OS.
- Display: Two Motorola MC6847 graphics chips providing 320×200 resolution with 8 colors per pixel, plus 640×200 monochrome text modes.
- Sound: PSG audio via AY-3-8910 offering three square-wave channels and one noise channel.

## Supported ROM extensions

wav, t77, mfi, dfi, hfe, mfm, td0, imd, d77, d88, 1dd, cqm, cqi, dsk, zip, 7z

## Emulators

- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

Requires MAME BIOS file fm7.zip, and optionally fm77av.zip for FM-77AV support.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
