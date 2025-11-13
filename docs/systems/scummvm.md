# ScummVM

## Metadata

- Manufacturer: LucasArts
- Release Year: 1987
- Hardware: computer
- Platform tag: scummvm

## Supported ROM extensions

scummvm, zar

## Emulators

- **scummvm** (libretro) – Requires BR2_PACKAGE_LIBRETRO_SCUMM, BR2_PACKAGE_HAS_LIBRETRO_SCUMMVM
- **scummvm** (scummvm) – Requires BR2_PACKAGE_SCUMMVM, BR2_PACKAGE_HAS_SCUMMVM

## Notes

Put scummvm games in this folder.

For each game, you must create a file named from the short name of the game and with the extension ".scummvm"

Short game names can be found at http://scummvm.org/compatibility/
For example, for "Broken Sword" create the file "Broken Sword/sword1.scummvm"

If you wish to use Midi ROM's i.e. the MT-32 synth, put you files in /userdata/bios/scummvm/extra

For more info: https://wiki.batocera.org/systems:scummvm

---
Source: `scummvm.yml`
