# Daphne

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/daphne.webp" alt="Daphne icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/daphne.png" alt="Daphne logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1983 by Arcade, the Daphne was a arcade system. Its platform tag is `alg, daphne, arcade` for proper filtering.

## Technical specifications

- Manufacturer: Arcade
- Release year: 1983
- Hardware type: arcade
- Platform tag: alg, daphne, arcade

## Supported ROM extensions

daphne, zar

## Emulators

- **hypseus-singe** (hypseus-singe) – Requires BR2_PACKAGE_HYPSEUS_SINGE

## Notes

Daphne supports these specific laser games games only:
- Astron Belt
- Badlands
- Bega's Battle
- Cliff Hanger
- Cobra Command
- Dragon's Lair
- Dragon's Lair (Atari EU)
- Dragon's Lair II: Time Warp
- Esh's Aurunmilla
- Galaxy Ranger
- Goal to Go
- GP World
- Interstellar Laser Fantasy
- M.A.C.H. 3
- Road Blaster
- Space Ace
- Space Ace (Atari EU)
- Super Don Quix-Ote
- Thayer's Quest
- Us Vs Them

Games should be in a folder names with the .daphne extension.
Supporting ROM files should be in a folder named roms.

roms
|-- daphne
    |   (The folder below holds a laserdisc...".daphne"
    |   tells emulationstation to add this to the menu,
    |   and "badlands" tells daphne to use that game engine)
    |
    |-- badlands.daphne
    |   |-- badlands.commands (Optional extra command-
    |   |                      line parameters)
    |   |-- badlands.txt      (Framefile)
    |   |-- badlands-pc.m2v
    |   |-- badlands-pc.ogg
    |   |-- ...
    |
    |   (All rom zips files go into this roms folder)
    |-- roms
        |-- badlands.zip

Singe games should now be run out of the singe rom directory.


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
