---
title: RK3326 clones (including K36 and BatleXP G350)
description: REG Linux on RK3326 clones (including K36 and BatleXP G350) powered by Rockchip RK3326.
manufacturer: Unbranded
slug: unbranded/rk3326-clones
generated: 2026-03-30 23:46:16
---

# RK3326 clones (including K36 and BatleXP G350)


## Hardware & Compatibility

<div data-reg-compat="unbranded-rk3326-clones:specs"></div>
<script src="https://compat.reglinux.org/widget.js"></script>

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
