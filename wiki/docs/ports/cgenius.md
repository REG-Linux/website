# Commander Genius

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/cgenius.webp" alt="Commander Genius icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/cgenius.png" alt="Commander Genius logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Commander Genius is a fan-built engine for the Commander Keen and Cosmos the Cosmic Adventure series.
REG-Linux treats it as a port-style platform, grouping its entries under `ports` and launching the
`cgenius` binary so you can enjoy those DOS adventures without leaving the frontend.

### Quick reference

- **ROM folder:** `/userdata/roms/cgenius`
- **Accepted format:** `.cgenius`
- **Emulators:** `cgenius`
- **System group:** `ports`

## Requirements

The engine itself is open source, but you still need the original Commander Keen or Cosmos game files.
Extract each DOS release into its own subfolder inside `/userdata/roms/cgenius/games/`. Shareware
episodes (e.g., *Marooned on Mars*, *Secret of the Oracle*) are freely available, while registered
packs (such as *The Earth Explodes* or *Keen Must Die!*) must be purchased from their respective
publishers.

## ROMs

Once the DOS resources are extracted, create a `.cgenius` launcher file for each title (e.g.,
`Commander Keen 1 - Marooned on Mars.cgenius`). The launcher helps REG-Linux scrape the entry and
starts the right game folder when selected. Mods distributed through Commander Genius can reside
alongside the originals; just keep each game’s files in its own directory to avoid confusion.

## Emulators

### cgenius

The `cgenius` executable is the only emulator for this entry and requires `BR2_PACKAGE_CGENIUS` to be
built. It honors EmulationStation’s standard video and input mappings, so you can adjust controller
bindings through the Quick Menu if the default Retropad layout doesn’t feel accurate.

## Controls

Controller remapping is available via REG-Linux’s controller configuration and the RetroArch-style
Quick Menu. You can bind the action keys to South/East/West and keep the D-pad tied to movement to
mirror the original keyboard-based setup.

## Troubleshooting

- Ensure each `.cgenius` file points to the correct subfolder; misnamed launchers will prevent the game from appearing in EmulationStation.
- Verify that the DOS data (IWAD/TWAD equivalents) reside beneath `/userdata/roms/cgenius/games/<title>/`.
- Consult the generic support pages if you run into input issues or if REG-Linux refuses to start the launcher.
