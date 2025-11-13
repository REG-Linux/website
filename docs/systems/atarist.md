# Atari ST

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/atarist.webp" alt="Atari ST icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/atarist.png" alt="Atari ST logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1985 by Atari, the Atari ST was a computer system.

## Technical specifications

- Manufacturer: Atari
- Release year: 1985
- Hardware type: computer

## Supported ROM extensions

st, msa, stx, dim, ipf, m3u, zip, 7z, hd, gemdos, vhd, gem, ide

## Emulators

- **hatari** (hatari) – Requires BR2_PACKAGE_HATARI
- **hatari** (libretro) – Requires BR2_PACKAGE_LIBRETRO_HATARI | Incompatible extensions: hd, gemdos
- **hatarib** (libretro) – Requires BR2_PACKAGE_LIBRETRO_HATARIB | Incompatible extensions: hd, gemdos

## Notes

To enable GEMDOS support within the non-libretro version of Hatari.
Create a directory within the roms folder that has a .gemdos extension.
i.e. /userdata/roms/atarist/<drive name>.gemdos

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
