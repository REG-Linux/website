# EDuke32

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/eduke32.webp" alt="EDuke32 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/eduke32.png" alt="EDuke32 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The EDuke32 is a port platform developed by Ports. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Ports
- Hardware type: port
- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

eduke32

## Emulators

- **eduke32** (eduke32) – Requires BR2_PACKAGE_EDUKE32

## Notes

EDuke32 is a Build Engine source port for playing games like Duke Nukem 3D.

The following games are officially supported, and should be placed in the designated directory with their required
files:
  * duke:   Duke Nukem 3D (DUKE3D.GRP)
  * duke:   Duke Nukem 3D: Duke It Out in D.C. (DUKEDC.GRP)
  * duke:   Duke Nukem 3D: Duke Caribbean: Life's a Beach (VACATION.GRP)
  * duke:   Duke Nukem 3D: Duke: Nuclear Winter (NWINTER.GRP)
  * nam:    NAM (NAM.GRP, NAM.CON)
  * ww2gi:  World War II GI (WW2GI.GRP)
  * ww2gi:  World War II GI: Platoon Leader (PLATOONL.DAT, PLATOONL.DEF)

Note: If you want to play Ion Fury, check out the fury roms directory as it uses a slightly different binary.

Each game needs an .eduke32 file. The purpose of this file is to tell EDuke32 how to launch the game. This is simple
for most cases but can be more complicated if you are installing mods. It is recommended to underscore the name so
the scraper has an easier time getting a match e.g. Duke_Nukem_3D.eduke32.

For each Duke Nukem 3D game, create an .eduke32 file with the following text:
  FILE  = /duke/DUKE3D.GRP
  FILE+ = /duke/DUKEDC.GRP  <-- Note: Omit this line for the base game, update filename for each expansion

For Nam, create an .eduke32 file with the following text:
  FILE = /nam/NAM.GRP
  CON  = /nam/NAM.CON

For World War II GI, create an .eduke32 file with the following text:
  FILE = /ww2gi/WW2GI.GRP

For the World War II GI: Platoon Leader expansion, create an .eduke32 file with the following text:
  FILE  = /ww2gi/WW2GI.GRP
  FILE+ = /ww2gi/PLATOONL.DAT
  CON   = /ww2gi/PLATOONL.DEF

For mod support and troubleshooting, please visit the wiki for more information.


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
