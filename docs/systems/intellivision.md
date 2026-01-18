# Mattel Intellivision

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/intellivision.webp" alt="Mattel Intellivision icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/intellivision.png" alt="Mattel Intellivision logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Mattel Intellivision debuted in 1979 as a second-generation console with a distinctive keypad controller and a library that leaned on sports and arcade-style experiences. REG-Linux treats the platform as the `intellivision` system group so metadata scraping, themes and visual sets that match the retro aesthetic can load automatically.

## Technical specifications

- Manufacturer: Mattel
- Release year: 1979
- Hardware type: home console
- CPU: General Instrument CP1610 16-bit processor at 1.789 MHz
- Memory: 1 KB RAM + 2 KB ROM plus up to 16 KB cartridge ROM
- Video: STIC chip driving 160×96 resolution with 16 colors
- Audio: AY-3-8914 PSG offering three square-wave channels and noise

## Supported ROM extensions

`int`, `bin`, `rom`, `zip`, `7z`

## Quick reference

- **Emulator:** RetroArch
- **Core:** libretro: freeintv
- **ROM folder:** `/userdata/roms/intellivision`
- **Accepted ROM formats:** `.int`, `.bin`, `.rom`, `.zip`, `.7z`
- **System group:** `intellivision`

## BIOS

Intellivision emulation requires two BIOS files so `freeintv` can initialize the platform.

| MD5 checksum                       | Share file path | Description |
|------------------------------------|-----------------|-------------|
| `62e761035cb657903761800f4437b8af` | `bios/exec.bin` | Intellivision EXEC ROM |
| `0cd5946c6473e42e8e4c2137785e427f` | `bios/grom.bin` | Intellivision GROM ROM |

Place both files in `/userdata/bios/` without renaming them.

## ROMs

Store Intellivision ROMs in `/userdata/roms/intellivision` using one of the accepted extensions. The collection can stay zipped; the core reads `.zip` and `.7z` archives directly.

## Emulators

### RetroArch (libretro: freeintv)

[RetroArch](https://docs.libretro.com/) runs the `freeintv` core to recreate the Intellivision hardware. Use the Quick Menu (`[HOTKEY]` + the south face button, see controller configuration) to adjust hotkeys, controller mappings and shaders. REG-Linux also surfaces many of the same settings through EmulationStation menus.

Standardized options available to every Intellivision session include `intellivision.videomode`, `intellivision.ratio`, `intellivision.smooth`, `intellivision.shaders`, `intellivision.pixel_perfect`, `intellivision.decoration`, `intellivision.game_translation`, `intellivision.audio_latency` and `intellivision.video_threaded`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS BACKEND | `intellivision.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `intellivision.audio_latency` | Buffer size in milliseconds: 256, 192, 128, 64, 32, 16, 8. Increase if you hear crackles. |
| THREADED VIDEO | `intellivision.video_threaded` | Use an additional thread for rendering (`true` On, `false` Off). |

#### libretro: freeintv configuration

`freeintv` relies on RetroArch’s shared GUI. Adjust per-core overrides and controller mappings through the Quick Menu just like any other libretro core.

## Controls

The Intellivision controller combined side-mounted face buttons with a 12-button numeric keypad. REG-Linux recommends enabling controller tattoos (REG-Linux v39+) and using bezel overlays (e.g., from the [BezelProject](https://github.com/thebezelproject/BezelProject)) so keypad layouts remain visible.

Here are the default Intellivision controls shown on the REG-Linux Retropad:

![intellivision controller overlay](../images/controller-overlays/intellivision-1.png)

## Troubleshooting

- Verify `exec.bin` and `grom.bin` exist in `/userdata/bios/`.
- Try a different ROM archive if one fails; some dumps remain incomplete.
