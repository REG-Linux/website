# Astrocade

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/astrocde.webp" alt="Astrocade icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/astrocde.png" alt="Astrocade logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Bally Astrocade (also sold as the Bally Home Library Computer or Bally ABA-1000) was launched in April 1978 via mail order. Designed by Bally and later sold by Astrovision, it offered surprisingly advanced graphics for the era but remained short-lived due to programming complexity and limited software. REG-Linux groups the platform under `astrocde` so compatible themes can show the dedicated artwork set when available.

## Technical specifications

- Manufacturer: Bally (Astrovision)
- Release year: 1978
- Hardware type: console
- CPU: Signetics 2650 at 1.2 MHz
- Video: Signetics 2637 UVI (3.58 MHz NTSC / 3.55 MHz PAL)
- Sound: Simple analog beeper

## Supported ROM extensions

`bin`, `zip`, `7z`

## Quick reference

- **Emulator:** MAME
- **ROM folder:** `/userdata/roms/astrocde`
- **Accepted formats:** `.bin`, `.zip`, `.7z`
- **System group:** `astrocde`

## BIOS

MAME expects the Astrocade system definition archive to boot:

- `astrocde.zip` (or `astrocde.7z`)

Place this file either in `/userdata/roms/astrocde/` or in your global BIOS directory. Without it the Astrocade driver may refuse to start.

## ROMs

Store your Astrocade dumps in `/userdata/roms/astrocde`. MAME can launch raw `.bin` files or archives containing one or more games.

## Emulators

### MAME

[MAME](https://www.mamedev.org/) (formerly MESS) handles the Astrocade driver. ROMs must match the specific MAME version you run, so keep your sets in sync with the emulator build.

#### MAME configuration

Open the in-game [MAME menu](https://docs.mamedev.org/usingmame/ui.html) with `[HOTKEY]` + south button or `[Tab]` on a keyboard to remap inputs, adjust video options, switch DIP settings and more. Standardized REG-Linux features for this system include `astrocde.videomode`, `astrocde.decoration` and `astrocde.padtokeyboard`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| Settings that apply to all versions of this emulator |  |
| GRAPHICS BACKEND `astrocde.video` | Choose BGFX shaders or Accel/OpenGL rendering.  => BGFX `bgfx`, Accel `accel`, OpenGL `opengl`. |
| BGFX BACKEND `astrocde.bgfxbackend` | Select the BGFX API when using BGFX.  => MAME Detect `automatic`, OpenGL `opengl`, OpenGL ES `gles`, Vulkan `vulkan`. |
| BGFX VIDEO FILTER `astrocde.bgfxshaders` | Apply CRT/super-sampling filters.  => Off `None`, Bilinear `default`, CRT Geom `crt-geom`, CRT Geom Deluxe `crt-geom-deluxe`, Super Eagle `eagle`, HLSL `hlsl`, HQ2X `hq2x`, HQ3X `hq3x`, HQ4X `hq4x`. |
| CRT SWITCHRES `astrocde.switchres` | Enable SwitchRes for CRTs.  => Off `0`, On `1`. |
| TATE MODE `astrocde.rotation` | Rotate output for vertical displays.  => Off `None`, Rotate 90 `autoror`, Rotate 270 `autorol`. |
| ALT DPAD MODE `astrocde.altdpad` | Adjust D-pad orientation when controllers behave oddly.  => Off (Default) `0`, DS3 Orientation `1`, X360 Orientation `2`. |
| Settings specific to Astrocade |  |
| CUSTOM CONFIG `astrocde.pergamecfg` | Allow per-game custom configuration via MAME’s UI.  => On `1`, Off `0`. |

## Controls

Here are the default Bally Astrocade controls mapped to a REG-Linux Retropad:

![astrocde-1](../images/controller-overlays/astrocde-1.png)

Use MAME’s menu if you need alternate controller layouts.

## Troubleshooting

- Confirm `astrocde.zip` matches the expected MD5 and is located in a ROM or BIOS folder.
- Check that your files reside in `/userdata/roms/astrocde` and use supported extensions.
- Consult the [MAME troubleshooting section](mame.md#troubleshooting) for system-specific issues
