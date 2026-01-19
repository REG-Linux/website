---
title: RGB10 Max 3 Pro
manufacturer: Powkiddy
slug: powkiddy/rgb10-max-3-pro
url: https://REG Linux.org/handhelds/powkiddy/rgb10-max-3-pro
generated: 2025-11-23T18:01:10.842867
---

# RGB10 Max 3 Pro


## Software

| Device | CPU / Architecture | Kernel | GL driver | Interface |
| --- | --- | --- | --- | --- |
| RGB10 Max 3 Pro | Amlogic A311D / Mali G52 M4 (ARMv8-A) | Mainline Linux | Mali | Weston + REG-ES |

## Features

| Feature | Notes |
| --- | --- |
| Storage | REG Linux should be installed directly to the internal eMMC. When installed directly to the eMMC; an SD Card can be used for game storage. |

## Install REG Linux

### Installation

Download the latest S922X version of REG Linux from the button below.

To install REG Linux to the eMMC, you need to boot the device into recovery mode. There are 2 ways to do this:

- Hardkernel Recovery SD Download this recovery image . Flash the image to a spare microSD card using Balena Etcher or similar. Remove the back cover of the device (four screws). Locate a small button on the back of the board (the side that's visible), near the right thumbstick. While holding down the small button, power on the device. [this recovery image](https://wiki.odroid.com/odroid_go_ultra/os_image/recovery)

The device should now be in recovery mode, ready to flash REG Linux (or other firmware) to the device.

If you find yourself doing this often, consider drilling a pinhole in the back cover so that the button can be accessed with a paperclip.

- REG Linux Recovery hold Volume Down while the device boots.

Once booted into recovery mode and connected to a PC via USB-C, the REG Linux image may be flashed to the eMMC using Balena Etcher, win32diskimager, dd or similar.

Once the REG Linux image has been flashed to the the eMMC, restart the device and REG Linux will go through its first boot process (running from eMMC).

## Additional References

- Odroid Go Ultra wiki [Odroid Go Ultra wiki](https://wiki.odroid.com/odroid_go_ultra/odroid_go_ultra)
