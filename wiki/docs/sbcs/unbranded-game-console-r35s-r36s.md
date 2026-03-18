---
title: Game Console R35S R36S
description: Game Console R35S R36S pairs the Rockchip RK3326 SoC with the REG Linux stack for a polished retro console.
generated: 2026-03-18 12:01:02
---

# Game Console R35S R36S

Game Console R35S R36S pairs the Rockchip RK3326 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Unbranded

- **SoC**: Rockchip RK3326

- Maintained on the REG Linux download channel

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Rockchip RK3326 | ARM Cortex-A35 | Mali (Panfrost) |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | — | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Game Console R35S R36S build from the downloads page.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or eMMC. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Game Console R35S R36S, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

## Resources

- REG Linux download page: https://reglinux.org/download/unbranded-game-console-r35s-r36s/
