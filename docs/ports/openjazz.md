# Jazz Jackrabbit

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/openjazz.webp" alt="Jazz Jackrabbit icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/openjazz.png" alt="Jazz Jackrabbit logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

OpenJazz is an open-source recreation of the original Jazz Jackrabbit that modernizes the Win32 engine while still bundling the classic assets. REG-Linux treats it as a `ports` system so you can run the DOS-era platformer using the same interface as other PC ports.

### Quick reference

- **ROM folder:** `/userdata/roms/openjazz`
- **Accepted format:** `.game`
- **Emulator:** `openjazz`
- **System group:** `ports`

## BIOS

OpenJazz does not require BIOS dumps.

## Setup

1. Copy the full Jazz Jackrabbit install into `/userdata/roms/openjazz/`. It should contain the original data files (aural assets, levels, etc.).
2. Create an empty marker file so the system can be scraped:

```
touch "/userdata/roms/openjazz/Jazz Jackrabbit.game"
```

This file alerts EmulationStation to the available ROM.

## ROM files

The original `.grp` data, soundtrack, and level files must stay in place. OpenJazz scans `/userdata/roms/openjazz/` for these assets; if you move or rename them, update your copy accordingly.

## Emulators

### OpenJazz

The standalone OpenJazz binary launches the port. Use the Quick Menu to adjust video options, remap controllers, and toggle fullscreen or windowed rendering.

## Controls

The port respects the original keyboard layout but also supports gamepads. Bind movement and actions through REG-Linux’s controller remapper if you prefer a pad.

## Troubleshooting

- If the ROM missing message appears, confirm that `Jazz Jackrabbit.game` exists and the data files are present.
- OpenJazz stores saves under `saves/openjazz/`; delete the folder to reset the save slots when swapping installs.
