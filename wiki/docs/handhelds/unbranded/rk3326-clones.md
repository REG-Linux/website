---
title: RK3326 clones (including K36 and BatleXP G350)
description: REG Linux partially supports various RK3326 clones and knock-offs known
  as R36 / R36S / K36. We also partially support the BatleXP G350 which is similar
  but...
manufacturer: Unbranded
slug: unbranded/rk3326-clones
url: https://REG Linux.org/handhelds/unbranded/rk3326-clones
generated: 2025-11-25 18:01:10.842867
---

# K36 / BatleXP G350 and other RK3326 clones


REG Linux partially supports various RK3326 clones and knock-offs known as R36 / R36S / K36.
We also partially support the BatleXP G350 which is similar but with way higher quality build.

## About the family

These are mostly similar but subtely different devices.
K36 and BatleXP G350 are the most interesting due to consistent build quality.

To deal with the variety, hardware configuration is partially imported from stock dtb file.
This doesn't yield to a perfect result and sometimes needs extra tweaks, but usually works.

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Rockchip RK3326 | ARM Cortex-A35 (Quad-core) @ 1.3 GHz | Mali G31 |

| Display | RAM | eMMC | Connectivity |
| --- | --- | --- | --- |
| 4.0-inch 720x720, 3.5-inch 640x480 and others | usually 1 GB DDR3, sometimes 512M | 8 GB (often) | rk915 2.4G WiFi (sometimes) |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Mainline Linux | Panfrost (GL 3.1/GLES 3.1) | Sway | REG-ES |

## Emulators


## Install REG Linux

### Installation

- Flash image to SD
- If your device has a stock firmware on SD, move that card to SD2 (GAME) slot
- Insert REG Linux SD to SD1 (OS) slot (or the only slot for some devices with SDIO WiFi)
- Power on your device with charger unplugged. Wait till it reboots several times (about 5 minutes)
- Should be working!

### In case of issues with display/sound/etc.

- While device is off, connect it to your PC with a USB cable (use "OTG" port as we need data transfer)
- Hold Vol- while booting, your device should enter recovery mode, and all storage should appear as USB drives to your PC
- from REG Linux partition take stock directory and save it somewhere ( you may suddenly need it later in case of broken stock SD or wiped EMMC )
- there is a stock whatever.dtb file in stock dir. Upload it to DTBO generator and experiment with options [DTBO generator](https://REG Linux.gosk.in/dtbo/)
- put the mipi-panel.dtbo you get from the service to overlays folder
- safely remove all the drives and boot your device with updated dtbo to see if the issue is fixed

### Do NOT flash to eMMC

We strongly discourage anyone to flash eMMC on those devices.
Your mileage will vary, eMMC could be very slow, and flashing could brick your device.
Running from a good SD card may be faster and way safer.