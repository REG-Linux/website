# Macintosh

## Metadata

- Manufacturer: Apple
- Release Year: 1984
- Hardware: computer

## Supported ROM extensions

dsk, zip, 7z, mfi, dfi, hfe, mfm, td0, imd, d77, d88, 1dd, cqm, cqi, dsk, ima, img, ufi, ipf, dc42, woz, 2mg, 360, chd, cue, toc, nrg, gdi, iso, cdr, hd, hdv, 2mg, hdi

## Emulators

- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **minivmac** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MINIVMAC | Incompatible extensions: 7z, mfi, dfi, hfe, mfm, td0, imd, d77, d88, 1dd, cqm, cqi, ima, ufi, ipf, dc42, woz, 2mg, 360, chd, cue, toc, nrg, gdi, iso, cdr, hd, hdv, 2mg, hdi
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

MAME requires a number of BIOS and device files, place in the bios folder in zip format.
Boot disks are from MAME's software lists, floppy images need to be extracted and renamed.
It is recommended to use a hard drive option if available, System 6.0.8 if not.
From mac_flop:
macos3.img = sytem tools.img from sys30.zip
macos608.img = system tools.img from sys608.zip
From mac_hdflop:
macos701 = disk tools.img from sys701.zip
macos75 = SSW750_DiskTools.img from sys75.zip
From mac_hdd:
mac601.chd, mac701.chd, and mac755.chd
lr-minivmac requires MacII.ROM and MacIIx.ROM.
If booting from a hard drive, floppies may not load at boot. For best results, make a copy of one of the bootable drives, load disks manually via the MAME menu, and copy or install them to the hard drive image.
Disk images will only load on Mac IIx and are not bootable.

---
Source: `macintosh.yml`
