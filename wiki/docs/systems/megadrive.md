---
title: Mega Drive
description: Mega Drive documentation for REG Linux.
---

# Mega Drive

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/megadrive.webp" alt="Mega Drive icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/megadrive.png" alt="Mega Drive logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sega Mega Drive (Genesis in North America) is a 16-bit console that debuted in Japan on October 29, 1988, then in the US and worldwide shortly after. Built on a Motorola 68000 main CPU with a Zilog Z80 co-processor, it delivered arcade-like performance and remains a beloved part of the `genesis`/`megadrive` system groups in REG-Linux.

## Technical specifications

- CPU: Motorola 68000 at 7.67 MHz with a Zilog Z80 at 3.58 MHz for sound and backwards compatibility
- Memory: 64 KB main RAM, 64 KB video RAM, 8 KB audio RAM for the YM2612
- Display: 320×224 resolution with up to 61 colors on-screen (out of 512)
- Sound: Yamaha YM2612 FM synthesizer plus Texas Instruments SN76489 PSG

## Quick reference

- **ROM folder:** `/userdata/roms/megadrive`
- **Accepted ROM formats:** `.bin`, `.gen`, `.md`, `.sg`, `.smd`, `.zip`, `.7z`
- **Emulators:** RetroArch (`libretro: GenesisPlusGX`, `libretro: GenesisPlusGX-wide`, `libretro: Picodrive`, `libretro: blastem`), MAME (for specialized ports), CLK (Clock Signal)
- **System group:** `genesis`, `megadrive`

## BIOS

Most Mega Drive/Genesis emulators do not require BIOS files. The only exceptions are Master System/Game Gear compatibility layers (handled under those systems).

## ROMs

Keep cartridge images such as `.bin`, `.gen`, `.md`, `.sg`, `.smd` plus zipped collections inside `/userdata/roms/megadrive`. Some cores also accept `.gg`/`.sms` for Game Gear/Master System when appropriate. Disc-based formats (`.iso`, `.cue` + `.bin`, `.chd`) belong to the [Sega CD](segacd.md) documentation instead.

## Region

Mega Drive systems use region-specific PAL/NTSC timing. PAL titles run at 50 Hz and can appear slow on modern displays; some games offer a built-in region mode. To play PAL titles at the correct speed:

1. Set your display’s refresh rate to 50 Hz in the advanced options for the game or through the display configuration helper.
2. Use RetroArch’s Quick Menu (`[HOTKEY]` + south face button) to change `Region` to `pal`.
3. Save the override so the setting persists.

Some displays require `xrandr` or custom monitor profiles to expose 50 Hz modes; see `/display_issues#display_issues_when_xrandr_is_your_friend` for troubleshooting.

## Emulators

### RetroArch

RetroArch hosts the Mega Drive cores. The Quick Menu adjusts shaders, hotkeys, controller mappings and per-game overrides. REG-Linux surfaces many of these options through EmulationStation menus as well.

Standard retro settings: `megadrive.videomode`, `megadrive.ratio`, `megadrive.smooth`, `megadrive.shaders`, `megadrive.pixel_perfect`, `megadrive.decoration`, `megadrive.game_translation`, `megadrive.audio_latency`, `megadrive.video_threaded`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS BACKEND | `megadrive.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `megadrive.audio_latency` | Buffer size in milliseconds: 256, 192, 128, 64, 32, 16, 8. Increase if you hear crackles. |
| THREADED VIDEO | `megadrive.video_threaded` | Use a second thread for rendering (`true` On, `false` Off). |

#### libretro: GenesisPlusGX

GenesisPlusGX is the high-accuracy workhorse that covers Mega Drive/Genesis, Master System, and Game Gear. It supports NTSC filters, FM chip toggles, controller types per port, Game Gear LCD ghosting and more. See `megadrive_controller_mapping_3b.png` / `megadrive_controller_mapping_6ba.png` etc. for reference overlays.

#### libretro: GenesisPlusGX-wide

Widescreen-patched version of GenesisPlusGX; draws extra columns to create a 16:9 picture at the cost of compatibility. Use with caution on titles that support widescreen patches.

#### libretro: Picodrive

Lightweight Sega 8-bit core that also targets Pico/32X hardware; ideal for SBCs.

#### libretro: blastem

Cycle-accurate Genesis core with few extra configuration options. It is recommended when accuracy matters and your hardware can keep up.

### CLK

[CLK (Clock Signal)](https://github.com/TomHarte/CLK) is a low-latency multi-system emulator included since REG-Linux 42. It provides an alternative path for playing Mega Drive, Master System and other 8/16-bit systems.

## Controls

Here are the default Mega Drive/Genesis controls shown on a REG-Linux Retropad:

![megadrive controller overlay](../images/controller-overlays/megadrive-1.png)

Additional mapping references for 3-button/6-button pads and Master System controllers remain available in the repository (see `mastersystem_controller_mapping.png`, etc.).

## Troubleshooting

For more help, consult the generic support pages. If a ROM refuses to start, double-check that you matched the correct ROMset/version to the core you are launching (e.g., 0.78+ for GenesisPlusGX, latest for libretro: mame).
