---
title: Nintendo Nes Classic
description: REG Linux on Nintendo Nes Classic powered by Allwinner R16.
manufacturer: Nintendo
slug: unbranded/nes-classic
generated: 2026-11-23 16:44:01
---

# Nintendo Nes Classic


## Hardware & Compatibility

<div data-reg-compat="nintendo-nes-classic:specs"></div>
<script src="https://compat.reglinux.org/widget.js"></script>

## Install REG Linux

1. Download the image for this device, a `reglinux-<target>-<board>-<version>.img.gz`
   file, from the [download page](https://reglinux.org/download/). REG Linux is in
   pre-release: images are not published for every device yet.
2. Write the image to a microSD card with balenaEtcher or Raspberry Pi Imager, or from
   a Linux shell: check with `lsblk` which device is the card, then
   `gunzip -c reglinux-*.img.gz | sudo dd of=/dev/sdX bs=4M conv=fsync`.
   Writing the image erases the card.
3. Insert the card and power the device on. On the first boot REG Linux grows its data
   partition to the size of the card, then reboots once.

REG Linux runs from the card and leaves the device's internal storage alone.

## Files and settings

The card has two partitions:

| Partition | Format | Contents |
|---|---|---|
| `REGLINUX` | FAT | boot files and `system-boot.conf` |
| `SHARE` | ext4, mounted at `/userdata` | games in `/userdata/roms/<system>/`, BIOS files in `/userdata/bios/`, settings in `/userdata/system/system.conf` |

The `SHARE` partition is also reachable over the network through Samba when the
service is enabled.

## Notes

- Starts REG Linux from a **USB stick**, through the `reglinux-usb.hmod` module installed with [hakchi2-CE](https://github.com/TeamShinkansen/Hakchi2-CE). The console's own storage and bootloader are not replaced.
- Needs a USB OTG Y-cable with its own power supply for the stick.
- To start the original console menu again: create `/var/lib/reglinux-usb/disable` on the console, or uninstall the module in hakchi2-CE.
- See [Install: NES Classic / SNES Classic](../../installation.md#nes-classic-snes-classic).
