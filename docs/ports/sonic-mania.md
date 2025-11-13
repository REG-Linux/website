# Sonic Mania

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/sonic-mania.webp" alt="Sonic Mania icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

Introduced in 2017 by Sega, the Sonic Mania was a port system. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Sega
- Release year: 2017
- Hardware type: port
- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

sman

## Emulators

- **sonic-mania** (sonic-mania) – Requires BR2_PACKAGE_SONIC_MANIA

## Notes

Add your copy of Sonic Mania, just the `Data.rsdk` file in here.
Then create a blank file called 'Sonic Mania.sman' in this folder also.
This file will allow EmulationStation to launch Sonic Mania and scrape artwork etc.

Once completed, it is **highly recommended** that you grab the Shaders folder in RSDKv5 and turn it into a mod.
Otherwise, movies will not display properly and the filters from video settings won't work.

To do this, create the following directory structure inside your mods directory:
```
GLShaders/
| Data/
| | ...
| mod.ini
```

Inside `mods/GLShaders/Data/` copy the `RSDKv5/Shaders` directory, and inside the mod.ini, paste this:
```
Name=GLShaders
Description=GL3 shaders to enable filters and stuff
Author=Ducky
Version=1.0.0
TargetVersion=5
```


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
