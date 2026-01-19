---
title: Fallout 2 Community Edition
description: Fallout 2 Community Edition documentation for REG Linux.
---

# Fallout 2 Community Edition

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/fallout2-ce.webp" alt="Fallout 2 Community Edition icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/fallout2-ce.png" alt="Fallout 2 Community Edition logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Fallout 2 Community Edition modernizes the Fallout 2 engine with bug fixes, mod hooks, and enhanced configuration. REG-Linux lists it under `ports` and shares the same `fallout` metadata group used by Fallout 1.

### Quick reference

- **ROM folder:** `/userdata/roms/fallout2-ce`
- **Accepted format:** `.f2ce`
- **Emulator:** `fallout2-ce`
- **System group:** `ports`

## BIOS

Fallout 2 CE runs entirely from the original game data and needs no BIOS image.

## Installation

Copy the Fallout 2 files into `/userdata/roms/fallout2-ce/`, including `master.dat`, `critter.dat`, the entire `data/` tree, `sound/music/`, and config files (`fallout2.cfg`, `f2_res.ini`, `ddraw.ini`). Place the marker file:

```
touch "/userdata/roms/fallout2-ce/Fallout 2.f2ce"
```

This `.f2ce` file lets EmulationStation discover the ROM entry.

### Configuration notes

Adjust `fallout2.cfg` so `master_dat`, `critter_dat`, `master_patches`, and `critter_patches` match the actual files on disk. Paths are case-sensitive, so align them with how the files were installed. The `music_path1` option should reflect where your music folder resides (`data/sound/music/` or `sound/music/`), and the `.ACM` files must remain uppercase.

Use `f2_res.ini` to pick screen resolution/windowed mode, mirroring the layout recommended for Fallout 1 (desktop vs tablet vs mobile values). For advanced users, `ddraw.ini` exposes dozens of engine flags and tweaks courtesy of the Sfall framework; only change these if you understand the impact.

## ROM layout

Required items inside `/userdata/roms/fallout2-ce/`:

- `master.dat`, `critter.dat`
- A populated `data/` directory with `art`, `maps`, `proto`, `scripts`, `text`, and `worldmap.dat`
- `sound/music/` with the complete soundtrack (01hub.acm, etc.)
- `fallout2.cfg`, `f2_res.ini`, `ddraw.ini`
- `Fallout 2.f2ce`

## Emulators

### Fallout2-CE

REG-Linux launches `fallout2-ce` with the same `fallout2-ce.*` configuration options as Fallout 1. Use the Quick Menu to adjust video scaling, shader overrides, or controller bindings; the engine handles the rest.

## Controls

Mouse and keyboard are the default controls, though you can bind key groups to a controller from the game’s options menu. Text entry and dialog navigation are easiest with a cursor.

## Troubleshooting

- Make sure `Fallout 2.f2ce` exists and that the referenced `.dat` files match the names in `fallout2.cfg`.
- If the game cannot find music, verify `music_path1` matches your directory layout and that the filenames are uppercase.
- Reset `system/configs/fallout2-ce/` and `saves/fallout2-ce/` when switching between installations or clearing corrupted saves.
