# Family Computer Disk System

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/fds.webp" alt="Family Computer Disk System icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/fds.png" alt="Family Computer Disk System logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Family Computer Disk System (FDS) is the 1986 disk-based add-on for Nintendo’s Famicom, adding extra RAM, faster saves and enhanced audio. REG-Linux treats it as part of the `nes` family while tagging it with `fds` so compatible themes can show dedicated assets.

## Supported ROM extensions

`.fds`, `.zip`, `.7z`

## Quick reference

- **Emulator:** RetroArch
- **Cores:** libretro: fceumm, libretro: Nestopia
- **ROM folder:** `/userdata/roms/fds`
- **Accepted formats:** `.fds`, `.zip`, `.7z`

## BIOS

MAME-style cores require the Disk System BIOS (`disksys.rom`) to be present in `bios/`:

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `ca30b50f880eb660a320674ed365ef7a` | `bios/disksys.rom` | Famicom Disk System BIOS |

Keep the filename unchanged so the detection logic works.

## ROMs

Place each title under `/userdata/roms/fds/<name>.fds/` or store zipped `.zip`/`.7z` archives; REG-Linux will list them using the `.fds` extension. Avoid extracting the ROM files; keep them compressed for the emulator to recognize them.

## Emulators

### RetroArch (libretro: fceumm / Nestopia)

RetroArch hosts the NES cores, and they expose the FDS options described below. Open the Quick Menu during a game (`[HOTKEY]` + south button) to access advanced settings or controller mapping.

Standardized options across libretro NES cores: `fds.videomode`, `fds.ratio`, `fds.smooth`, `fds.shaders`, `fds.pixel_perfect`, `fds.decoration`, `fds.game_translation`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| GRAPHICS API `fds.gfxbackend` | Choose OpenGL or Vulkan rendering. |
| AUDIO LATENCY `fds.audio_latency` | Raise buffer to fix crackling; lower to reduce latency. |
| THREADED VIDEO `fds.video_threaded` | Offload rendering for better speed. |

#### libretro: fceumm configuration

| ES setting name | Description => Value |
| --- | --- |
|`global.fceumm_nospritelimit`| Remove sprite per line limit.|
|`global.fceumm_palette`| Select color palette (default, composite, smooth, etc.).|
|`global.fceumm_ntsc_filter`| Enable blargg NTSC filters (RGB/composite).|
|`global.fceumm_sndquality`| Raise audio quality (Low/High/Very High).|
|`global.controller1_nes`/`global.controller2_nes`| Choose NES Gamepad, Zapper or Arkanoid paddle.|

#### libretro: Nestopia configuration

| ES setting name | Description => Value |
| --- | --- |
|`global.nestopia_nospritelimit`| Remove sprite per line limit.|
|`global.nestopia_palette`| Choose color palette.|
|`global.nestopia_blargg_ntsc_filter`| Toggle NTSC filters.|
|`global.nestopia_overclock`| Overclock the CPU (off/2x).|
|`global.nestopia_select_adapter`| Force 4-player adapter mode (NTSC/Famicom).|

## Controls

FDS games map to the default [REG-Linux Retropad](/configure_a_controller) overlay for NES controllers:

![nes controller overlay](../images/controller-overlays/nes-1.png)

## Troubleshooting

- Ensure `/userdata/roms/fds/` contains `.fds` folders or zipped archives, and that the BIOS `disksys.rom` is installed.
- Switch between NES cores if a game behaves differently; some titles prefer one core’s timing.
