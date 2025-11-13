# Apple IIGS

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/apple2gs.webp" alt="Apple IIGS icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/apple2gs.png" alt="Apple IIGS logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1986 by Apple, the Apple IIGS was a computer system.

## Technical specifications

- CPU: Western Design Center 65C816 processor running at 2.8 MHz.
- Memory: 256 KB RAM on board, expandable to 1 MB (and beyond with third-party cards).
- Display: Super High-Res mode delivering 320×200 resolution with up to 256 colors from a palette of 4,096.
- Sound: Ensoniq 5503 DOC chip with 32-channel wavetable synthesis plus stereo outputs.

## Supported ROM extensions

2mg, do, nib, po, dsk, mfi, dfi, rti, edd, woz, hfe, mfm, td0, imd, d77, d88, 1dd, cqm, cqui, ima, img, ufi, 360, ipf, dc42, zip, 7z

## Emulators

- **gsplus** (gsplus) – Requires BR2_PACKAGE_GSPLUS | Incompatible extensions: mfi, dfi, rti, edd, woz, hfe, mfm, td0, imd, d77, d88, 1dd, cqm, cqui, ima, img, ufi, 360, ipf, dc42, zip, 7z
- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

If your game does not start using LR-Mame. Ensure you choose the right floppy type for the rom extension.
i.e. some extensions require you to choose the 3 1/2 inch floppy drive (Drive 3).

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
