---
title: MSX2+
description: MSX2+ documentation for REG Linux.
---

# MSX2+

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/msx2+.webp" alt="MSX2+ icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/msx2+.png" alt="MSX2+ logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

MSX2+ arrived in 1988 as an incremental MSX2 revision with richer video features and sprite handling. REG-Linux labels it `msx2+` for metadata grouping.

### Quick reference

* **ROM folder:** `/userdata/roms/msx2+`
* **Accepted ROM formats:** `.dsk`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u`
* **Emulators:** RetroArch (`libretro: bluemsx`, `libretro: fmsx`), [openMSX](#openmsx), [CLK](#clk)
* **System group:** `msx`

| Emulator/Core | Notes |
| --- | --- |
| `libretro: bluemsx` | Same options as MSX2 with extra focus on MSX2+ sprites |
| `libretro: fmsx` | Smaller core tuned for handheld-style performance |
| `openmsx` | openMSX implements the MSX2+ BIOS list described in `msx2.md` |
| `CLK` | Clock Signal reuses the MSX2+ ROMs introduced earlier |

## Technical specifications

- CPU: Zilog Z80-compatible core (around 3.58 MHz) with the V9958 video chip managing advanced graphics.
- Memory: 64–512 KB RAM with expanded video RAM and mapper banks, allowing more sprites and tile data.
- Display: Yamaha V9958 offering 1920×212 interlaced modes, 192 colors on-screen, hardware palettes, and sprite scaling.
- Sound: AY-3-8910 PSG plus PCM and DAC capabilities from the V9958 for richer audio.

## Supported ROM extensions

`dsk`, `mx2`, `rom`, `zip`, `7z`, `cas`, `m3u`, `ogv`, `openmsx`

## ROMs

Store MSX2+ titles in `/userdata/roms/msx2+` and wrap multi-disk games in `.m3u` playlists for tidy gamelist entries.

## BIOS

Use the same BlueMSX/FMSX BIOS collection described in `msx2.md`; the MSX2+ relies on `MSX2.ROM`, `MSX2EXT.ROM`
and the additional mapper files listed earlier.

## Emulators

### RetroArch

RetroArch hosts `libretro: bluemsx` and `libretro: fmsx` for MSX2+ games. They expose the same `msx2.*` / `msxturbor.*`
options as the lower-tier MSX systems.

#### libretro: bluemsx

Same configuration as MSX2; include `global.bluemsx_nospritelimits` and the rewinding/autosave options (`msx2.rewind`,
`msx2.autosave`, `msx2.padtokeyboard`, `msx2.cheevos`).

#### libretro: fmsx

Mirrors the MSX2 settings and adds `msx2.netplay`.

### openMSX

openMSX reuses the `msx2.*` option group and the BIOS list from `msx2.md`.

### CLK

CLK began supporting the MSX2+ standard at REG-Linux 42, sharing the same BIOS files and `msx` option tree with other cores.

## Controls

MSX2+ uses the same REG-Linux RetroPad overlay as MSX1/2.

## Troubleshooting

Consult the generic support pages for additional help.
