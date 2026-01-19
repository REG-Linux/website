---
title: Commander X16
description: Commander X16 documentation for REG Linux.
---

# Commander X16

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/commanderx16.webp" alt="Commander X16 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

The Commander X16 is a modern 8‑bit inspired computer designed by The 8‑Bit Guy to recapture the feel of classic home computers while using accessible modern hardware. REG-Linux runs the platform through the `x16emu` emulator, and the system uses the `commanderx16` tag so themes can show the dedicated artwork set.

## Technical specifications

- CPU: WDC 65C816 at 8 MHz with 24-bit addressing
- Memory: 512 KB main RAM plus 512 KB VERA video RAM
- Graphics: VERA co-processor offering 256×240 resolution, hardware sprites and 256 colors per tile
- Sound: VERA DMA-driven stereo wave channels with PSG-style mixing

## Supported ROM extensions

`.bas`, `.img`, `.prg`

## Quick reference

- **Emulator:** x16emu
- **ROM folder:** `/userdata/roms/commanderx16`
- **Accepted formats:** `.bas`, `.img`, `.prg`
- **System group:** `commanderx16`

## ROMs and game setup

Copy Commander X16 files into `/userdata/roms/commanderx16`. Games in `.IMG` or `.PRG` format launch automatically, but titles without recognized extensions can be started via helper files:

1. Create a BASIC loader (e.g., `PLANETX16.BAS`) in the game folder.  
2. Add commands such as `LOAD "PLANETX16"` and `RUN`.  
3. Save and return to EmulationStation to launch the `.BAS` file.  

Disk images sometimes require an `autorun.cmd` (DOS-style commands) containing e.g.:

```
LOAD "WARS.PRG"
...
RUN
```

## Emulators

### x16emu

[x16emu](https://github.com/commanderx16/x16-emulator) emulates the Commander X16 within REG-Linux. It supports keyboard input, joystick/controller bindings and the VERA video/audio pipeline. Use RetroArch-style menus to adjust options or open the emulator’s internal configuration if necessary.

## Controls

The Commander X16 uses keyboard-first input. Map the key layout via the [REG-Linux controller configuration](https://wiki). For games that use joysticks or keypad sequences, configure the input within x16emu’s settings.

## Troubleshooting

- Ensure your files have proper extensions (`.img`, `.prg`, `.bas`) so REG-Linux recognizes them.
- When using a BASIC loader, match the `LOAD`/`RUN` commands to the exact filenames.
