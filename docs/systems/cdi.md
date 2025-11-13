# CD-i

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/cdi.webp" alt="CD-i icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/cdi.png" alt="CD-i logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1990 by Philips, the CD-i was a console system.

## Technical specifications

- CPU: Philips PCD70332 (68k-derived) running at 15.5 MHz with dedicated CD-i OS support.
- Memory: 1 MB RAM plus 1 MB VRAM dedicated to the VDG graphics pipeline, expandable via expansion modules.
- Display: Custom VDG chip rendering 384×280 and 768×512 interlaced graphics with 24-bit color and sprite overlays.
- Sound: Philips SAA1099 (6-channel PSG) plus PCM digital audio streamed from CD-ROM.

## Supported ROM extensions

chd, cue, toc, nrg, gdi, iso, cdr

## Emulators

- **same_cdi** (libretro) – Requires BR2_PACKAGE_LIBRETRO_SAME_CDI | Incompatible extensions: cue, toc, nrg, gdi, cdr
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

Requires MAME BIOS file cdimono1.zip

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
