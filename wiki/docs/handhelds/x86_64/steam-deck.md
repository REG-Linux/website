---
title: Steam Deck
description: REG Linux on Steam Deck powered by AMD Zen 2 APU.
manufacturer: Valve
slug: x86_64/steam-deck
generated: 2026-11-01 16:45:33
---

# Steam Deck


## Hardware & Compatibility

<div data-reg-compat="steam-deck:specs"></div>
<script src="https://compat.reglinux.org/widget.js"></script>

## Install REG Linux

!!! note
    This is an x86_64 device: write the image to a USB stick or microSD card and pick it from the firmware boot menu.

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

No device-specific notes yet.
