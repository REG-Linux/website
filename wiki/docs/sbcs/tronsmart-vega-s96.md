---
title: Unknown Vega S96
description: Unknown Vega S96 pairs the Amlogic S912 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Unknown Vega S96

Unknown Vega S96 pairs the Amlogic S912 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Unknown

- **SoC**: Amlogic S912

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S912 | ARM Cortex-A53 | Mali (Panfrost) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Unknown Vega S96 build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Unknown Vega S96, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/tronsmart-vega-s96/
