# Jaguar CD

## Overview

The Atari Jaguar CD is a CD-ROM add-on for the Atari Jaguar and shares the `jaguar` system group so metadata scraping and themes remain consistent with cartridge titles. Only a handful of official Jaguar CD products exist, yet homebrew and unfinished projects continue to surface.

## Quick reference

- **ROM folder:** `/userdata/roms/jaguarcd`
- **Accepted ROM formats:** `.cue`, `.cdi`, `.bigpimg` (BigPEmu only)
- **Emulators:** RetroArch (`libretro: virtualjaguar` for cartridges, though it does not support CD content), BigPEmu (standalone)
- **System group:** `jaguar`

## BIOS

No Jaguar CD emulator in REG-Linux requires a separate BIOS file.

## ROMs

Place Jaguar CD images in `/userdata/roms/jaguarcd` using one of the supported extensions. The BigPEmu `.bigpimg` format is preprocessed for that emulator and should sit next to its corresponding metadata.

## Saves

Jaguar CD saves live under `/userdata/saves/jaguarcd` so each title can store its EEPROM/flash data separately.

## Emulators

### RetroArch

RetroArch provides `libretro: virtualjaguar`, but that core only handles cartridge images. It appears in the Jaguar CD documentation for completeness; use Virtual Jaguar for `.j64`/`.jag` content and switch to BigPEmu for CDs.

### BigPEmu

[BigPEmu](#bigpemu) emulates both Jaguar cartridges and Jaguar CD hardware and is the only option on REG-Linux that truly supports CD titles. It runs on x86_64 builds only.

#### Jaguar Game Drive emulation

Some CDs rely on the Jaguar Game Drive (JGD) hardware. Enable the emulated JGD inside BigPEmu by pressing `[Esc]`, navigating to **System → Settings → Force JGD Emulation** and turning the option on.

#### Per-game profiles

BigPEmu uses `.bigpcfg` files to store per-game tweaks. Copy the template config from
`/userdata/saves/bigpemu-bottle/drive_c/users/root/AppData/Roaming/BigPEmu/BigPEmuConfig.bigpcfg`
and rename it to match your CD image (e.g., `RiseOfTheRobot.bigpcfg`), then place it next to the ROM so BigPEmu loads those values automatically.

## Controls

Jaguar CD titles rely on the same Jaguar controller overlay as cartridge games. Use the REG-Linux Retropad layout or adjust mappings through the emulator menus.

![Jaguar controller overlay](../images/controller-overlays/jaguar.png)
