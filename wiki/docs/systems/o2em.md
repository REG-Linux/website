---
title: Odyssey2
description: "The Magnavox Odyssey\xB2 hit shelves in 1978 as Philips/Magnavox\u2019\
  s programmable follow-up to the original Odyssey. That second-generation console\
  \ introduced car..."
---

# Odyssey2

## Overview

The Magnavox Odyssey² hit shelves in 1978 as Philips/Magnavox’s programmable follow-up to the original Odyssey. That second-generation console introduced cartridge-based logic together with optional peripheral expansions, and REG-Linux keeps the collection under the `odyssey2` platform tag so themes/metadata match their counterparts.

### Quick reference

- **ROM folder:** `/userdata/roms/o2em`
- **Accepted formats:** `.bin`, `.zip`, `.7z`
- **Emulator:** `libretro: O2EM` via RetroArch
- **System group:** `odyssey2`

## Technical specifications

- CPU: Intel 8048 microcontroller clocked at 1.79 MHz with embedded ROM that drives the system logic.
- Memory: 64 bytes of scratchpad RAM plus cartridge RAM for sprites and extra data.
- Display: 160×200 fixed resolution with a 16-color palette and hardware sprites defined per character block.
- Sound: Single-channel tone generator with noise modes and external volume control.

## BIOS

Several Odyssey² and Videopac+ sets rely on the proper BIOS binaries. Store the files in `/userdata/bios/` using the following filenames so the emulator autodetects which hardware variant to emulate:

| MD5 checksum                       | File name     | Description                                |
|------------------------------------|---------------|--------------------------------------------|
| `562d5ebf9e030a40d6fabfc2f33139fd` | `o2rom.bin`   | Odyssey² / G7000 BIOS                       |
| `f1071cdb0b6b10dde94d3bc8a6146387` | `c52.bin`     | Videopac+ French BIOS for G7000 systems     |
| `c500ff71236068e0dc0d0603d265ae76` | `g7400.bin`   | Videopac+ European BIOS for G7400 hardware  |
| `279008e4a0db2dc5f1c048853b033828` | `jopac.bin`   | Videopac+ French BIOS for G7400 hardware    |

## ROMs

- Odyssey² cartridges go under `/userdata/roms/o2em`.
- Videopac+ titles live in `/userdata/roms/videopacplus`; leave them there so titles load with the expanded BIOS enabled.

Keep archives zipped unless the emulator refuses to start them, and keep each package organized by game name for easy management.

## Emulators

### RetroArch

RetroArch is the frontend used to launch `libretro: O2EM`. It shares the usual options (`odyssey2.videomode`, `odyssey2.ratio`, `odyssey2.smooth`, `odyssey2.shaders`, `odyssey2.pixel_perfect`, `odyssey2.decoration`, `odyssey2.game_translation`) and exposes `[HOTKEY]` + south face button for the Quick Menu so you can tweak overrides on the fly.

Standard EmulationStation settings let you choose the graphics backend (`odyssey2.gfxbackend`), raise audio latency (`odyssey2.audio_latency`), or toggle threaded video rendering (`odyssey2.video_threaded`).

### libretro: O2EM

O2EM is the modern libretro port of the open-source Odyssey² emulator. It offers:

- `global.o2em_bios`: pick the matching BIOS file for Odyssey² vs Videopac+ hardware.
- `global.o2em_region`: force NTSC/PAL or autodetect.
- `global.o2em_swap_gamepads`: remedy titles that read the wrong controller port.
- `global.o2em_crop_overscan`: trim the universal border.
- `global.o2em_mix_frames`: simulate phosphor ghosting on CRT-like displays.
- `global.o2em_low_pass_range`: tame the raw tone generator using a low-pass filter.

## Videopac+ G7400

Videopac+ (G7400) is Philips’ enhanced release that boots most Odyssey² cartridges and improves sprites/audio. A few notes:

- Leave `videopacplus` ROMs in `/userdata/roms/videopacplus` so the system can pick the `videopacplus` metadata set.
- Flip the **MODEL** option inside the Advanced System Settings if you have mixed hardware, or keep the cartridges in the default folder and let the BIOS auto-switch.
- Voice synthesis packs (see below) are shared between Odyssey² and Videopac+ games when running the same core.

## Voice samples

REG-Linux added support for the voice samples that O2EM can play. Download the packs from [http://o2em.sourceforge.net/](http://o2em.sourceforge.net/) and extract them to `/userdata/bios/voice`. Use the `Sid the Spellbinder` archive when playing that specific cartridge, as it needs a custom sample set.

## Controls

The system emulates the single-button joystick plus built-in keyboard. The RetroPad maps the joystick axes, primary button, and keyboard letters; see the REG-Linux controller overlay for details. If a game swaps player inputs, flip the player sides in the core options or save a custom remap (`/remapping_controls_per_emulator`).

## Troubleshooting

- If the wrong region boots, double-check the BIOS file used under `global.o2em_bios`.
- When samples do not play, ensure the `voice` folder mirrors the O2EM download structure.
- For overall issues, consult the generic support pages.
