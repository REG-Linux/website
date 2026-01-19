---
title: Anbernic RG353
description: Some RG353 devices ship with a legacy bootloader we cannot support. You
  WILL need to wipe Android from your device to install REG Linux (see below) Some
  hard...
manufacturer: Anbernic
slug: anbernic/rg353pmvvs
url: https://REG Linux.org/handhelds/anbernic/rg353pmvvs
generated: 2025-11-23 18:01:10.842867
---

# Anbernic RG353

## Important notes
Some RG353 devices ship with a legacy bootloader we cannot support.
You WILL need to wipe Android from your device to install REG Linux (see below)
Some hardware revisions introduced different display panels (v1/v2), both are supported.

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Rockchip RK3566 | ARM Cortex-A55 (Quad-core) @ 1.8 GHz | Mali G52 |

| Display | RAM | eMMC | Connectivity |
| --- | --- | --- | --- |
| 3.5-inch 640*480 | 1 GB (VS/PS), 2 GB (P/M/V) LPDDR4 | 32GB (P/M/V) | 2.4/5 GHz WiFi + BT |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Mainline Linux | Panfrost (GL 3.1/GLES 3.1) | Sway | REG-ES |

## Features

| Feature | Notes |
| --- | --- |
| Storage | REG Linux can be installed to the emmc on P/M/V models or run from an SD Card, and an second SD card can be used to store games |
| Wifi | Can be turned on in REG-ES under Main Menu > Network Settings |
| Bluetooth | Supports bluetooth audio and controllers |
| LED | Supports selecting from a set of colors or turning the power LED off (choice persists through reboots) Does not support other effects. |

## Install REG Linux

### Installation

Download the current RK3566 REG Linux image for this device from the REG Linux download page, then follow the steps in the Installation guide.

### P/M/V Users

You will need to wipe the Android partition to boot into REG Linux.

### WARNING - This will remove Android completely from your device.

- Install ADB on your computer if you don't already have it.
- Intro about ADB (Android Debug Bridge Utility) here : [How to Install and Use ADB, the Android Debug Bridge Utility](https://www.howtogeek.com/125769/how-to-install-and-use-abd-the-android-debug-bridge-utility/)
- From power off and sd ejected, hold down power and volume down to get into Android recovery
- Connect the device to your computer via USB using the "DC" port on the device.
- Switch ADB into root mode using adb root - You may get a timeout error here, continue on anyway.
- If you would like a backup of your Android partition, run adb pull /dev/block/mmcblk0 android.img
- Get an ADB shell with adb shell
- Wipe the Android partition: dd if=/dev/zero of=/dev/block/mmcblk0 bs=4M This will take a few minutes and when it is done you will get an "out of space" message.
- Exit the shell exit
- Insert your REG Linux SD card, and run adb reboot
- You should now be booting REG Linux!

## Additional References