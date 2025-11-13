# GameCube

## Overview

Introduced in 2001 by Nintendo, the GameCube was a console system. Its platform tag is `gc` for proper filtering.

## Technical specifications

- Manufacturer: Nintendo
- Release year: 2001
- Hardware type: console
- Platform tag: gc

## Supported ROM extensions

gcm, iso, gcz, ciso, wbfs, rvz, elf, dol, m3u, json

## Emulators

- **dolphin** (dolphin) – Requires BR2_PACKAGE_DOLPHIN_EMU
- **dolphin** (libretro) – Requires BR2_PACKAGE_LIBRETRO_DOLPHIN

## Notes

To initiate the boot animation and access the BIOS settings.
Please ensure that you have the necessary BIOS file (IPL.bin) available in one of the designated locations:

- /userdata/bios/GC/EUR/IPL.bin
- /userdata/bios/GC/USA/IPL.bin
- /userdata/bios/GC/JAP/IPL.bin

You can access the BIOS settings by holding down the 'A' or 'east' button.
For more info: https://wiki.batocera.org/systems:gamecube

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
