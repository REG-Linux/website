---
title: Channel F
description: Channel F documentation for REG Linux.
---

# Channel F

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/channelf.webp" alt="Channel-F icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/channelf.png" alt="Channel-F logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Fairchild Channel F (also sold as the Video Entertainment System) is a first-generation console introduced in 1976. It was the first cartridge-based home video game console powered by a microprocessor, and the removable control panels let arcades or living rooms swap stick layouts, light guns or steering wheels.

REG-Linux uses the `channelf` system group so compatible themes can surface the dedicated visual set for the platform.

## Technical specifications

- Manufacturer: Fairchild
- Release year: 1976
- Hardware type: console
- CPU: Fairchild F8 at 1.79 MHz
- Memory: 2 KB cartridge ROM plus 64 bytes scratchpad RAM
- Display: 192×144 resolution with 64 colors and eight programmable sprites
- Sound: Two-position tone generator integrated in the video chip

## Supported ROM extensions

`zip`, `rom`, `bin`, `chf`

## Quick reference

- **Emulator/frontend:** RetroArch
- **Core:** libretro: FreeChaF
- **ROM folder:** `/userdata/roms/channelf`
- **Accepted formats:** `.zip`, `.rom`, `.bin`, `.chf`

## BIOS

Place the following BIOS ROMs in the `bios` directory (do not rename them). For the original Channel F use `sl31253.bin` and `sl31254.bin`; the Channel F II BIOS (sl90025) is optional and takes precedence when present.

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `ac9804d4c0e9d07e33472e3726ed15c3` | `bios/sl31253.bin` | Channel F BIOS (PSU 1) |
| `da98f4bb3242ab80d76629021bb27585` | `bios/sl31254.bin` | Channel F BIOS (PSU 2) |
| `95d339631d867c8f1d15a5f2ec26069d` | `bios/sl90025.bin` | Channel F II BIOS (optional) |

## ROMs

Store Channel F cartridge images in `/userdata/roms/channelf`. RetroArch will accept individual `.rom`/`.bin` files or zipped collections. Attach them through the FreeChaF core to mimic swapping physical cartridges.

## Emulators

### RetroArch / libretro: FreeChaF

`libretro: FreeChaF` is the FreeChaF core used within RetroArch. REG-Linux exposes system-wide features such as `channelf.videomode`, `channelf.ratio`, `channelf.smooth`, `channelf.shaders`, `channelf.pixel_perfect`, `channelf.decoration`, and `channelf.game_translation`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| GRAPHICS BACKEND `channelf.gfxbackend` | Choose OpenGL (safe) or Vulkan (fast when supported). => OpenGL `opengl`, Vulkan `vulkan`. |
| AUDIO LATENCY `channelf.audio_latency` | Adjust buffer in milliseconds to eliminate crackling. => 256 `256`, 192 `192`, 128 `128`, 64 `64`, 32 `32`, 16 `16`, 8 `8`. |
| THREADED VIDEO `channelf.video_threaded` | Offload rendering to another thread for weaker CPUs. => On `true`, Off `false`. |

Use the Quick Menu (`[HOTKEY]` + south button) to open FreeChaF’s core menu for per-game options.

## Controls

FreeChaF exposes the Channel F console overlay through the RETROPAD. Press `Start` to show the virtual buttons, use the D-pad or stick to pick a button, then press a face button to activate it. Press `Start` again to hide the overlay.

![Channel F controller overlay](../images/controller-overlays/channelf.png)

| FreeChaF Function | Retropad mapping |
| --- | --- |
| Forward | D-pad Up / Left analog Up |
| Backward | D-pad Down / Left analog Down |
| Rotate Left | Y, L, Right analog Left |
| Rotate Right | A, R, Right analog Right |
| Pull Up | X / Right analog Up |
| Push Down | B / Right analog Down |
| Toggle Overlay | Start |
| Swap Controllers | Select |

## Troubleshooting

- Confirm all required BIOS files exist under `bios/` with the checksums above.
- If a ROM fails to boot, ensure it is one of the supported extensions and try a different dump.
