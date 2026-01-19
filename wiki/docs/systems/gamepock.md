---
title: Game Pocket Computer
description: Game Pocket Computer documentation for REG Linux.
---

# Game Pocket Computer

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/gamepock.webp" alt="Game Pocket Computer icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/gamepock.png" alt="Game Pocket Computer logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Epoch launched the Game Pocket Computer (known as Pokekon in Japan) in 1984. It was the first handheld console to ship with interchangeable cartridges, five titles, and four AA batteries. The tiny grayscale LCD offered adjustable contrast, and the control set consisted of an eight-way d-pad, four buttons, and a sound on/off switch. Despite its innovation, the system was a commercial failure in Japan and never expanded internationally.

REG-Linux assigns the Game Pocket Computer to the `gamepock` system group so metadata scraping and theming stay focused on this unique platform.

## Technical specifications

- Manufacturer: Epoch
- Release year: 1984
- Hardware type: portable

## Supported ROM extensions

bin, zip, 7z

## Quick reference

- **Emulators:** [MAME](#mame), [RetroArch](#retroarch)
- **Core:** libretro: mame
- **ROM folder:** `/userdata/roms/gamepock`
- **Accepted ROM formats:** `.bin`, `.zip`, `.7z`
- **System group:** `gamepock`

## BIOS

No Game Pocket Computer emulator in REG-Linux requires a BIOS file.

## ROMs

Place your Game Pocket Computer ROMs in `/userdata/roms/gamepock`.

## Emulators

### MAME

The standalone MAME builds replicate the original hardware with high accuracy. Use the system's configuration interfaces to tweak video, sound and input options per title.

### RetroArch

[RetroArch](https://docs.libretro.com/) is the frontend that runs the libretro MAME core. It provides shared shaders, overlays, rewinding, netplay and hotkey systems on top of the core's accuracy.

#### RetroArch configuration

While a core is running, press `[HOTKEY]` + the south face button (see controller configuration) to open the Quick Menu. From there you can change inputs, overrides, shaders and the RetroArch advanced settings. REG-Linux also exposes many of those toggles within EmulationStation for convenience.

## Controls

The default Game Pocket Computer mapping follows the REG-Linux Retropad layout. Adjust it using the controller configuration menu.
