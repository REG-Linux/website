# Color Computer

## Metadata

- Manufacturer: Tandy Radio Shack
- Release Year: 1980
- Hardware: computer

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
Source: `coco.yml`
