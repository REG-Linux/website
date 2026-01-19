---
title: The Force Engine
description: The Force Engine documentation for REG Linux.
---

# The Force Engine

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/theforceengine.webp" alt="The Force Engine icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

The Force Engine (TFE) recreates classic LucasArts shooters such as Dark Forces and Outlaws. REG-Linux exposes it as a `ports` entry that loads your own game files and community mods.

### Quick reference

- **ROM folder:** `/userdata/roms/theforceengine`
- **Accepted format:** `.tfe`
- **Emulator:** `theforceengine`
- **System group:** `ports`

## ROMs

Copy the original game installation (Steam, GOG, etc.) into `/userdata/roms/theforceengine/`. For Dark Forces, include `DARKWAR.WAD`, `DARKWAR.RTL`, `DARKWAR.RTC`, `REMOTE1.RTS`, and other required assets. For Outlaws or other supported titles, place their data into uniquely named subfolders inside the ROMs folder.

Create a marker file per title such as:

```
touch "/userdata/roms/theforceengine/Star Wars - Dark Forces.tfe"
```

This `.tfe` file keeps the entry visible in EmulationStation. The port reads the original files and maps them through the TFE binary.

## Mods

Drop mod archives (zip files only) into `/userdata/system/configs/theforceengine/Mods/`. To launch a mod directly, create a `.tfe` file whose contents are the mod zip filename (e.g., `aons_modern.zip`), then select that entry in the ports list.

## HD textures

If you have the remastered version of Dark Forces, copy `enhanced.gob` into the game folder before launching TFE so the engine can read the upgraded textures.

## Emulators

### The Force Engine

The `theforceengine` binary loads the selected `.tfe` file and reads the configuration from `userdata/system/configs/theforceengine/`. Use the Quick Menu to adjust video or controller settings after the first profile creation.

## Controls

The port prefers a mouse and keyboard for setup, though the engine can map keyboard events to gamepads after the profile is established.

## Troubleshooting

- Keep the directory names exact (e.g., `/userdata/roms/theforceengine/Star Wars - Dark Forces/`) so the port can locate the assets.
- Delete `/userdata/system/configs/theforceengine/` to reset settings or to clear mod references when launching new packages.
