---
title: Amiga CDTV
description: Amiga CDTV documentation for REG Linux.
---

# Amiga CDTV

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/amigacdtv.webp" alt="Amiga CDTV icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/amigacdtv.png" alt="Amiga CDTV logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Commodore CDTV (Commodore Dynamic Total Vision) is a multimedia appliance that paired Amiga 500-class hardware with a CD-ROM drive, remote control and hi-fi styling. REG-Linux exposes it as the `amigacdtv` group so compatible themes can use the dedicated artwork set.

## Technical specifications

- CPU: Motorola 68000 at 7.09 MHz
- Memory: 1 MB Chip RAM with expansion via Fast RAM slots
- Display: OCS/ECS graphics (32 colors out of 4096 palette, HAM mode available)
- Sound: Paula audio with PCM playback plus CD audio handling

## Supported ROM extensions

`bin`, `cue`, `iso`, `chd`, `m3u`

## Quick reference

- **ROM folder:** `/userdata/roms/amigacdtv`
- **Accepted formats:** `.bin`, `.cue`, `.iso`, `.chd`, `.m3u`
- **Emulators:** libretro: puae / puae2021 / uae4arm
- **System group:** `amigacdtv`

## BIOS

Ensure all four CDTV Kickstart/extension ROMs are present with the correct MD5 checksums below:

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `82a21c1890cae844b3df741f2762d48d` | `bios/kick34005.A500` | Kickstart v1.3 rev 34.005 (shared with Amiga 500)
| `89da1838a24460e4b93f4f0c5d92d48d` | `bios/kick34005.CDTV` | CDTV extended ROM v1.00
| `82a21c1890cae844b3df741f2762d48d` | `bios/amiga-os-130.rom` | Alternate Kickstart v1.3 image
| `89da1838a24460e4b93f4f0c5d92d48d` | `bios/amiga-ext-130-cdtv.rom` | CDTV extension ROM v1.00

If any checksums differ the system may fail to boot.

## ROMs

Place every CDTV disc image under `/userdata/roms/amigacdtv`. Titles often ship as `.iso`/`.cue` pairs or raw `.bin` files, and CHD archives are supported for space savings.

## Emulators

### RetroArch

RetroArch uses libretro cores to emulate the system; open the Quick Menu (`[HOTKEY]` + south button) to change core options or input remapping.

#### libretro: puae

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| AMIGA MODEL `global.puae_model` | Force a specific Amiga model (CDTV, CD32, etc.). |
| CPU COMPATIBILITY `global.cpu_compatibility` | Help games that run too fast. |
| CPU MULTIPLIER `global.cpu_multiplier` | Increase the emulated CPU frequency. |
| VIDEO STANDARD `global.video_standard` | Toggle PAL/NTSC timing. |
| VIDEO RESOLUTION `global.video_resolution` | Choose the rendering resolution. |
| ZOOM MODE `global.zoom_mode` | Crop or scale the framebuffer. |
| FRAMESKIP `global.gfx_framerate` | Skip frames for smoother performance. |
| MOUSE SPEED `global.mouse_speed` | Global mouse speed setting. |
| CD BOOT DELAY `amigacdtv.puae_cd_startup_delayed_insert` | Insert the CD after the boot animation to avoid loading failures. => Off `disabled`, On `enabled`. |
| CD TURBO SPEED `amigacdtv.puae_cd_speed` | Speed up CD access at the risk of minor glitches. => Off `100`, On `0`. |

Libretro cores such as `puae2021` and `uae4arm` expose the same core options when emulating CDTV content.

## Controls

The CDTV remote/controller layout is mapped to a REG-Linux Retropad:

![amigacdtv controller overlay](../images/controller-overlays/amigacdtv-1.png)

Use RetroArch’s Quick Menu to tweak any button mapping that needs changing.

## Troubleshooting

- Double-check the BIOS filenames and MD5 hashes every time you update ROM files—missing or incorrect ROMs prevent booting.
- Confirm your discs live under `/userdata/roms/amigacdtv` and use a supported format.
