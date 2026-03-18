---
title: Tronsmart S82
description: Tronsmart S82 pairs the Amlogic S812 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Tronsmart S82

Tronsmart S82 pairs the Amlogic S812 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Tronsmart

- **SoC**: Amlogic S812

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S812 | ARM Cortex-A9 | — |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Mesa3D (Lima) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Tronsmart S82 build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Tronsmart S82, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/tronsmart-s82/
