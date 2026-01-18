# Master System

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/mastersystem.webp" alt="Master System icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/mastersystem.png" alt="Master System logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sega Master System launched in 1985/1986 as an 8-bit challenger to the NES. Built around a 4 MHz Zilog Z80A CPU with 8 KB of RAM and 16 KB of video RAM, it found its strongest markets in Europe, Brazil, South Korea and Australia. REG-Linux treats the platform as the `mastersystem` system group so metadata scraping, themes and visual sets stay in sync with its Sega siblings.

## Technical specifications

- CPU: Zilog Z80A at 4 MHz (compatible with Game Gear/ZX Spectrum hardware)
- Memory: 8 KB RAM + 16 KB VRAM (TMS9918A-derived tile engine)
- Display: 256×192 resolution, 32 colors per tile, 64 sprites and hardware scrolling
- Sound: Texas Instruments SN76489 PSG (three tone channels plus noise)

## Supported ROM extensions

`bin`, `sms`, `zip`, `7z`

## Quick reference

- **ROM folder:** `/userdata/roms/mastersystem`
- **Accepted ROM formats:** `.bin`, `.sms`, `.zip`, `.7z`
- **Emulators:** RetroArch (`libretro: GenesisPlusGX`, `libretro: Picodrive`), CLK
- **System group:** `mastersystem`

## BIOS

No BIOS archive is required for Master System emulation.

## ROMs

Place every Master System ROM in `/userdata/roms/mastersystem`. The same cores also run Game Gear and Mega Drive/Genesis titles, so you can keep the Sega hierarchy tidy inside the `roms/` tree if you prefer.

## Emulators

### RetroArch

[RetroArch](https://docs.libretro.com/) serves the Sega 8-bit cores. Open the Quick Menu with `[HOTKEY]` + the south face button (see controller configuration) to adjust shaders, controllers and overrides.

Standardized options: `mastersystem.videomode`, `mastersystem.ratio`, `mastersystem.smooth`, `mastersystem.shaders`, `mastersystem.pixel_perfect`, `mastersystem.decoration`, `mastersystem.game_translation`, `mastersystem.audio_latency`, `mastersystem.video_threaded`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS BACKEND | `mastersystem.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `mastersystem.audio_latency` | Buffer size in milliseconds: 256, 192, 128, 64, 32, 16, 8. Increase if you hear pops. |
| THREADED VIDEO | `mastersystem.video_threaded` | Offload video rendering to another thread (`true` On, `false` Off). |

#### libretro: GenesisPlusGX

GenesisPlusGX covers Master System, Game Gear, SG-1000 and more. Additional Master System–specific controls include `mastersystem.gpgx_blargg_filter_ms`, `mastersystem.ym2413`, `mastersystem.gun_cursor_ms`, `mastersystem.controller1_ms` and `mastersystem.controller2_ms`.

#### libretro: Picodrive

Picodrive is a lightweight alternative with similar Sega 8-bit settings referenced in `megadrive.md`.

### CLK (Clock Signal)

[CLK](https://github.com/TomHarte/CLK) arrived in REG-Linux v42+. It offers a low-latency, accurate Banana-style emulation path for the Master System alongside other retro platforms.

## Controls

Master System controllers included the two-button gamepad, Light Phaser, paddle and sports pad. The REG-Linux Retropad overlay matches the standard pad layout; use RetroArch's Input menu or the controller configuration tool for special peripherals.

![mastersystem controller overlay](../images/controller-overlays/mastersystem-1.png)

## Troubleshooting

When a title misbehaves, consult the generic support pages and consider switching between GenesisPlusGX and Picodrive to see which core handles the ROM best.
