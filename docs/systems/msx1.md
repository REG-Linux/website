# MSX1

## Metadata

- Manufacturer: Microsoft
- Release Year: 1983
- Hardware: computer
- Platform tag: msx

## Supported ROM extensions

dsk, mx1, rom, zip, 7z, cas, m3u, ogv, openmsx

## Emulators

- **bluemsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BLUEMSX | Incompatible extensions: ogv, openmsx
- **fmsx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_FMSX | Incompatible extensions: ogv, openmsx
- **openmsx** (openmsx) – Requires BR2_PACKAGE_OPENMSX | Incompatible extensions: m3u

## Notes

## BIOS ##

- BlueMSX (DEFAULT)
Download the BlueMSX standalone version, available at http://bluemsx.msxblue.com/rel_download/blueMSXv282full.zip
then extract the "Databases" and "Machines" folders and add them to the /userdata/bios folder.

- FMSX
Requires the following files (available with fmsx distribution), in the /userdata/bios folder.
CARTS.SHA
CYRILLIC.FNT
DISK.ROM
FMPAC.ROM
FMPAC16.ROM
ITALIC.FNT
KANJI.ROM
MSX.ROM
MSX2.ROM
MSX2EXT.ROM
MSX2P.ROM
MSX2PEXT.ROM
MSXDOS2.ROM
PAINTER.ROM
RS232.ROM

- OpenMSX
Various BIOS files for OpenMSX should be in either folder below:
    1. userdata/system/configs/openmsx/share/systemroms
    2. userdata/bios/Machines
    3. userdata/bios/openmsx

---
Source: `msx1.yml`
