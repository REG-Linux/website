# MSX1

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/msx1.webp" alt="MSX1 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/msx1.png" alt="MSX1 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1983 by Microsoft, the MSX1 was a computer system. Its platform tag is `msx` for proper filtering.

## Technical specifications

- CPU: Zilog Z80A running at 3.58 MHz (or compatible clones) with 8-bit bus.
- Memory: Base 64 KB RAM (banks of 16 KB) expandable via mapper cartridges.
- Display: Texas Instruments TMS9918 video chip delivering 256×192 resolution, 16 colors out of 32, and 32 sprites.
- Sound: General Instrument AY-3-8910 PSG providing three square-wave channels and one noise channel.

## Supported ROM extensions

dsk, mx1, rom, zip, 7z, cas, m3u, ogv, openmsx

## Emulators

- **bluemsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BLUEMSX | Incompatible extensions: ogv, openmsx
- **fmsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_FMSX | Incompatible extensions: ogv, openmsx
- **openmsx** (openmsx) – Requires BR2_PACKAGE_OPENMSX | Incompatible extensions: m3u

## Notes

## BIOS ##

- BlueMSX (DEFAULT)
Download the BlueMSX standalone version, available at http://bluemsx.msxblue.com/rel_download/blueMSXv282full.zip
then extract the "Databases" and "Machines" folders and add them to the /userdata/bios folder.

- FMSX
Requires the following files (available with fmsx distribution), in the /userdata/bios folder.
CARTS.SHA
CYRILLIC.FNT
DISK.ROM
FMPAC.ROM
FMPAC16.ROM
ITALIC.FNT
KANJI.ROM
MSX.ROM
MSX2.ROM
MSX2EXT.ROM
MSX2P.ROM
MSX2PEXT.ROM
MSXDOS2.ROM
PAINTER.ROM
RS232.ROM

- OpenMSX
Various BIOS files for OpenMSX should be in either folder below:
    1. userdata/system/configs/openmsx/share/systemroms
    2. userdata/bios/Machines
    3. userdata/bios/openmsx

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
