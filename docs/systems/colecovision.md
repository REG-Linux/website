# ColecoVision

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/colecovision.webp" alt="ColecoVision icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/colecovision.png" alt="ColecoVision logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The ColecoVision, released in 1982, offered arcade-quality ports by pairing a Zilog Z80 CPU with the Texas Instruments TMS9918A VDP and AY-3-8910 PSG. Modular expansions (Atari 2600 compatibility, Adam computer) made it a flexible platform that inspired later console designs.

REG-Linux treats ColecoVision titles via the `colecovision` group so compatible themes can display the appropriate artwork.

## Technical specifications

- CPU: Zilog Z80A at 3.58 MHz
- Memory: 8 KB RAM, 16 KB video RAM
- Graphics: TMS9918A chip with 256×192 resolution, 16 colors and sprites
- Sound: AY-3-8910 programmable sound generator

## Supported ROM extensions

`bin`, `col`, `rom`, `zip`, `7z`

## Quick reference

- **Emulators:** libretro: Bluemsx, CLK (REG-Linux 42+)
- **ROM folder:** `/userdata/roms/colecovision`
- **Accepted formats:** `.bin`, `.col`, `.rom`, `.zip`, `.7z`

## BIOS

RetroArch’s Bluemsx core works without additional BIOS files. CLK, however, requires the ColecoVision BIOS (`coleco.rom`). Place it in `bios/ColecoVision/coleco.rom` so x86-era BIOS detection can succeed.

- MD5 (coleco.rom): `2c66f5911e5b42b8ebe113403548eee7`

## ROMs

Store ROM images under `/userdata/roms/colecovision`. Both raw files and zipped collections are supported. Multi-area ROMs load automatically when placed in a `.zip`/`.7z` archive.

## Emulators

### RetroArch (libretro: Bluemsx)

Bluemsx is the libretro core for ColecoVision within RetroArch. It provides unified hotkeys, stackable shaders and netplay. Use the Quick Menu (`[HOTKEY] + south button`) to access advanced options or controller remapping. REG-Linux exposes system options such as `colecovision.videomode`, `colecovision.ratio`, `colecovision.shaders`, `colecovision.pixel_perfect`, `colecovision.decoration`, and `colecovision.game_translation`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| GRAPHICS BACKEND `colecovision.gfxbackend` | Choose OpenGL for compatibility or Vulkan for performance. => OpenGL `opengl`, Vulkan `vulkan`. |
| AUDIO LATENCY `colecovision.audio_latency` | Adjust buffer in milliseconds to prevent crackling. => 256 `256`, 192 `192`, 128 `128`, 64 `64`, 32 `32`, 16 `16`, 8 `8`. |
| REDUCE SPRITE FLICKERING `colecovision.bluemsx_nospritelimits` | Remove the sprite per line limit to reduce flicker. => Off `False`, On `True`. |

### CLK

[CLK (Clock Signal)](https://github.com/TomHarte/CLK) offers low-latency ColecoVision emulation starting in REG-Linux 42. It requires the BIOS listed above and is recommended for users who want alternate low-level accuracy compared to Bluemsx.

## Controls

The ColecoVision controller had a numeric keypad plus joystick and action buttons; the default mapping is shown on a REG-Linux Retropad:

![ColecoVision controller overlay](../images/controller-overlays/colecovision-1.png)

Remap inputs per game via RetroArch’s Quick Menu if your title needs keypad entry or overlays.

## Troubleshooting

- Ensure ROMs live in `/userdata/roms/colecovision` with accepted extensions.
- If using CLK, double-check the BIOS file exists at `bios/ColecoVision/coleco.rom` with the expected checksum.
- Use RetroArch’s Quick Menu to assign the keypad keys or adjust the `REDUCE SPRITE FLICKERING` toggle if graphics look wrong.
