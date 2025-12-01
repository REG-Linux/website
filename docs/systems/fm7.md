# FM-7

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/fm7.webp" alt="FM-7 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/fm7.png" alt="FM-7 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Fujitsu FM-7 is an 8-bit home computer introduced in 1982 as a cost-reduced spin on the FM-8. It pairs dual Motorola 6809 CPUs, extensive video RAM, and the distinctive MESS/MAME driver used by REG-Linux. The FM-7 (and the FM-77 series) remains popular for Japanese vintage software.

## Technical specifications

- CPU: Dual Motorola 68xx (6809E/68B09) at 1–2 MHz
- Memory: 64 KB main RAM (expandable), 48 KB video RAM, ROM for BASIC/OS
- Graphics: Dual MC6847 chips delivering 320×200 8-color or 640×200 monochrome modes
- Sound: AY-3-8910 PSG providing three channels plus noise

## Supported ROM extensions

`wav`, `t77`, `mfi`, `dfi`, `hfe`, `mfm`, `td0`, `imd`, `d77`, `d88`, `1dd`, `cqm`, `cqi`, `dsk`, `zip`, `7z`

## Quick reference

- **Emulator:** MAME (MESS core)
- **ROM folder:** `/userdata/roms/fm7`
- **Accepted formats:** `.wav`, `.t77`, `.mfi`, `.dfi`, `.hfe`, `.mfm`, `.td0`, `.imd`, `.d77`, `.d88`, `.1dd`, `.cqm`, `.cqi`, `.dsk`, `.zip`, `.7z`

## BIOS

Place the following BIOS archives into `bios/` or `roms/fm7`:

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `4688a93aa298b9431c1788c9b90378c8` | `bios/electron.zip` | Primary FM-7 ROM set |
| `2cc67be4624df4dc66617742571a8e3d` | `bios/electron64.zip` | Alternative ROM (FM-7 with 64 KB Master RAM) |
| `df01cfe5894276de96bbd1c45b7e834c` | `bios/electron64.zip` | Additional FM-7 variation ROM |
| `f3a39227b401a2ce8cdc7e4b7a860aaf` | `bios/electron_plus1.zip` | Plus/4-like expansion ROM |
| `9aa334b4e8f6d7565e6323e0f77110de` | `bios/electron_plus3.zip` | Super ROM set used by later FM-7 machines |
| Additional `electron_plus3.zip` files | See README | Additional  issues for FM-77/AV models |

For FM-77AV support, add `bios/fm77av.zip` (optional).

## ROMs

Store FM-7/Fujitsu titles in `/userdata/roms/fm7`. Use disk images, tape dumps or zipped archives; the driver auto-detects the format and uses the appropriate loader. Multi-media titles may include `.t77` or `.wav` for tape data.

## Emulators

### MAME (MESS core)

MAME’s FM-7/MESS driver handles all FM/Electron machines. Access the MAME menu (`[HOTKEY]` + south button or `Tab`) to configure machine type, ROM sets, drives and input devices.

Standardized REG-Linux flags: `fm7.videomode`, `fm7.decoration`, `fm7.padtokeyboard`.

| ES setting name | Description => ES option key_value |
| --- | --- |
| VIDEO MODE `fm7.video` | Enable BGFX shaders or Accel/OpenGL rendering. |
| BGFX API `fm7.bgfxbackend` | Select BGFX backend (OpenGL, GLES, Vulkan). |
| BGFX FILTER `fm7.bgfxshaders` | Apply CRT/switchres shaders. |
| CRT SWITCHRES `fm7.switchres` | Enable SwitchRes profiles. |
| VERTICAL ROTATION `fm7.rotation` | Rotate to vertical orientation. |
| ALT DPAD `fm7.altdpad` | Adjust D-pad orientation when controllers misalign. |
| MODEL `fm7.altmodel` | Force FM-7 or FM-77AV machine type. |
| MEDIA TYPE `fm7.altromtype` | Indicate cassette vs disk media. |
| UI KEYS `fm7.enableui` | Start with UI keys enabled. |

## Controls

Here is the default FM-7 mapping on a [REG-Linux Retropad](/configure_a_controller). Use the MAME input menu to map keyboard keys or specialized controllers when necessary.

![FM-7 controller overlay](../images/controller-overlays/fm7.png)

## Troubleshooting

- If a game refuses to load, swap the machine type between FM-7 and FM-77AV via `fm7.altmodel` and ensure the correct BIOS is active.
- For tape games, verify `.wav`, `.t77` or `.mfi` images are intact and zipped versions remain compressed.
- Use the integer scaler/zoom options in the MAME menu if border graphics are clipped.
