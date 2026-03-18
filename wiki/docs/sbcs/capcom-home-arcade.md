---
title: Capcom Home Arcade
description: Capcom Home Arcade pairs the Allwinner H3 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Capcom Home Arcade

Capcom Home Arcade pairs the Allwinner H3 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Koch Media

- **SoC**: Allwinner H3

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Allwinner H3 | ARM Cortex-A7 (4-core) | Mali-400 MP2 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Mesa3D (Lima) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Capcom Home Arcade build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Capcom Home Arcade, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/capcom-home-arcade/
