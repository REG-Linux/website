# Color Computer

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/coco.webp" alt="Color Computer icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/coco.png" alt="Color Computer logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1980 by Tandy Radio Shack, the Color Computer was a computer system.

## Technical specifications

- CPU: Motorola 6809E running at 0.895 MHz (in early models) or double-speed 1.79 MHz in later revisions.
- Memory: 4 KB RAM on Model I rising to 64 KB on the Model III/4 with ROM-on-cartridge for BASIC and OS.
- Display: MC6847 VDG capable of 256×192 pixels with four colors (always referencing palette of 9 base colors) and 6 rows of text.
- Sound: Basic single-channel square wave generator with limited volume control provided by the MC6847 video chip.

## Supported ROM extensions

wav, cas, dsk, ccc, rom, zip, 7z

## Emulators

- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

Requires MAME BIOS file coco.zip and coco3.zip

Default Autoload Behaviors
1. "usage" info field when using MAME software lists (if declared)
2. Cassette (.cas) files autoload as binary (CLOADM:EXEC)
3. Disk (.dsk) files autoload based on basename (eg. ZONX.dsk autoloads as LOADM “ZONX”:EXEC)
4. BASIC programs autorun if file basename ends with .bas
    3a. ALPHAII.BAS.dsk autoloads using RUN “ALPHAII”
    3b. GROVER.bas.cas  autoloads using CLOAD:RUN

user definable autoload overrides in: `system/configs/mame/autoload/coco_{cass,flop}_autoload.csv`
syntax: <romBasename>;<autoload command> (see comments in .csv files for detailed help & examples)

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
