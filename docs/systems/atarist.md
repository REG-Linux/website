# Atari ST

## Metadata

- Manufacturer: Atari
- Release Year: 1985
- Hardware: computer

## Supported ROM extensions

st, msa, stx, dim, ipf, m3u, zip, 7z, hd, gemdos, vhd, gem, ide

## Emulators

- **hatari** (hatari) – Requires BR2_PACKAGE_HATARI
- **hatari** (libretro) – Requires BR2_PACKAGE_LIBRETRO_HATARI | Incompatible extensions: hd, gemdos
- **hatarib** (libretro) – Requires BR2_PACKAGE_LIBRETRO_HATARIB | Incompatible extensions: hd, gemdos

## Notes

To enable GEMDOS support within the non-libretro version of Hatari.
Create a directory within the roms folder that has a .gemdos extension.
i.e. /userdata/roms/atarist/<drive name>.gemdos

---
Source: `atarist.yml`
