# Dos (x86)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/dos.webp" alt="Dos (x86) icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/dos.png" alt="Dos (x86) logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1981 by Microsoft, the Dos (x86) was a computer system. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Microsoft
- Release year: 1981
- Hardware type: computer
- Platform tag: pc

## Supported ROM extensions

pc, dos, zip, zar, dosz, m3u, iso, cue

## Emulators

- **dosbox_staging** (dosbox_staging)
- **dosbox-x** (dosboxx)
- **dosbox_pure** (libretro)

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


---