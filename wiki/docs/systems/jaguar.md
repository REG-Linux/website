# Jaguar

## Overview

Atari positioned the Jaguar as a “64-bit” home console when it launched in 1993, pairing custom RISC chips (Tom for graphics, Jerry for audio) with a 68000-derived host CPU. Despite the hardware potential, only about 50 commercial cartridges were released before Atari exited the console market; the platform later became a homebrew favorite once Hasbro opened the patents. REG-Linux treats every Jaguar image under the `jaguar` system group so metadata scraping and theming stay in sync across cartridges and CD add-ons.

## Technical specifications

- CPU: Motorola 68000 at 13.295 MHz plus Tom/Jerry RISC chips at 26 MHz
- Memory: 2 MB main RAM, 1 MB ROM space, 512 KB audio/graphics RAM
- Display: Tom GPU outputting 640×480 at 24-bit color (hardware objects)
- Sound: Jerry DSP providing 16-bit stereo audio with DMA CD-quality streaming
- Region: Worldwide (handled per ROM)

## Supported ROM extensions

`.cue`, `.j64`, `.jag`, `.cof`, `.abs`, `.cdi`, `.rom`, `.zip`, `.7z`

## Quick reference

- **ROM folder:** `/userdata/roms/jaguar`
- **Accepted ROM formats:** `.cue`, `.j64`, `.jag`, `.cof`, `.abs`, `.cdi`, `.rom`, `.zip`, `.7z`
- **Emulators:** RetroArch (`libretro: virtualjaguar`), BigPEmu (standalone)
- **System group:** `jaguar`

## BIOS

None of the Jaguar emulators bundled with REG-Linux require a BIOS file.

## ROMs

Store cartridge dumps in `/userdata/roms/jaguar`. BigPEmu and Virtual Jaguar both read the accepted extensions listed above. Jaguar CD images belong in `/userdata/roms/jaguarcd`.

## Saves

Save files are written to `/userdata/saves/jaguar`. Virtual Jaguar generates both cartridge EEPROM and CD-ROM EEPROM files regardless of the media type.

## Emulators

### RetroArch (`libretro: virtualjaguar`)

[Virtual Jaguar](https://icculus.org/virtualjaguar/) is the Jaguar cartridge core under RetroArch. It does not run Jaguar CD content, so follow this flow: use Virtual Jaguar for `.j64`/`.jag` cartridges and launch BigPEmu when you need CD support.

#### libretro: virtualjaguar configuration

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| FAST BLITTER (LESS COMPATIBLE) | `global.usefastblitter` | Enable on weak hardware; some games won’t work when it’s on (`disabled`, `enabled`). |
| SHOW BIOS BOOTLOGO | `global.bios_vj` | Display Jaguar boot animation when enabled (`enabled`, `disabled`). |
| DOOM RES HACK | `global.doom_res_hack` | Use Jaguar-specific resolution hack so *Doom* renders correctly (`disabled`, `enabled`). |

### BigPEmu

BigPEmu, created by [Rich Whitehouse](https://www.richwhitehouse.com/jaguar/), offers the most complete Jaguar coverage and supports both cartridges and Jaguar CD hardware. It ships only on x86_64 REG-Linux builds.

#### Jaguar Game Drive emulation

Some titles require the Jaguar Game Drive (JGD). Within BigPEmu press `[Esc]`, go to **System → Settings → Force JGD Emulation** and turn it on to mimic that accessory.

#### Per-game profiles

Copy `/userdata/saves/bigpemu-bottle/drive_c/users/root/AppData/Roaming/BigPEmu/BigPEmuConfig.bigpcfg`, rename it to match your ROM (e.g., `Tempest2000.bigpcfg`) and place it beside the image so BigPEmu loads custom settings automatically.

## Controls

Jaguar’s oddball controller (numeric keypad + d-pad) maps to the REG-Linux Retropad overlay. Use overlays or controller tattoos to keep the keypad legend visible for keypad-heavy games.

![Jaguar controller overlay](../images/controller-overlays/jaguar.png)
