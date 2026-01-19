---
title: Sonic Mania
description: Sonic Mania documentation for REG Linux.
---

# Sonic Mania

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/sonic-mania.webp" alt="Sonic Mania icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

Sonic Mania is a modern 2D platformer that continues the 16-bit Sonic legacy. REG-Linux treats it as a `ports` system that launches the RSDKv5 executable with the installed PC data.

### Quick reference

- **ROM folder:** `/userdata/roms/sonic-mania`
- **Accepted format:** `.sman`
- **Emulator:** `sonic-mania`
- **System group:** `ports`

## ROMs

Copy the `Data.rsdk` file from your Sonic Mania installation into `/userdata/roms/sonic-mania/`. The entry uses this file for all assets, so keep the filename exactly `Data.rsdk`.

Create a placeholder file in the same folder:

```
touch "/userdata/roms/sonic-mania/Sonic Mania.sman"
```

This file allows EmulationStation to identify and launch the game.

## Shaders

To enable GL3 shader filtering and keep movies working, create a mod under `/userdata/roms/sonic-mania/mods/GLShaders/`. Copy the `RSDKv5/Shaders` folder into `mods/GLShaders/Data/` and add a `mod.ini` containing:

```
Name=GLShaders
Description=GL3 shaders to enable filters and stuff
Author=Ducky
Version=1.0.0
TargetVersion=5
```

This ensures the port loads the proper shader packs.

## Emulators

### Sonic Mania

The `sonic-mania` binary honors Quick Menu overrides and supports custom mods inside the `mods/` folder. Use the Quick Menu or EmulationStation advanced options to tweak graphics, shaders, or controller mappings.

## Controls

Sonic Mania supports both keyboard and controller input. Map jump and spin dash to your preferred buttons via the in-game control editor for the best precision.

## Troubleshooting

- If the game complains about missing assets, verify `Data.rsdk` is present and not renamed.
- Delete `/userdata/system/configs/sonic-mania/` and `saves/sonic-mania/` to clear corrupted settings or saves.
