# Model 3

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/model3.webp" alt="Model 3 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/model3.png" alt="Model 3 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1996 by Sega, the Model 3 was a arcade system. Its platform tag is `model3, arcade` for proper filtering.

## Technical specifications

- CPU: Multi-processor Sega Model 3 setup using a PowerPC 603/604 main CPU with Hitachi SH-2 helper chips (Step 1) and a Hitachi SH-4 RISC core (Step 2) for 3D geometry.
- Memory: Custom board carries 32 MB of main DRAM with dedicated buffers for texture and polygon storage plus extra RAM for the geometry pipeline.
- Display: Sega CG Board capable of ~180,000 texture-mapped polygons per second with lighting and perspective correction, made for 640×480+ raster output.
- Sound: CD-quality PCM audio with multiple simultaneous streams and hardware mixing plus Yamaha/QSound-style spatial effects.

## Supported ROM extensions

zip

## Emulators

- **supermodel** (supermodel)

## Notes

## SEGA MODEL 3 IMPORTANT INFO ##

Put your model3 roms in this directory.

Rom files must have a ".zip" extension from the latest MAME ROM set (currently 0.245).

Files inside the .zip must match the board rom & CRC info expected of the emulator or they will not work.
Each .zip file must contain only one compressed rom and be named correctly for compatibility.
Specific rom details can be found in the emulators games.xml file.

Note: The Raspberry Pi4 is limited to 720x576 or 720x480 with decorations & hud disabled.

Game Compatibility:
-------------------

Game compatibility can be found here - https://www.supermodel3.com/About.html

The Configuration File:
-----------------------

The configuration file, Supermodel.ini, located in the Config folder (/system/configs/supermodel/), which stores input settings as well as most of what can be set on the command line.

Audio:
------

Sound and music volume can be adjusted during run-time using the F9-F12 keys.
Volume settings can be specified in the configuration file as well, globally for all games or tailored on a game-by-game basis.

Save States And Non-Volatile Memory:
------------------------------------

Save states are fully supported. Up to 10 different slots can be selected with keyboard - F6. To save and restore states, press F5 and F7.
State files are saved in the Saves folder (/saves/supermodel/), which must exist in order for save operations to succeed.
Non-volatile memory (NVRAM) consists of battery-backed backup RAM (typically used for high score data) and an EEPROM (machine settings).
It is saved to the NVRAM folder (/system/configs/supermodel/NVRAM/) each time Supermodel exits and is re-loaded at start-up.
Save states will also save and overwrite NVRAM data.
If you alter any machine settings, loading an earlier state will return them to their former configuration.
Be sure to save these files for future use.

Emulation Exit
--------------

Configuration is set as Select & Start controller buttons.

Troubleshooting:
----------------

See the Supermodel FAQ here - https://www.supermodel3.com/FAQ.html

---