---
title: X96 Mate
description: X96 Mate pairs the Allwinner H616 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# X96 Mate

X96 Mate pairs the Allwinner H616 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: X96

- **SoC**: Allwinner H616

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Allwinner H616 | ARM Cortex-A53 (4-core) | Mali-G31 MP2 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Mesa3D (Panfrost) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest X96 Mate build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your X96 Mate, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/x96-mate/
