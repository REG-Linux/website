# Adventure Vision

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/advision.webp" alt="Adventure Vision icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/advision.png" alt="Adventure Vision logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Adventure Vision is a compact tabletop console released by Entex Industries in 1982. It combined a mirrored LED display, controls and internals into one stationary unit and was styled to run on batteries, though most owners kept it plugged in due to its power draw. Its vertical column of 40 red LEDs is paired with a spinning mirror that scans the image across your field of view, yielding a persistence-of-vision “pseudo-3D” effect long before similar ideas appeared elsewhere.

REG-Linux exposes the Adventure Vision as the `advision` system group so compatible themes can provide the dedicated artwork set and metadata treatment.

## Technical specifications

- Manufacturer: Entex
- Release year: 1982
- Hardware type: console

## Supported ROM extensions

`bin`, `zip`, `7z`

## Quick reference

- **Emulator:** MAME
- **ROM folder:** `/userdata/roms/advision`
- **Accepted formats:** `.bin`, `.zip`, `.7z`
- **System group:** `advision`
- **Required BIOS:** `advision` (ZIP or 7Z)

## BIOS

MAME needs the `advision` ROM set (e.g., `advision.zip` or `advision.7z`) installed in either the `/userdata/roms/advision` folder or the global BIOS directory so the driver can access the console firmware.

## ROMs

Store Adventure Vision titles in `/userdata/roms/advision`. Each of the official four games can be supplied as a raw `.bin` dump or wrapped inside a `.zip`/`.7z` archive, and MAME automatically extracts archives when launching the appropriate driver.

## Emulators

### MAME

[MAME](https://www.mamedev.org/) maintains an Adventure Vision driver as part of its mission to preserve classic arcade and home systems. ROM metadata dictates which internal driver loads, so keep ROM sets synchronized with the MAME version you run. The arcade guide explains general MAME usage within REG-Linux.

#### MAME configuration

Open the MAME UI menu via `[HOTKEY]` + south button or `[Tab]` on a keyboard while a game is running. From there you can remap buttons, toggle video options and examine any available DIP switches.

Standardized REG-Linux features for Adventure Vision setups are `advision.videomode`, `advision.decoration` and `advision.padtokeyboard`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| Settings that apply to all versions of this emulator |  |
| GRAPHICS BACKEND `advision.video` | Selects the renderer. **BGFX** enables shader-based post-processing; **Accel/OpenGL** expose more direct paths.  => BGFX `bgfx`, Accel `accel`, OpenGL `opengl`. |
| BGFX BACKEND `advision.bgfxbackend` | Used only when VIDEO MODE is BGFX; chooses the graphics API.  => MAME Detect `automatic`, OpenGL `opengl`, OpenGL ES `gles`, Vulkan `vulkan`. |
| BGFX VIDEO FILTER `advision.bgfxshaders` | Applies a shader such as CRT, scaling or scanline styles.  => Off `None`, Bilinear `default`, CRT Geom `crt-geom`, CRT Geom Deluxe `crt-geom-deluxe`, Super Eagle `eagle`, HLSL `hlsl`, HQ2X `hq2x`, HQ3X `hq3x`, HQ4X `hq4x`. |
| CRT SWITCHRES `advision.switchres` | Enables SwitchRes profiles for CRT setups. Leave Off unless you have special hardware.  => Off `0`, On `1`. |
| TATE MODE `advision.rotation` | Rotates the output 90° or 270° for vertical (TATE) displays.  => Off `None`, Rotate 90 `autoror`, Rotate 270 `autorol`. |
| ALT DPAD MODE `advision.altdpad` | Adjust the D-pad orientation for different controller form factors.  => Off (Default) `0`, DS3 Orientation `1`, X360 Orientation `2`. |

## Controls

The Adventure Vision was designed to sit on a table and be gripped from both sides of the controller array. The default layout maps to a REG-Linux Retropad:

![advision controller overlay](../images/controller-overlays/advision-1.png)

Use MAME’s built-in menu if you need to adjust controller mappings beyond what REG-Linux offers per game or per emulator.

## Troubleshooting

- Consult the [MAME troubleshooting notes](mame.md#troubleshooting) for driver-specific issues like black screens or frozen inputs.
- The upstream [MAMEdev documentation and FAQ](https://wiki.mamedev.org/) are invaluable for general configuration problems.
