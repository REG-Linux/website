---
title: CorsixTH
description: CorsixTH documentation for REG Linux.
---

# CorsixTH

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/corsixth.webp" alt="CorsixTH icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/corsixth.png" alt="CorsixTH logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

CorsixTH is a Lua-based reimplementation of Theme Hospital. It boots the original data files with quality-of-life tweaks while remaining grouped under `ports` in EmulationStation so it keeps pace with REG-Linux’s other non-console engines.

### Quick reference

- **ROM folder:** `/userdata/roms/corsixth`
- **Accepted format:** `.game`
- **Emulators:** `corsixth`
- **System group:** `ports`

## BIOS

CorsixTH does not require a BIOS dump; it directly reads the Theme Hospital data folder.

## Game files

Purchase or locate the Theme Hospital install (GoG, Steam, or original CD) and extract the entire folder tree into `/userdata/roms/corsixth/Theme Hospital/`. At the root of `/userdata/roms/corsixth/` create one or more `.game` files that point to each data set—for example:

```
Theme Hospital.game
```

Each `.game` file should contain the relative folder name (e.g., `Theme Hospital/`) so REG-Linux knows where to scrape the executable. This file also names the entry shown in EmulationStation.

### Custom music

If you prefer alternate audio, drop MP3 tracks into `/userdata/roms/corsixth/MP3/`. Add a `names.txt` file alongside the MP3s where each odd line is the actual filename and the following line is the in-game song name. CorsixTH will list these names when you browse the soundtrack options.

## ROMs

Having a complete Theme Hospital directory with its `data` subfolder, `executable`, and `art` assets is mandatory. Missing files cause CorsixTH to bail with a “missing data file” error, so double-check your extraction.

## Emulators

### CorsixTH

The dedicated CorsixTH executable lives under `/usr/bin/corsixth`. Launching it from EmulationStation exposes options for fullscreen or windowed display, vsync, and controller polling. Use the Quick Menu (`[HOTKEY]` + south button) if you need to tweak inputs or override video settings at runtime.

## Controls

CorsixTH ships with a mouse-first control scheme, but you can also use gamepads by remapping buttons through REG-Linux’s controller configuration. The Quick Menu lets you bind keys to retropad directions if necessary for cursor movement.

## Troubleshooting

- Double-check that each `.game` file matches a valid subfolder inside `/userdata/roms/corsixth`; typos keep the system from appearing in the list.
- If CorsixTH complains about missing WAV or art assets, re-extract the Theme Hospital folder from a clean install rather than copying only the `base` assets.
- Custom MP3 playlists require both the track and `names.txt`; CorsixTH silently ignores tracks without a matching name entry.
