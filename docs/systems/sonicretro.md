# Sonic Retro Engine

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/sonicretro.webp" alt="Sonic Retro Engine icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/sonicretro.png" alt="Sonic Retro Engine logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2021 by Sega, the Sonic Retro Engine was a port system. It is grouped with ports titles in EmulationStation.

## Technical specifications

- Manufacturer: Sega
- Release year: 2021
- Hardware type: port
- EmulationStation group: ports

## Supported ROM extensions

son, scd

## Emulators

- **sonic2013** (sonic2013) – Requires BR2_PACKAGE_SONIC2013
- **soniccd** (soniccd) – Requires BR2_PACKAGE_SONICCD

## Notes

---------------------
Data File Setup
---------------------

This port requires the .rsdk files from the Android or iOS versions of Sonic 1 & 2.

The Android APKs can be opened in 7zip, extract the file /assets/Data.rsdk.xmf, rename to Data.rsdk, and place in
a folder named [Game Name].son - ie "Sonic 1.son"

For Sonic CD, you can use the files from the Android, iOS, or Steam versions, as well as the video files from the Steam version.

The APK can be extracted the same way. If you're using the Steam version, the Data.rsdk is in the game's folder.
The rsdk and videos folder should be in a folder named [Game Name].scd - ie "Sonic CD.scd"

---------------------
Options and Emulators
---------------------

Batocera will auto-select the port to use based on the folder's extension - sonic2013/rsdk4 for .son folders, soniccd/rsdk3 for
.scd folders. Selecting the wrong emulator will be ignored as the two versions are not compatible. The options are slightly
different between the two, so you may need to manually select the emulator to change them.

The dev menu option is needed to run mods.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
