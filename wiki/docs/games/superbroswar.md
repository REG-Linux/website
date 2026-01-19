---
title: Super Mario War
description: Super Mario War documentation for REG Linux.
---

# Super Mario War

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/superbroswar.webp" alt="Super Mario War icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/superbroswar.png" alt="Super Mario War logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Super Mario War is a multiplayer battle game where up to four players stomp each other across themed arenas. REG-Linux provides it through the `ports` section and expects the game assets from the Content Downloader.

### Quick reference

- **ROM folder:** `/userdata/roms/superbroswar`
- **Accepted format:** `.game`
- **Emulator/Core:** `libretro: Superbroswar`
- **System group:** `ports`

## ROMs

Install the `.game` folder delivered by the Content Downloader into `/userdata/roms/superbroswar/`. The folder should include the zipped data, levels, and textures that the libretro core needs. Keep the folder intact so EmulationStation can recognize the entry.

## Emulators

### RetroArch / libretro: Superbroswar

The core loads the assets directly and exposes the usual RetroArch video/input options. Use `/remapping_controls_per_emulator` or the Quick Menu to customize button layouts if the defaults don’t suit you.

## Controls

Super Mario War relies on the D-pad for movement and face buttons for stomps/jumps. Adjust the controller via the Quick Menu if you want to move actions to shoulder buttons.

## Troubleshooting

- If the game fails to launch, ensure the `.game` folder is not nested inside additional archives.
- Use the generic support pages for general input or configuration questions.
