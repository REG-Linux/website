# Atari 7800

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/atari7800.webp" alt="Atari 7800 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/atari7800.png" alt="Atari 7800 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Atari 7800 ProSystem, released in 1986, was designed as a high-end follow-up to the Atari 2600 with improved graphics, sound and backwards compatibility with most 2600 cartridges. It introduced a digital signature scheme to curb low-quality unlicensed releases in the wake of the 1983 crash while supporting more ambitious home arcade conversions.

REG-Linux treats the system as `atari7800` so compatible themes can surface the dedicated artwork set and metadata.

## Technical specifications

- Manufacturer: Atari
- Release year: 1986
- Hardware type: console
- CPU: Ricoh 65c02 at 1.79 MHz
- Graphics: MARIA video processor (160×240, 256 colours, hardware sprites/objects)
- Sound: TIA-compatible audio with stereo outputs plus PWM control

## Supported ROM extensions

`a78`, `bin`, `zip`, `7z`

## Quick reference

- **Emulator/frontend:** RetroArch
- **Core:** libretro: ProSystem
- **ROM folder:** `/userdata/roms/atari7800`
- **System group:** `atari7800`

## BIOS

The system can run without explicit BIOS files. The optional Atari 7800 BIOS (`bios/7800 BIOS (U).rom`) can be placed in your BIOS folder if you prefer to match retail behaviour, but it is not mandatory.

## ROMs

Place Atari 7800 dumps in `/userdata/roms/atari7800`. RetroArch handles raw `.a78`/`.bin` files and archives such as `.zip` or `.7z` that contain one or more games.

## Emulators

### RetroArch

RetroArch hosts `libretro: ProSystem`, offering unified hotkeys, shaders, overlays and input mappings across cores. Open the Quick Menu with `[HOTKEY]` + south button to tweak settings or per-game controls, or use EmulationStation menus for the most common options.

#### RetroArch configuration

Standardized features available to all libretro cores in this system include `atari7800.videomode`, `atari7800.ratio`, `atari7800.smooth`, `atari7800.shaders`, `atari7800.pixel_perfect`, `atari7800.decoration` and `atari7800.game_translation`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| GRAPHICS API `atari7800.gfxbackend` | Choose the renderer. OpenGL is safest; Vulkan can offer better performance on some GPUs. => OpenGL `opengl`, Vulkan `vulkan`. |
| AUDIO LATENCY `atari7800.audio_latency` | Audio buffer length in ms. Raise if you hear crackles or dropouts; lower once audio is stable. => 256 `256`, 192 `192`, 128 `128`, 64 `64`, 32 `32`, 16 `16`, 8 `8`. |
| THREADED VIDEO `atari7800.video_threaded` | Offload video work to another thread for better speed on weak CPUs at the expense of latency. => On `true`, Off `false`. |

#### libretro: ProSystem

The `ProSystem` core is a libretro port of the [standalone ProSystem emulator](https://gstanton.github.io/ProSystem1_3/). REG-Linux updates it alongside other libretro cores so you can benefit from new fixes and performance tweaks.

## Controls

Here is the default Atari 7800 layout mapped to a [REG-Linux Retropad](/configure_a_controller):

![atari7800](../images/controller-overlays/atari7800.png)

Use RetroArch’s Quick Menu or the ProSystem in-game options if you need alternative mappings.

## Troubleshooting

- Ensure ROMs live in `/userdata/roms/atari7800` and use one of the supported extensions. Archives should contain valid `.a78` or `.bin` files.
- If a title refuses to load or crashes, try another ROM dump or core version—some builds behave differently depending on the specific release.
