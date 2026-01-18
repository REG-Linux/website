# Fallout Community Edition

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/fallout1-ce.webp" alt="Fallout Community Edition icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/fallout1-ce.png" alt="Fallout Community Edition logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Fallout Community Edition (Fallout-CE) is a modern rebuild of the Fallout 1 engine. It preserves the original RPG flow, adds bug fixes, and exposes modern configuration options on Linux. REG-Linux classifies it under the `ports` system group, with the `fallout` metadata tag shared across both Fallout 1 and Fallout 2 entries.

### Quick reference

- **ROM folder:** `/userdata/roms/fallout1-ce`
- **Accepted format:** `.f1ce`
- **Emulator:** `fallout1-ce`
- **System group:** `ports`

## BIOS

Fallout-CE does not require a BIOS; it runs directly from the assembled game data.

## Installation

Copy your Fallout 1 data into `/userdata/roms/fallout1-ce/`, including `CRITTER.DAT`, `MASTER.DAT`, and the entire `data/` directory. Create a blank starter file such as:

```
touch "/userdata/roms/fallout1-ce/Fallout.f1ce"
```

This file is what EmulationStation scans to list the entry.

### Configuration notes

Edit `fallout.cfg` to make sure `master_dat`, `critter_dat`, `master_patches`, and `critter_patches` point to the filenames on disk; case sensitivity matters on Linux. The `music_path1` setting should reflect whether your music files sit in `data/sound/music/` or `sound/music/`. Typically, the path is one of:

- `data/sound/music/`
- `sound/music/`

Music archives (`*.ACM`) must remain uppercase even if the folders are lowercase.

Adjust `f1_res.ini` to pick your screen resolution and window mode. A simple configuration might look like:

```ini
[MAIN]
SCR_WIDTH=1280
SCR_HEIGHT=720
WINDOWED=1
```

Use full-resolution values on desktops, logical (point-based) sizes on tablets, and a 480px height for phones while scaling the width to match the aspect ratio.

## ROM layout

The folder should contain:

- `CRITTER.DAT`, `MASTER.DAT`
- The `data/` directory with `art`, `maps`, `scripts`, `sound/music`, and `text` subfolders.
- `fallout.cfg`, `f1_res.ini`, `Fallout.f1ce`

Ensure each subfolder includes the assets the engine expects (dialogs in `text/english`, ACME songs in `sound/music`, map files in `maps/`, etc.).

## Emulators

### Fallout1-CE

REG-Linux launches the `fallout1-ce` executable with the standard RetroArch-style options such as `fallout1-ce.videomode`, `fallout1-ce.shaders`, and `fallout1-ce.decoration`. Use the Quick Menu to tweak display scaling or controller mappings when needed.

## Controls

The game leans on mouse + keyboard controls. You can still map movement or dialog selections to a controller via the global input settings, but text-heavy menus respond best to a mouse cursor.

## Troubleshooting

- Verify that `Fallout.f1ce` exists and that the referenced `.dat` files match the casing rules in `fallout.cfg`.
- If the music does not play, double-check the `music_path1` entry and ensure the `.ACM` files are uppercase.
- Delete `userdata/saves/fallout1-ce/` and `system/configs/fallout1-ce/` to reset save data or configuration when switching installations.
