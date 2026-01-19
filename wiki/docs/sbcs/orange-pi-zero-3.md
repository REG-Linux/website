---
title: Orange Pi Zero 3
description: Orange Pi Zero 3 pairs the Allwinner H618 SoC with the REG Linux stack
  for a polished retro console. pairs the Allwinner H618 SoC with the REG Linux stack
  fo...
---

# Orange Pi Zero 3

Orange Pi Zero 3 pairs the Allwinner H618 SoC with the REG Linux stack for a polished retro console. pairs the Allwinner H618 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Orange Pi

- **SoC**: Allwinner H618

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Orange Pi |

| SoC | Allwinner H618 |

| Image availability | Download the latest build from the REG Linux downloads hub (Orange Pi section). |

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Allwinner H618 | ARM Cortex-A53 (Quad-core) | Mali-G31 MP2 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Panfrost (Mesa) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Orange Pi Zero 3 build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Orange Pi Zero 3, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- Each SoC section lists the supported devices, from Banana Pi M2 Zero, Capcom Home Arcade, and Orange Pi One/PC/Plus boards to the Zero, 3, and M4 family.

- H700 handhelds (Anbernic RG35xx, RG40xx, RG34xx, RG28xx, RGCube) currently require you to flash and then manually edit the DTB because device detection is not yet available.

- Keep this wiki page in sync with the repo so contributors can quickly locate the proper Allwinner board tree.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/orange-pi-zero-3/

- Official REG Linux board page: https://reglinux.org/board/orange-pi-zero-3
