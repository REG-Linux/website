# Amiga AGA

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/amiga1200.webp" alt="Amiga AGA icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/amiga1200.png" alt="Amiga AGA logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1992 by Commodore, the Amiga AGA was a computer system. It is grouped with amiga titles in EmulationStation. Its platform tag is `amiga` for proper filtering.

## Technical specifications

- CPU: Motorola 68EC020 at 14 MHz with a 32-bit internal data path and 24-bit external address bus.
- Memory: 2 MB Chip RAM standard (expandable with Fast RAM via the CPU slot and expansions up to 8 MB+).
- Display: AGA chipset capable of 256 colors at 320×256/512×256 or 64 colors in HAM-8 mode from a 16.8-million-color palette.
- Sound: Paula audio engine with four-channel stereo PCM and same-featured audio pipeline as other ECS/AGA machines.

## Supported ROM extensions

adf, uae, ipf, dms, dmz, adz, lha, hdf, exe, m3u, zip, raw, scp

## Emulators

- **A1200** (amiberry) – Requires BR2_PACKAGE_AMIBERRY, BR2_PACKAGE_AMIBERRY_LITE | Incompatible extensions: m3u
- **A4000** (amiberry) – Requires BR2_PACKAGE_AMIBERRY, BR2_PACKAGE_AMIBERRY_LITE | Incompatible extensions: m3u
- **puae** (libretro) – Requires BR2_PACKAGE_LIBRETRO_PUAE
- **puae2021** (libretro) – Requires BR2_PACKAGE_LIBRETRO_PUAE2021
- **uae4arm** (libretro) – Requires BR2_PACKAGE_LIBRETRO_UAE4ARM

## Notes

For more info: https://wiki.batocera.org/systems:amiga500

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
