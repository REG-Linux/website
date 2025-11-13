# Sonic Mania

## Metadata

- Manufacturer: Sega
- Release Year: 2017
- Hardware: port
- Platform tag: pc
- Group: ports

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

For more info: https://wiki.batocera.org/systems:sonic-mania

---
Source: `sonic-mania.yml`
