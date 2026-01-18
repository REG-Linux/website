# Game Boy Advance

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/gba.webp" alt="Game Boy Advance icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/gba.png" alt="Game Boy Advance logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Game Boy Advance (GBA) is Nintendo's 32-bit successor to the Game Boy Color. Launched in March 2001 in Japan and shortly after around the rest of the world, the system combined a 16.78 MHz ARM7TDMI CPU with a secondary Zilog Z80 for backwards compatibility with older Game Boy titles. REG-Linux treats every cartridge or ROM under the `gba` system group so metadata, themes and visual sets remain synchronized with the platform.

## Technical specifications

- Manufacturer: Nintendo
- Release year: 2001
- Hardware type: portable
- CPU: 32-bit ARM7TDMI at 16.78 MHz plus Zilog Z80 at 8 MHz/4 MHz for Game Boy compatibility
- Memory: 32 KB IWRAM, 96 KB VRAM, and 256 KB palette/graphics RAM with optional flash expansion
- Display: 240×160 TFT LCD capable of 32,768 colors and up to 512 sprites with affine transformation
- Sound: Direct Sound stereo with two 16-bit DAC channels and a legacy 6-voice PSG

## Supported ROM extensions

`gba`, `zip`, `7z`

## Quick reference

- **Emulator:** [RetroArch](#retroarch)
- **Cores available:** libretro: mGBA, libretro: VBA-M, libretro: gpsp
- **ROM folder:** `/userdata/roms/gba`
- **Accepted ROM formats:** `.gba`, `.zip`, `.7z`
- **System group:** `gba`

## BIOS

The Game Boy Advance BIOS file is optional, but installing it is the only way to see the original startup animation.

| MD5 checksum                       | Share file path     | Description           |
|------------------------------------|---------------------|-----------------------|
| `a860e8c0b6d573d191e4ec7db1b1e4f6` | `bios/gba_bios.bin` | Game Boy Advance BIOS |

## ROMs

Store all Game Boy Advance images in `/userdata/roms/gba`.

## Emulators

### RetroArch

[RetroArch](https://docs.libretro.com/) is the frontend that runs every libretro core, sharing shaders, overlays, hotkeys, netplay, rewind and other features independent of the platform. REG-Linux exposes many of the same options through EmulationStation.

#### RetroArch configuration

While a core is running, open the **Quick Menu** with `[HOTKEY]` + the south face button (see controller configuration) to change controller mappings, core overrides, shaders and miscellaneous RetroArch settings.

Standardized features available to every Game Boy Advance core include `gba.videomode`, `gba.ratio`, `gba.smooth`, `gba.shaders`, `gba.pixel_perfect`, `gba.decoration` and `gba.game_translation`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS API | `gba.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `gba.audio_latency` | Audio buffer size (256, 192, 128, 64, 32, 16, 8). Increase to reduce crackles, decrease once audio is stable. |
| THREADED VIDEO | `gba.video_threaded` | Offload video processing to a second thread for performance (`true` On, `false` Off). |

### libretro: mGBA

mGBA targets accuracy and speed, and it also simulates Game Boy and Game Boy Color titles. This core is the default for most GBA content because it balances features with performance.

#### libretro: mGBA configuration

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| SHOW BIOS BOOTLOGO | `global.skip_bios_mgba` | Display the BIOS animation if the BIOS file exists. `True` shows it, `False` hides it. |
| SUPER GB BORDERS | `gb.sgb_borders` | Show Super Game Boy borders for compatible games (`False` Off, `True` On). |
| COLOR CORRECTION (GB) | `gb.color_correction` | Simulate LCD color inaccuracies (`False`, `GBA`). |
| SUPER GB BORDERS (GBC) | `gbc.sgb_borders` | Super Game Boy borders for Game Boy Color titles (`False`, `True`). |
| COLOR CORRECTION (GBC) | `gbc.color_correction` | LCD color simulation for Game Boy Color (`False`, `GBC`). |
| SOLAR SENSOR LEVEL | `gba.solar_sensor_level` | Adjust the solar sensor used by Boktai-series carts (`0`-`10`). |
| FRAMESKIP | `gba.frameskip_mgba` | Skip frames to ease performance (`0`-`10`). |

### libretro: VBA-M

VBA-M is a continuation of VisualBoyAdvance with compatibility across GB, GBC and GBA titles along with enhanced debugging and filtering options.

#### libretro: VBA-M configuration

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| COLORIZATION (GB) | `gb.palettes` | Choose Game Boy palettes: `original gameboy`, `black and white`, `gba sp`, `blue sea`, `dark knight`, `green forest`, `hot desert`, `pink dreams`, `weird colors`. |
| COLOR CORRECTION (GB) | `gb.gbcoloroption_gb` | Simulate LCD color imperfections (`disabled`, `enabled`). |
| SUPER GB BORDERS (GB) | `gb.showborders_gb` | Enable Super Game Boy borders (`disabled`, `enabled`). |
| COLOR CORRECTION (GBC) | `gbc.gbcoloroption_gbc` | Simulate LCD imperfections for Game Boy Color (`disabled`, `enabled`). |
| SUPER GB BORDERS (GBC) | `gbc.showborders_gbc` | Enable Super Game Boy borders for GBC (`disabled`, `enabled`). |
| SOLAR SENSOR LEVEL | `gba.solarsensor` | Adjust Boktai-style solar sensor input (`0`-`10`). |
| SENSOR SENSITIVITY (GYRO) | `gba.gyro_sensitivity` | Gyro control sensitivity, akin to `10`-`120`. |
| SENSOR SENSITIVITY (TILT) | `gba.tilt_sensitivity` | Tilt input sensitivity for Gyro-enabled experiences (`10`-`120`). |

### libretro: gpsp

gpsp is another open-source Game Boy Advance core focused on performance. Use RetroArch's Quick Menu to adjust per-game and core options exactly as you would for the other cores above.

## Controls

Here are the default Game Boy Advance controls as mapped to the REG-Linux Retropad:

![gba controller overlay](../images/controller-overlays/gba-1.png)

