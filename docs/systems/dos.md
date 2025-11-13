# Dos (x86)

## Metadata

- Manufacturer: Microsoft
- Release Year: 1981
- Hardware: computer
- Platform tag: pc

## Supported ROM extensions

pc, dos, zip, zar, dosz, m3u, iso, cue

## Emulators

- **dosbox_staging** (dosbox_staging) – Requires BR2_PACKAGE_DOSBOX_STAGING | Incompatible extensions: zip
- **dosbox-x** (dosboxx) – Requires BR2_PACKAGE_DOSBOX_X | Incompatible extensions: zip
- **dosbox_pure** (libretro) – Requires BR2_PACKAGE_LIBRETRO_DOSBOX_PURE

## Notes

Each game (files) must be placed in its own directory having the ".pc .dos" extension.
In each directory, a dosbox.bat file must contain the command line for launching the game.

For example:
miniputt.pc/
miniputt.pc/dosbox.bat
miniputt.pc/MP.DAT
miniputt.pc/MP.EXE

Where dosbox.bat contains: MP.EXE

With pure-dosbox you can also use zip files.

To quit a game, press CTRL + F9.

MIDI:

SoundFonts (.sf2) files need to be placed in the /userdata/bios folder.
MT32_CONTROL.ROM file needs to be present inside /userdata/bios/scummvm/extra.

For more info: https://wiki.batocera.org/systems:dos

---
Source: `dos.yml`
