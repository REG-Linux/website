# GameCube

## Overview

Introduced in 2001 by Nintendo, the GameCube was a console system. Its platform tag is `gc` for proper filtering.

## Technical specifications

- CPU: IBM PowerPC “Gekko” processor at 485 MHz, derived from the Broadway chip with SPE extensions.
- Memory: 24 MB of 1T-SRAM main memory plus 16 MB of embedded 1T-SRAM for texture storage.
- Display: ATI “Flipper” GPU outputting 640×480 (NTSC) / 720×480 (PAL) with hardware transform-and-lighting and 12 texture layers.
- Sound: 16-bit ADPCM DSP with support for Dolby Pro Logic II and multi-channel stereo, fed via 64 MB/s audio bus.

## Supported ROM extensions

gcm, iso, gcz, ciso, wbfs, rvz, elf, dol, m3u, json

## Emulators

- **dolphin** (dolphin)
- **dolphin** (libretro)

## Notes

To initiate the boot animation and access the BIOS settings.
Please ensure that you have the necessary BIOS file (IPL.bin) available in one of the designated locations:

- /userdata/bios/GC/EUR/IPL.bin
- /userdata/bios/GC/USA/IPL.bin
- /userdata/bios/GC/JAP/IPL.bin

You can access the BIOS settings by holding down the 'A' or 'east' button.

---