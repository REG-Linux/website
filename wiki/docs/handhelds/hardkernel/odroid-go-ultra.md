---
title: Odroid Go Ultra
description: '| Device | CPU / Architecture | Kernel | GL driver | Interface | | ---
  | --- | --- | --- | --- | | Odroid Go Ultra | Amlogic S922X / Mali G52 M6 (ARMv8-A)
  |...'
manufacturer: Hardkernel
slug: hardkernel/odroid-go-ultra
url: https://REG Linux.org/handhelds/hardkernel/odroid-go-ultra
generated: 2025-11-23 18:01:10.842867
---

# Odroid Go Ultra


## Software

| Device | CPU / Architecture | Kernel | GL driver | Interface |
| --- | --- | --- | --- | --- |
| Odroid Go Ultra | Amlogic S922X / Mali G52 M6 (ARMv8-A) | Mainline Linux | Mali | Weston + REG-ES |

## Features

| Feature | Notes |
| --- | --- |
| Storage | REG Linux should be installed directly to the internal eMMC. A microSD Card can be used for game storage. |

## Install REG Linux

### Installation

First download the latest S922X version of REG Linux from the button below.

To install REG Linux to the eMMC, you need to boot the device into recovery mode. There are 2 ways to do this:

- Hardkernel Recovery SD Download this recovery image . Follow the recovery steps on the Odroid wiki . [this recovery image](https://wiki.odroid.com/odroid_go_ultra/os_image/recovery) [the Odroid wiki](https://wiki.odroid.com/odroid_go_ultra/getting_started/recovery_eMMC)
- REG Linux Recovery hold Volume Down while the device boots.

Once booted into recovery mode and connected to a PC via USB-C, the REG Linux image may be flashed to the eMMC using Balena Etcher, win32diskimager, dd or similar.

Once the REG Linux image has been flashed to the the eMMC, restart the device and REG Linux will go through its first boot process (running from eMMC).

## Additional References

- Odroid Go Ultra wiki [Odroid Go Ultra wiki](https://wiki.odroid.com/odroid_go_ultra/odroid_go_ultra)