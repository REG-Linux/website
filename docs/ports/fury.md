# Ion Fury

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/fury.webp" alt="Ion Fury icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/fury.png" alt="Ion Fury logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Ion Fury (originally Ion Maiden) is a modern Build Engine shooter powered by EDuke32. REG-Linux promotes it as a `ports` entry so it stays alongside other Build/EDuke32-powered experiences while taking advantage of the latest engine fixes.

### Quick reference

- **ROM folder:** `/userdata/roms/fury`
- **Accepted format:** `.grp`
- **Emulator:** `eduke32`
- **System group:** `ports`

## BIOS

No BIOS is required; Ion Fury runs directly from its shipped data files.

## ROM files

Copy the following files from your Ion Fury installation (Steam, GOG, etc.) into `/userdata/roms/fury/`:

- `fury.grp` – main game archive containing maps, textures, and audio.
- `fury.grpinfo` – metadata for the port to recognize `fury.grp`.
- `fury.def` – contains palette settings and definitional data EDuke32 needs.

Leave the filenames as-is (uppercase, matching the archive) so the engine detects them automatically. The Aftershock expansion or future updates follow the same pattern; install them inside their own folders if needed and add dedicated `.eduke32` launchers.

## Saves

Save games live under `saves/fury/` using the standard EDuke32 scheme.

## Emulators

### Eduke32

REG-Linux invokes Ion Fury through the EDuke32 engine (`eduke32`). Standard options (`fury.videomode`, `fury.pad_to_keyboard`, `fury.bezel`, etc.) are available, plus `fury.nologo` to skip intro videos.

## Controls

Ion Fury defaults to mouse + keyboard, but the Quick Menu and controller overlay allow you to remap actions to gamepads. Use the in-game options to tweak aiming sensitivity or to bind special commands.

## Troubleshooting

- Check `/userdata/system/logs/fury.log` and `es_launch_stderr.log` when a title doesn’t start.
- Ensure all three required files (`fury.grp`, `fury.grpinfo`, `fury.def`) exist in `/userdata/roms/fury/`.
- Delete `system/configs/fury/` and `saves/fury/` to reset the configuration when switching between installs or running new mods.
