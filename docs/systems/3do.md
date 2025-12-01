# 3DO Interactive Multiplayer

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/3do.webp" alt="3DO Interactive Multiplayer icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/3do.png" alt="3DO Interactive Multiplayer logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1993 by Panasonic - Sanyo - Goldstar, the 3DO Interactive Multiplayer was a fifth-generation console system. Built around a 12.5 MHz ARM60 CPU with 2 MB of RAM and 1 MB of VRAM, it was technically advanced for its time but launched at a premium price which limited its mainstream success. Panasonic, Sanyo and Goldstar (later LG) licensed the hardware design from The 3DO Company rather than producing consoles themselves.

In REG-Linux, the 3DO is handled as part of the `3do` system group. The frontend can scrape metadata for this group and, when the theme supports it, display a dedicated visual set for the platform.

## Technical specifications

- Manufacturer: Panasonic - Sanyo - Goldstar
- Release year: 1993
- Hardware type: console
- CPU: 12.5 MHz ARM60
- System RAM: 2 MB
- Video RAM: 1 MB

## Supported ROM extensions

`iso`, `chd`, `cue`

## Quick reference

- **Emulator:** RetroArch
- **Core:** Opera (libretro)
- **ROM folder:** `/userdata/roms/3do`
- **Recommended formats:** `.iso`, `.chd`, `.cue`
- **Shared saves:** Enable NVRAM STORAGE for multi-disc titles

## REG-Linux integration

ROM images go into `/userdata/roms/3do/`. To save space while keeping compatibility, REG-Linux encourages converting disc images to [CHD](/disk_image_compression#chd), though `.iso`, `.chd` and `.cue` files are all supported in the same folder. The system group allows metadata scraping and visual themes to treat 3DO uniquely within the frontend.

### Multi-disc games

The Opera core supports multi-disc titles without M3U playlists, but older workflows required renaming saves when swapping discs. From REG-Linux **v34** onward you can highlight the multi-disc entry, press `[SELECT]`, open the advanced system settings and enable **NVRAM STORAGE**. When enabled, every disc in that release shares the same NVRAM file, letting you swap discs without losing progress while mirroring the original hardware's limited internal storage.

## Required BIOS files

RetroArch's Opera core needs original 3DO BIOS files to boot games. Place them in the `bios` folder using the exact filenames and MD5 hashes below:

| MD5 checksum                       | Share file path     | Description       |
|------------------------------------|---------------------|-------------------|
| `f47264dd47fe30f73ab3c010015c155b` | `bios/panafz1.bin`  | Panasonic FZ-1    |
| `51f2f43ae2f3508a14d9f56597e2d3ce` | `bios/panafz10.bin` | Panasonic FZ-10   |
| `8639fd5e549bd6238cfee79e3e749114` | `bios/goldstar.bin` | Goldstar GDO-101M |

If any checksum mismatches or a file is missing, the core may refuse to boot or behave unpredictably.

## Emulators

### RetroArch

RetroArch is the primary frontend used for 3DO emulation in REG-Linux. General interface, hotkeys and configuration help are documented on the [RetroArch page](/emulators/retroarch).

#### Opera (libretro)

Opera is a low-level emulator derived from 4DO (which itself was a fork of FreeDO) that has been adapted to the libretro API. REG-Linux ships the current [libretro Opera core](https://github.com/libretro/opera-libretro). This core exposes standardized REG-Linux hooks such as `3do.rewind`, `3do.autosave`, `3do.netplay` and `3do.cheevos`.

Core-specific documentation and compatibility lists can be found via:

- [Opera documentation](https://docs.libretro.com/library/opera/)
- [4DO Compatibility List](http://wiki.fourdo.com/Compatibility_List)

##### Opera core features & options

| ES setting name + REG-Linux.conf key | Description => ES option value |
| --- | --- |
| VIDEO RESOLUTION `global.high_resolution` | Increase the internal framebuffer from 320x240 to 640x480 for better 3D visuals without touching 2D sprites. => 320x240 `disabled`, 640x480 `enabled`. |
| CPU OVERCLOCK `global.cpu_overclock` | Emulates the original 12.5 MHz ARM60 CPU but allows up to 2x overclocking; 1.5x is typically a good balance for demanding titles such as *Need for Speed*. => 1.0x (12.50Mhz) `1.0x (12.50Mhz)`, 1.1x (13.75Mhz) `1.1x (13.75Mhz)`, 1.2x (15.00Mhz) `1.2x (15.00Mhz)`, 1.5x (18.75Mhz) `1.5x (18.75Mhz)`, 1.6x (20.00Mhz) `1.6x (20.00Mhz)`, 1.8x (22.50Mhz) `1.8x (22.50Mhz)`, 2.0x (25.00Mhz) `2.0x (25.00Mhz)`. |
| ACTIVE INPUT DEVICES FIX `global.active_devices` | Limits the number of controllers reported by the core to avoid games becoming unresponsive. Match this to the number of players or set to **1** for solo play. => 1-8. |
| ADDITIONAL GAME FIXES `global.game_fixes_opera` | Collection of timing fixes per title; Auto usually works, but heavy hitters such as *Alone in the Dark* or *Crash'n Burn* may benefit from the specific hacks. => Off `disabled`, Alone in the Dark `timing_hack6`, Crash'n Burn `timing_hack1`, Dinopark Tycoon `timing_hack3`, Microcosm `timing_hack5`. |
| NVRAM STORAGE `global.opera_nvram_storage` | Choose **Shared** to share saves between discs in a multi-disc release or **Per Game** for separate storage. => Shared `shared`, Per Game `per game`. |

## Controls

The default 3DO controller maps to the [REG-Linux Retropad](/configure_a_controller). Overlays and per-game mappings can be adjusted through the platform's standard controller configuration tools.

## Troubleshooting

- Check that BIOS filenames and MD5 hashes match the required values.
- Confirm ROM images use supported formats (`.iso`, `.chd`, `.cue`).
- Verify games live under `/userdata/roms/3do/`.
- Consult the [RetroArch page](/emulators/retroarch) for general issues such as audio glitches, stuttering or netplay questions.
