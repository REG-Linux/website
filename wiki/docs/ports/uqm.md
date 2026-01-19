---
title: Ur-Quan Masters
description: Ur-Quan Masters documentation for REG Linux.
---

# Ur-Quan Masters

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/uqm.webp" alt="Ur-Quan Masters icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/uqm.png" alt="Ur-Quan Masters logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Ur-Quan Masters is the open-source revival of Star Control II. REG-Linux places it under the `ports` group and loads the `uqm` engine with the community content package.

### Quick reference

- **ROM folder:** `/userdata/roms/uqm`
- **Accepted format:** `.game`
- **Emulator:** `uqm`
- **System group:** `ports`

## ROMs

Create a `packages/` subfolder inside `/userdata/roms/uqm/` and place your `uqm-0.8.0-content.uqm` (or a later content bundle) there. Then add a placeholder launcher:

```
touch "/userdata/roms/uqm/Ur-Quan Masters.game"
```

The `.game` file tells EmulationStation to expose the entry while the content bundle supplies all of the assets.

## Emulators

### UQM

The `uqm` binary loads the content package directly and honors the standard options for RetroArch-style frontends. Use the Quick Menu to adjust video, audio, or controller overrides if needed.

## Controls

Ur-Quan Masters was built for keyboard and mouse, but the newer client also supports gamepads. Map your preferred hotkeys through the in-game controls menu.

## Troubleshooting

- Ensure the `packages/uqm-0.8.0-content.uqm` file is intact and zipped correctly; corrupted bundles prevent the game from starting.
- Delete `/userdata/system/configs/uqm/` if you need to reset saved controls or settings.
