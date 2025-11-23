# Doom 3

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/doom3.png" alt="Doom 3 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2004 by Ports, the Doom 3 was a port system. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Ports
- Release year: 2004
- Hardware type: port
- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

d3

## Emulators

- **dhewm3** (dhewm3) – Requires BR2_PACKAGE_DHEWM3

## Notes

Add your Doom 3 (and if you have the Resurrection of Evil mod) pk4 files here like so:

└── roms/
    └── doom3/
        ├── base/
        │   ├── pak000.pk4
        │   ├── pak001.pk4
        │   ├── pak002.pk4
        │   ├── pak003.pk4
        │   ├── pak004.pk4
        │   ├── pak005.pk4
        │   ├── pak006.pk4
        │   ├── pak007.pk4
        │   └── pak008.pk4
        └── d3xp/
            ├── pak000.pk4
            └── pak001.pk4

Create a `Doom 3.d3` file in the roms/doom3 directory.
If you have the Resurrection of Evil mod then Create a `Doom 3 - Resurrection of Evil.d3` file too.

The `Doom 3.d3` file should contain the path to the base game. - i.e. base/pak000.pk4
Similarly `Doom 3 - Resurrection of Evil.d3` should be - d3xp/pak000.pk4


---
