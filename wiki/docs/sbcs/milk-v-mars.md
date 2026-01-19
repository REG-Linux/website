---
title: Milk-V Mars
description: Milk-V Mars pairs the StarFive JH7110 SoC with the REG Linux stack for
  a polished retro console. pairs the StarFive JH7110 SoC with the REG Linux stack
  for a...
---

# Milk-V Mars

Milk-V Mars pairs the StarFive JH7110 SoC with the REG Linux stack for a polished retro console. pairs the StarFive JH7110 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Milk-V

- **SoC**: StarFive JH7110

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Milk-V |

| SoC | StarFive JH7110 |

| Image availability | Download the latest build from the REG Linux downloads hub (Milk-V section). |

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| StarFive JH7110 | SiFive U74 (Quad-core) | Imagination BXE-4-32 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | PowerVR (Mesa) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Milk-V Mars build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Milk-V Mars, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Resources

- REG Linux download page: https://reglinux.org/download/milk-v-mars/

- Official REG Linux board page: https://reglinux.org/board/milk-v-mars
