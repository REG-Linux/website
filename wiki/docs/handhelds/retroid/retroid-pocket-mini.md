---
title: Retroid Pocket Mini
manufacturer: Retroid
slug: retroid/retroid-pocket-mini
url: https://REG Linux.org/handhelds/retroid/retroid-pocket-mini
generated: 2025-11-23T18:01:10.842867
---

# Retroid Pocket Mini


## Software

| Device | CPU / Architecture | Kernel | GL driver | Vulkan driver | Interface |
| --- | --- | --- | --- | --- | --- |
| Retroid Pocket Mini | Qualcomm SD865 (SM8250) | Mainline Linux | Freedreno | Turnip | Sway + REG-ES |

## Features

| Feature | Notes |
| --- | --- |
| Wifi | Can be turned on in REG-ES under Main Menu > Network Settings |
| Bluetooth | Supports bluetooth audio and controllers |
| Fan | Can be set globally, per system or per game. |
| Joystick LEDS | Supports selecting from a set of colors, battery level status, or turning the joystick LEDS off. |
| Rumble | Can be turned on or off in REG-ES under Controller & Bluetooth Settings > Enable Rumble |

## Additional References


### Retroid Pocket Mini V2

Retroid's Android OTA for the Pocket Mini V2 Breaks Bootloader Visibility The latest OTA update from Retroid for the Pocket Mini V2 includes a faulty bootloader. 
As a result, the GRUB boot selection screen is no longer visible at startup. This may result in you booting with the wrong device selection. If your screen
looks like the following then follow the steps below. How to Fix It  You’ll need to manually reflash the loader partition using fastboot . Step 1: Download and extract Android SDK Platform Tools  SDK Platform Tools Step 2: Download the Fixed Bootloader to the SDK Platform Tools folder  Download u-boot-sm8250-retroidpocket-rpminiv2.img Step 3: Enter ABL / Fastboot mode  Hold Volume Down while powering on the device. Step 4: Flash the Loader Partition  Open a cmd prompt and cd to the directory you extracted the Android SDK platform tools,
and type the following command. fastboot flash loader u-boot-sm8250-retroidpocket-rpminiv2.img Step 5: Boot up and select "Retroid Pocket Mini V2" from the GRUB screen.
