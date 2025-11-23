# Atari ST

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/atarist.webp" alt="Atari ST icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/atarist.png" alt="Atari ST logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1985 by Atari, the Atari ST was a computer system.

## Technical specifications

- CPU: Motorola 68000 running at 8 MHz.
- Memory: 512 KB base RAM, expandable to 4 MB via SIMM slots on STFM/STE boards.
- Display: 320×200 with 16 colors or 640×400 with 4 colors in monochrome mode; STE adds 4096-color palette and hardware scrolling.
- Sound: Yamaha YM2149F PSG providing three square-wave channels plus noise, with the STE adding DMA-driven 8-bit stereo.

## Supported ROM extensions

st, msa, stx, dim, ipf, m3u, zip, 7z, hd, gemdos, vhd, gem, ide

## Emulators

- **hatari** (hatari)
- **hatari** (libretro)
- **hatarib** (libretro)

## Notes

To enable GEMDOS support within the non-libretro version of Hatari.
Create a directory within the roms folder that has a .gemdos extension.
i.e. /userdata/roms/atarist/<drive name>.gemdos

---