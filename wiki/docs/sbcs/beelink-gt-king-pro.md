---
title: Beelink GT King Pro
description: Beelink GT King Pro pairs the Amlogic S922X-H SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Beelink GT King Pro

Beelink GT King Pro pairs the Amlogic S922X-H SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Beelink

- **SoC**: Amlogic S922X-H

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S922X-H | ARM Cortex-A73/A53 | Mali (Panfrost) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Beelink GT King Pro build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Beelink GT King Pro, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/beelink-gt-king-pro/
