---
title: "Pok\xE9mon Mini"
description: "Pok\xE9mon Mini documentation for REG Linux."
---

# Pokémon Mini

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/pokemini.webp" alt="Pokemon Mini icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/pokemini.png" alt="Pokemon Mini logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Pokémon Mini is a toy-like handheld released in 2001 that runs a handful of monochrome, motion-aware games. REG-Linux keeps its titles under the `pokemini` metadata group to make sure the round icons appear correctly.

## Technical specifications

- Manufacturer: Nintendo
- Release year: 2001
- Hardware type: portable

### Quick reference

- **ROM folder:** `/userdata/roms/pokemini`
- **Accepted formats:** `.min`, `.zip`, `.7z`
- **Emulator:** `libretro: pokemini`
- **System group:** `pokemini`

## ROMs

Drop `.min` files (or zipped packages) into `/userdata/roms/pokemini`. RetroArch/`libretro: pokemini` handles the tiny cartridges and exposes per-core settings for the LCD appearance.

## Emulators

### RetroArch / libretro: pokemini

The libretro core emulates the console’s LCD with motion sensors. It shows common video options (`pokemini.videomode`, `pokemini.smooth`, `pokemini.shaders`, `pokemini.pixel_perfect`, `pokemini.decoration`, `pokemini.game_translation`) and unique features:

- `global.pokemini_lcdfilter`: simulate the low-resolution pixel grid.
- `global.pokemini_lcdmode`: add the ghosting seen in original cartridges.

## Controls

Default mappings mirror the Game Boy layout: D-pad for movement and the two face buttons for the Pokémon Mini’s action buttons. If necessary, create a custom remap via `/remapping_controls_per_emulator`.

## Troubleshooting

- If an entry fails to start, unzip the archive before launching.
- Consult the generic support pages for more guidance.
