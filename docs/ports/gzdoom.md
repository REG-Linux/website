# GZDoom

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/gzdoom.png" alt="GZDoom logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The GZDoom is a port platform developed by Ports. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Ports
- Hardware type: port
- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

wad, iwad, pwad, gzdoom

## Emulators

- **gzdoom** (gzdoom) – Requires BR2_PACKAGE_GZDOOM

## Notes

Custom mods can be used by creating a new text file named after the game with the extension ''.gzdoom''. For example:
Aliens Eradication.gzdoom, which contains this single line of text:
-iwad DOOM2.WAD -file ALIENS_ERADICATION_TC_2_0.pk3 ERADICATION_MAPSET_2_0.wad

Note: The command must be on one line and the casing of the filenames and extensions must match exactly.

Additional music can be added to /userdata/system/configs/gzdoom in the fm_banks & soundfonts folders respectively.


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
