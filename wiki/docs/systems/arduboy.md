---
title: Arduboy
description: Arduboy documentation for REG Linux.
---

# Arduboy

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/arduboy.webp" alt="Arduboy icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/arduboy.png" alt="Arduboy logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Arduboy is a credit-card sized open-hardware handheld launched in 2015 by Kevin Bates. It runs tiny homebrew games on Arduino-compatible hardware and has an active community of indie developers.

REG-Linux handles Arduboy titles via the `arduboy` system group so compatible themes can pick the matching artwork set.

## Technical specifications

- Manufacturer: Kevin Bates
- Release year: 2015
- Hardware type: portable
- CPU: Arduino-compatible microcontroller (ATmega32u4)
- Display: Monochrome OLED

## Supported ROM extensions

`hex`, `zip`, `7z`

## Quick reference

- **Emulator/frontend:** RetroArch
- **Core:** libretro: arduous
- **ROM folder:** `/userdata/roms/arduboy`
- **System group:** `arduboy`

## BIOS

No BIOS or firmware files are required for Arduboy emulation.

## ROMs

Place Arduboy games—usually `.hex` files but archives (`.zip`, `.7z`) are permitted—in `/userdata/roms/arduboy`. RetroArch will extract the `.hex` image from archives when launching a core.

## Emulators

### RetroArch

RetroArch loads Arduboy software through the `libretro: arduous` core. For general UI tips, shaders, overlays, hotkeys and netplay options, refer to the RetroArch page.

#### libretro: arduous

`arduous` is the libretro core dedicated to Arduboy content. REG-Linux currently exposes the default configuration, which works for most titles.

## Controls

Here’s the default Arduboy layout mapped onto a REG-Linux Retropad:

![arduboy controller overlay](../images/controller-overlays/arduboy.png)

To change mappings, use RetroArch’s input settings or REG-Linux’s controller configuration menus.

## Troubleshooting

- Verify your ROMs live in `/userdata/roms/arduboy` and use `.hex`, `.zip` or `.7z` extensions.
- If games do not appear, refresh the game list so REG-Linux rescans the folder.
