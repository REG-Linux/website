# ScummVM

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/scummvm.webp" alt="ScummVM icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/scummvm.png" alt="ScummVM logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

ScummVM is an open-source interpreter that lets you run classic adventure and similar narrative games using their original data files. It replaces the proprietary engines (SCUMM, Sierra SCI, etc.) with modern reimplementations, so REG Linux can boot those titles on contemporary hardware without the original runtime while preserving save/load, scripting, audio, and translation compatibility. The project also bundles a launcher, controller support, and options to mix subtitles, custom graphics, and output scaling.

## Supported ROM extensions

scummvm, zar

## Supported games

These engines cover the bulk of the famous adventure catalogues:

* `The Secret of Monkey Island`
* `Monkey Island 2: LeChuck's Revenge`
* `Day of the Tentacle`
* `Grim Fandango`
* `Broken Sword: The Shadow of the Templars`
* `Beneath a Steel Sky`
* `King's Quest` (SCI1-3)
* `Space Quest` (SCI1-3)
* `Quest for Glory` (SCI1-4)
* `Sam & Max Hit the Road`

The official compatibility list at [scummvm.org/compatibility](https://www.scummvm.org/compatibility/) includes hundreds of titles beyond those highlighted here.

## Supported engines

- SCUMM (LucasArts, Humongous Entertainment)
- SCI (Sierra Creative Interpreter)
- AGI (Sierra AGI engine)
- Wintermute
- GrimE
- Viscape (KiriKiri)
- Broken Sword's own interpreter (Virtual Theatre)
- Many others such as Gemini, Legend, and QSP engines are supported through plugins and community modules.

## Emulators

- **scummvm** (libretro) – Requires BR2_PACKAGE_LIBRETRO_SCUMM, BR2_PACKAGE_HAS_LIBRETRO_SCUMMVM
- **scummvm** (scummvm) – Requires BR2_PACKAGE_SCUMMVM, BR2_PACKAGE_HAS_SCUMMVM

## Notes

Put scummvm games in this folder.

For each game, you must create a file named from the short name of the game and with the extension ".scummvm"

Short game names can be found at http://scummvm.org/compatibility/
For example, for "Broken Sword" create the file "Broken Sword/sword1.scummvm"

If you wish to use Midi ROM's i.e. the MT-32 synth, put you files in /userdata/bios/scummvm/extra


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
