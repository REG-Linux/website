# ColecoVision

## Metadata

- Manufacturer: Coleco
- Release Year: 1982
- Hardware: console

## Supported ROM extensions

bin, col, rom, zip, 7z

## Emulators

- **bluemsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BLUEMSX
- **gearcoleco** (libretro) – Requires BR2_PACKAGE_LIBRETRO_GEARCOLECO
- **openmsx** (openmsx) – Requires BR2_PACKAGE_OPENMSX

## Notes

## BIOS ##

- Gearcoleco:
BIOS is needed to run (coleco.rom file).
It is possible to load any BIOS but the original one with md5 2c66f5911e5b42b8ebe113403548eee7 is recommended.

- OpenMSX:
coleco.rom must be in /userdata/system/configs/openmsx/share/systemroms to run Coleco SGM roms.

- BlueMSX:
You must download the BlueMSX standalone version, available to this URL:
http://bluemsx.msxblue.com/rel_download/blueMSXv282full.zip

Extract the "Databases" and "Machines" folders and add them to the bios folder.

Ensure the coleco.rom file (md5sum = 2c66f5911e5b42b8ebe113403548eee7) is inside the folder /bios/Machines/COL - ColecoVision/

## MAPPING ##

JOYPAD_UP     = COLECO 1
JOYPAD_DOWN   = COLECO 2
JOYPAD_LEFT   = COLECO 3
JOYPAD_RIGHT  = COLECO 4
JOYPAD_A      = COLECO 5
JOYPAD_B      = COLECO 6
JOYPAD_X      = COLECO 7
JOYPAD_Y      = COLECO 8
JOYPAD_R2     = COLECO 9
JOYPAD_L2     = COLECO 0
JOYPAD_R      = COLECO BUTTON1
JOYPAD_L      = COLECO BUTTON2
JOYPAD_SELECT = COLECO STAR
JOYPAD_START  = COLECO HASH

---
Source: `colecovision.yml`
