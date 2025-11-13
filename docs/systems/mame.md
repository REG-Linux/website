# Mame

## Metadata

- Manufacturer: Arcade
- Release Year: 1997
- Hardware: arcade
- Platform tag: arcade

## Supported ROM extensions

zip, 7z

## Emulators

- **imame4all** (libretro) – Requires BR2_PACKAGE_LIBRETRO_IMAME
- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame0139** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME2010
- **mame078plus** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME2003_PLUS
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

The system uses libretro mame2003+ as default core: compatible ROMs must come from set 0.78+
Depending on your hardware, other mame cores are included:
  - latest mame core (0.228 currently)
  - imame4all based on 0.37b5 romset
  - mame2010 based on 0.139 romset

Special files for mame2003 core:
- Add your samples files in /userdata/bios/mame2003/samples/

For more info: https://wiki.batocera.org/arcade

---
Source: `mame.yml`
