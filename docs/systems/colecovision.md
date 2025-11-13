# ColecoVision

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/colecovision.webp" alt="ColecoVision icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/colecovision.png" alt="ColecoVision logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1982 by Coleco, the ColecoVision was a console system.

## Technical specifications

- Manufacturer: Coleco
- Release year: 1982
- Hardware type: console

## Supported ROM extensions

bin, col, rom, zip, 7z

## Emulators

- **bluemsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BLUEMSX
- **gearcoleco** (libretro) – Requires BR2_PACKAGE_LIBRETRO_GEARCOLECO
- **openmsx** (openmsx) – Requires BR2_PACKAGE_OPENMSX

## Notes

## BIOS ##

- Gearcoleco:
BIOS is needed to run (coleco.rom file).
It is possible to load any BIOS but the original one with md5 2c66f5911e5b42b8ebe113403548eee7 is recommended.

- OpenMSX:
coleco.rom must be in /userdata/system/configs/openmsx/share/systemroms to run Coleco SGM roms.

- BlueMSX:
You must download the BlueMSX standalone version, available to this URL:
http://bluemsx.msxblue.com/rel_download/blueMSXv282full.zip

Extract the "Databases" and "Machines" folders and add them to the bios folder.

Ensure the coleco.rom file (md5sum = 2c66f5911e5b42b8ebe113403548eee7) is inside the folder /bios/Machines/COL - ColecoVision/

## MAPPING ##

JOYPAD_UP     = COLECO 1
JOYPAD_DOWN   = COLECO 2
JOYPAD_LEFT   = COLECO 3
JOYPAD_RIGHT  = COLECO 4
JOYPAD_A      = COLECO 5
JOYPAD_B      = COLECO 6
JOYPAD_X      = COLECO 7
JOYPAD_Y      = COLECO 8
JOYPAD_R2     = COLECO 9
JOYPAD_L2     = COLECO 0
JOYPAD_R      = COLECO BUTTON1
JOYPAD_L      = COLECO BUTTON2
JOYPAD_SELECT = COLECO STAR
JOYPAD_START  = COLECO HASH

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
