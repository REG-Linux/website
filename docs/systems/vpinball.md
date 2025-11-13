# Visual Pinball X

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/vpinball.webp" alt="vpinball icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/vpinball.png" alt="vpinball logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Metadata

- Manufacturer: Randy Davis
- Release Year: 2000
- Hardware: pinball

## Supported ROM extensions

vpx

## Emulators

- **vpinball** (vpinball) – Requires BR2_PACKAGE_VPINBALL

## Notes

Visual Pinball X - Standalone
-----------------------------

The current version of Visual Pinball supports version 10 (.vpx extension) tables.
Community based tables for can be downloaded from https://www.vpforums.org

PinMAME
-------

To use PinMAME roms, you need to add roms and / or nvram files into their respective folders at:
/userdata/system/configs/vpinball/pinmame. Note: If a PinMAME folder exists in the same directory as your vpx
file, it will be used instead.

All Paths
---------

Your .vpx & and any associated .directb2s, .vbs, or .ini files should be in the: /userdata/roms/vpinball folder.
Any associated .UltraDMD folders should also be in the vpinball roms folders.
Note: .directb2s files should match the .vpx file name.


/userdata/system/configs/vpinball:                  VPinball configuration & log files
/userdata/system/configs/vpinball/user:             VPinball user directory
/userdata/system/configs/vpinball/pinmame:          VPinball generated PinMAME settings, ex. sound, cheat, dmd_red
/userdata/system/configs/vpinball/pinmame/roms:     PinMAME ROMs directory
/userdata/system/configs/vpinball/pinmame/nvram:    PinMAME NVRAM directory
/userdata/system/configs/vpinball/pinmame/altcolor: Serum colorizations directory <rom_name>/<rom.cRZ>
/userdata/system/configs/vpinball/pinmame/altsound: AltSound directory <rom_name>/
/userdata/system/configs/vpinball/pinmame/ini:      VPinball PinMAME settings directory

Music
-----
/userdata/system/configs/vpinball/music:            VPinball music directory, put your music here.
or in the same folder as your vpx file in it's own 'music' folder.
The music folder, should be lowercase - i.e. /userdata/roms/vpinball/Kiss/music

---
Source: `vpinball.yml`
