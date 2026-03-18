---
title: HardKernel ODROID GO Ultra
description: HardKernel ODROID GO Ultra pairs the Amlogic S922X SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# HardKernel ODROID GO Ultra

HardKernel ODROID GO Ultra pairs the Amlogic S922X SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: HardKernel

- **SoC**: Amlogic S922X

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S922X | ARM Cortex-A73/A53 | Mali (Panfrost) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest HardKernel ODROID GO Ultra build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your HardKernel ODROID GO Ultra, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/hardkernel-odroid-go-ultra/
