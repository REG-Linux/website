---
title: A95X F3 Air
description: A95X F3 Air pairs the Amlogic S905X3 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# A95X F3 Air

A95X F3 Air pairs the Amlogic S905X3 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: A95X

- **SoC**: Amlogic S905X3

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S905X3 | ARM Cortex-A55 (4-core) | Mali (Panfrost) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest A95X F3 Air build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your A95X F3 Air, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/a95xf3-air/
