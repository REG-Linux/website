# Quake III

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/quake3.webp" alt="Quake III icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/quake3.png" alt="Quake III logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Quake III Arena and its Team Arena expansion are supported through the ioquake3 engine. REG-Linux exposes them via the `ports` list so you can load the base game, expansion, or mods from a unified launcher.

### Quick reference

- **ROM folder:** `/userdata/roms/quake3`
- **Accepted format:** `.quake3`
- **Emulator:** `ioquake3`
- **System group:** `ports`

## BIOS

ioquake3 needs no BIOS files.

## ROMs

Copy `baseq3` and `missionpack` folders from your Quake III (or Team Arena) install into `/userdata/roms/quake3/`. Add a `.quake3` marker per profile:

- `/userdata/roms/quake3/Quake III Arena.quake3` containing `+set fs_game "baseq3"`
- `/userdata/roms/quake3/Quake III Team Arena.quake3` containing `+set fs_game "missionpack"`

You can create more `.quake3` files for mod folders by referencing their `fs_game` name and pointing to the appropriate `.pk3` directory. Keep the marker lines single-lined and case-sensitive.

## Emulators

### ioquake3

ioquake3 launches with the command-line inside the `.quake3` file and exposes the usual Quick Menu overrides (`ioquake3.videomode`, `ioquake3.ratio`, etc.). Use the Quick Menu to swap between base/missionpack or to add mod `.pk3` files via `+set fs_game`.

## Controls

The port ships with mouse-first input but accepts controllers. Use the Quick Menu to rebind actions to buttons, and rely on the keyboard for menu navigation (Team Arena menus require mouse clicks).

## Troubleshooting

- If the port cannot find the data, ensure `baseq3/` and `missionpack/` sit directly under `/userdata/roms/quake3/`.
- Delete `/userdata/system/configs/ioquake3/` to reset custom settings when switching between pipelines.
