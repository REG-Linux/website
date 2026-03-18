---
title: Nexbox A95X
description: Nexbox A95X pairs the Amlogic S905(X) SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Nexbox A95X

Nexbox A95X pairs the Amlogic S905(X) SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Nexbox

- **SoC**: Amlogic S905(X)

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S905(X) | ARM Cortex-A53 (4-core) | Mali (Lima) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Nexbox A95X build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Nexbox A95X, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/nexbox-a95x/
