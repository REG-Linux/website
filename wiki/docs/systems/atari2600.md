# Atari 2600

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/atari2600.webp" alt="Atari 2600 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/atari2600.png" alt="Atari 2600 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Atari 2600 (originally the Atari VCS) debuted in September 1977 and helped define the cartridge-based home console era. Its MOS Technology 6507 CPU, TIA video/audio chip and simple yet flexible controllers made it easy to bring arcade-style games into the living room, even if ports often compromised visuals and sound. Despite the console crash of 1983, the 2600 ecosystem spurred third-party development and remains a milestone in video game history.

REG-Linux treats the system as the `atari2600` group so compatible themes can show dedicated artwork.

## Technical specifications

- CPU: MOS Technology 6507 at 1.19 MHz (cost-reduced 6502 variant)
- Memory: 128 bytes of RAM; cartridges could provide banked ROM/extra RAM
- Video: TIA chip with 160×192 resolution and artifacting-based color palette
- Sound: TIA audio with two pulse/noise channels synchronized to video timing

## Supported ROM extensions

`a26`, `bin`, `zip`, `7z`

## Quick reference

- **Emulator/frontend:** RetroArch
- **Cores:** libretro: Stella, libretro: Stella2014
- **ROM folder:** `/userdata/roms/atari2600`
- **System group:** `atari2600`

## BIOS

No BIOS files are required for Atari 2600 emulation in REG-Linux.

## ROMs

Place every Atari 2600 ROM (or archive containing `.a26`/`.bin`) into `/userdata/roms/atari2600`. RetroArch will scan the folder and present titles from either raw dumps or `.zip`/`.7z` archives.

## Emulators

### RetroArch

RetroArch hosts the Stella cores for Atari 2600 emulation, providing consistent hotkeys, shaders, overlays and netplay options. Access the Quick Menu with `[HOTKEY]` + the south button to open advanced options and input mapping. Many of the popular settings are also surfaced via EmulationStation menus.

#### RetroArch configuration

Standardized features for the system include `atari2600.videomode`, `atari2600.ratio`, `atari2600.smooth`, `atari2600.shaders`, `atari2600.pixel_perfect`, `atari2600.decoration` and `atari2600.game_translation`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| Settings that apply to all cores of this emulator |  |
| GRAPHICS BACKEND `atari2600.gfxbackend` | Choose the rendering backend (OpenGL or Vulkan).  => OpenGL `opengl`, Vulkan `vulkan`. |
| AUDIO LATENCY `atari2600.audio_latency` | Lower values reduce input lag but may cause crackling; raise if audio glitches occur.  => 256 `256`, 192 `192`, 128 `128`, 64 `64`, 32 `32`, 16 `16`, 8 `8`. |
| THREADED VIDEO `atari2600.video_threaded` | Offload video rendering to another thread; useful if you struggle to hit full speed.  => On `true`, Off `false`. |

#### libretro: Stella

[Stella](https://stella-emu.github.io/) is the official open-source Atari 2600 emulator. REG-Linux keeps the libretro port (`libretro: Stella`) up to date for this system.

#### libretro: Stella2014

Stella2014 is an older libretro core that prioritizes performance over accuracy. Use this core on weaker single-board computers if the main Stella core runs too slowly.

## Controls

The default Atari 2600 layout appears on a REG-Linux Retropad:

![atari2600-1](../images/controller-overlays/atari2600-1.png)

Left and right difficulty switches map to `A` (Advanced) and `B` (Beginner). For example, use `A` to get a larger player ship in *Space Invaders* (and less forgiving collision). RetroArch’s controller settings can fine-tune the mapping if needed.

## Troubleshooting

### I have X problem with Y game

Many quirks are part of the original game’s design; some frames/time-critical tricks rely on the console’s unsynchronized timing. If you suspect an emulator bug or incorrect ROM behaviour, consult the [libretro Stella documentation](https://docs.libretro.com/library/stella/) or Stella’s [FAQ](https://stella-emu.github.io/faq.html).

### I don't remember my games being this choppy!

Modern LCDs often expose the Atari 2600’s variable frame timing. Using a display with variable refresh rate or enabling frame limiting may reduce judder. Running on a CRT remains the most authentic experience.

