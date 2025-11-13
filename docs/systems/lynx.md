# Atari Lynx

## Overview

Introduced in 1989 by Atari, the Atari Lynx was a portable system. Its platform tag is `atarilynx` for proper filtering.

## Technical specifications

- CPU: Suwa Seikosha 65C02-based custom chip running at 16 MHz, supplemented with custom GPU hardware.
- Memory: 64 KB RAM and 64 KB ROM built into the cartridges with support for bank switching.
- Display: 160×102 active area (160×102) color LCD with 4,096 colors and hardware scaling/rotation built into the custom Lynx chips.
- Sound: 4-channel 8-bit DAC with stereo sample playback and hardware mixing.

## Supported ROM extensions

lnx, lyx, o, zip, 7z

## Emulators

- **handy** (libretro) – Requires BR2_PACKAGE_LIBRETRO_HANDY
- **mednafen_lynx** (libretro) – Requires BR2_PACKAGE_LIBRETRO_BEETLE_LYNX
- **mednafen** (mednafen) – Requires BR2_PACKAGE_MEDNAFEN

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
