---
title: HardKernel ODROID C5
description: HardKernel ODROID C5 pairs the Amlogic S905X5M SoC with the REG Linux
  stack for a polished retro console.
---

# HardKernel ODROID C5

HardKernel ODROID C5 pairs the Amlogic S905X5M SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: HardKernel

- **SoC**: Amlogic S905X5M

- **Status**: OK

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | HardKernel |

| SoC | Amlogic S905X5M |

| Image availability | Download the latest build from the REG Linux downloads hub (HardKernel section). |

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Amlogic S905X5M | ARM Cortex-A55 (Quad-core) | Mali-G310 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Panfrost (Mesa) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest HardKernel ODROID C5 build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your ODROID C5, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- Amlogic boards rely on the correct DTB and boot scripts, so always use the S905X5M-specific build for the C5.

- Generic TV-box images usually need DTB or boot-script adjustments; stick to the HardKernel-targeted image for best results.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/
