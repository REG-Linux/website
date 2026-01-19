---
title: Atari Lynx
description: Atari Lynx documentation for REG Linux.
---

# Atari Lynx

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/lynx.webp" alt="Atari Lynx icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/lynx.png" alt="Atari Lynx logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Atari Lynx launched in 1989 at $179.99 USD and was the first handheld with a color LCD. Its WDC 65SC02 CPU and custom hardware allowed both landscape and portrait gameplay, and Atari eventually adopted the project after Epyx encountered financial trouble. REG-Linux treats the platform as the `atarilynx` system group so metadata scraping and themes stay aligned with the console’s legacy.

## Technical specifications

- Manufacturer: Atari
- Release year: 1989
- Hardware type: portable
- CPU: WDC 65SC02-based custom chip at 16 MHz
- Memory: 64 KB RAM, 64 KB cartridge ROM (banked)
- Display: 160×102 color LCD with 4,096 colors plus hardware scaling/rotation
- Sound: 4-channel DAC with stereo sample playback

## Supported ROM extensions

`.bll`, `.lnx`, `.lyx`, `.o`, `.zip`, `.7z`

## Quick reference

- **Emulator:** [RetroArch](#retroarch)
- **Cores:** libretro: Mednafen_Lynx, libretro: handy
- **ROM folder:** `/userdata/roms/lynx`
- **Accepted ROM formats:** `.bll`, `.lnx`, `.lyx`, `.o`, `.zip`, `.7z`
- **System group:** `atarilynx`

## BIOS

If you want the original Lynx boot animation, place `bios/lynxboot.img` in `/userdata/bios/` without renaming it.

| MD5 checksum                       | Share file path     | Description     |
|------------------------------------|---------------------|-----------------|
| `fcd403db69f54290b51035d82f835e7b` | `bios/lynxboot.img` | Lynx Boot Image |

## ROMs

Store your Atari Lynx ROMs inside `/userdata/roms/lynx` using any of the accepted extensions. Compressed `.zip` / `.7z` archives and `.bll` dumps are all supported.

## Emulators

### RetroArch

[RetroArch](https://docs.libretro.com/) runs Lynx games via the Mednafen_Lynx and Handy cores, letting you share shaders, overlays, hotkeys, rewind and latency options.

#### RetroArch configuration

Open the **Quick Menu** with `[HOTKEY]` + the south face button (see controller configuration) to adjust core-specific values and mappings. REG-Linux also exposes many of those settings directly in EmulationStation.

Standardized options available to every Lynx session include `lynx.videomode`, `lynx.ratio`, `lynx.smooth`, `lynx.shaders`, `lynx.pixel_perfect`, `lynx.decoration`, `lynx.game_translation`, `lynx.audio_latency`, `lynx.video_threaded`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS BACKEND | `lynx.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `lynx.audio_latency` | Buffer size in milliseconds: 256, 192, 128, 64, 32, 16, 8. Raise if you hear crackles. |
| THREADED VIDEO | `lynx.video_threaded` | Use a second thread for rendering (`true` On, `false` Off). |

### libretro: Mednafen_Lynx

Beetle Lynx (Mednafen_Lynx) is the Mednafen-based port of Handy and offers a polished, accurate Lynx experience.

### libretro: handy

Handy is the original open-source Lynx emulator. Its libretro version shares the RetroArch interface so you can operate both cores identically.

## Controls

Here’s the default Atari Lynx controller mapped to the REG-Linux Retropad:

![Lynx controller overlay](../images/controller-overlays/lynx.png)

Portrait titles can be played by rotating the overlay or remapping inputs through the Quick Menu as needed.
