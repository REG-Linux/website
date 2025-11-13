# Commander X16

## Overview

Introduced in 2019 by The 8-Bit Guy, the Commander X16 was a computer system. Its platform tag is `commanderx16` for proper filtering.

## Technical specifications

- CPU: WDC 65C816 running at 8 MHz with a 24-bit address bus and compatibility with 6502 assembly.
- Memory: 512 KB of main RAM plus a dedicated 512 KB of VERA video RAM, expandable via cartridge headers.
- Display: VERA graphics co-processor supporting 256×240 resolution (text/sprite layers) with 256 colors per tile and hardware sprite blending.
- Sound: VERA includes four stereo wave channels with DMA-driven sample playback and software mixing for PSG-style effects.

## Supported ROM extensions

bas, img, prg

## Emulators

- **x16emu** (x16emu) – Requires BR2_PACKAGE_X16EMU

## Notes

Extract your Commander X16 games here in their own directory.
The games with .IMG .PRG extensions will show in EmulationStation to run accordingly.

If you have a game without an appropriate extension you can create a .BAS file with DOS commands.
i.e. in the game folder create a PLANETX16.BAS file.
Then add into the file the DOS commands to load the game, like so...

LOAD "PLANETX16"
RUN

If you have an .IMG file which doesn't load then create an autorun.cmd file with the DOS commands also.
i.e. X16 Wars would contain the following...

LOAD "WARS.PRG"
...
RUN


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
