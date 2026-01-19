# Wolfenstein - Enemy Territory

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/etlegacy.webp" alt="Wolfenstein - Enemy Territory icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/etlegacy.png" alt="Wolfenstein - Enemy Territory logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Wolfenstein: Enemy Territory is replayed through the ET: Legacy engine, a modernized client for the free multiplayer shooter. REG-Linux keeps it in the `ports` group so the online component sits beside other source ports such as ECWolf.

### Quick reference

- **ROM folder:** `/userdata/roms/etlegacy`
- **Accepted formats:** `.etl`, `.pk3`
- **Emulator:** `etlegacy`
- **System group:** `ports`

## BIOS

ET: Legacy does not require BIOS files.

## Game files

Copy the contents of your `etmain` folder from the official Wolfenstein: Enemy Territory install (GOG, Steam, or Splash Damage) into `/userdata/roms/etlegacy/etmain/`. The key `pk3` archives include `pak0.pk3` and the map-specific packages; keep them inside the `etmain` subfolder so the engine can locate them.

Next, create an empty marker file such as `Wolfenstein - Enemy Territory.etl` inside `/userdata/roms/etlegacy/`. That blank file is how EmulationStation scrapes and launches the title.

## ROMs

ET: Legacy looks for the `etmain` directory and the `.pk3` archives surrounding it. Do not rename or move the `etmain` folder after copying; the client uses that exact path. If you want to include custom mods or a different map pack, drop the `.pk3` file next to the base data and add it to the launch parameters inside the `.etl` stub.

## Emulators

### etlegacy

The `etlegacy` binary exposes standard video, overlay, and controller overrides via `etlegacy.*` options. Use the RetroArch-style Quick Menu (`[HOTKEY]` + south button) to adjust display modes, toggle overlays, or reassign input bindings at runtime.

## Controls

A mouse and keyboard provide the most accurate control, but controllers can be bound once the client is running. Use the ET: Legacy in-game options to map joysticks, and rely on the Quick Menu if you need to swap profiles mid-session.

## Troubleshooting

- Ensure the `etmain` folder and its `.pk3` files are uncompressed inside `/userdata/roms/etlegacy/etmain/`. A missing `pak0.pk3` prevents the client from starting.
- The initial language selection happens the first time you run ET: Legacy; if it defaults to the wrong locale, delete the configuration file and rerun to pick a new language.
- We only ship the client; hosting private servers requires your own dedicated server software.
