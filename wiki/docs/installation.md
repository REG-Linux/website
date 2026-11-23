---
title: Install REG Linux
description: Download the image for your device, write it to a microSD card, and boot. Per-family notes for handhelds, H700, A133, T527, RK3128, RK3288, the NES/SNES Classic and PCs.
---

# Install REG Linux

REG Linux runs from a microSD card (a USB stick on PCs and on the NES/SNES
Classic). It does not write to your device's internal storage: take the card out
and the device starts its original system again.

## 1. Download the image

Find your device in [Devices](devices/index.md) and download its image from the
[download page](https://reglinux.org/download/). Images are named:

```
reglinux-<target>-<board>-<version>-<date>.img.gz
```

for example `reglinux-a33-miyoo-a30-26.12-20261201.img.gz`. Every image comes
with a `.sha256` file to check the download.

## 2. Write it to a card

- **Any system:** balenaEtcher or Raspberry Pi Imager can write the `.img.gz`
  directly.
- **Linux shell:** find the card with `lsblk`, then
  `gunzip -c reglinux-*.img.gz | sudo dd of=/dev/sdX bs=4M conv=fsync`
  (replace `sdX` with the card, not your disk).

Writing the image erases the card. Games go on the same card, so pick one
large enough for your library.

## 3. First boot

Insert the card and power on. The first start installs the system and grows the
data partition to the size of the card, then the device **reboots once by
itself**. The second start extracts the default files, then REG Station
appears. See [First boot](start-here/first-boot.md).

## Notes by device family

Most devices need nothing more than the three steps above. The exceptions:

### Anbernic H700 (RG35XX, RG40XX, RG34XX, RG28XX, RG CubeXX)

One H700 image serves all these models. It starts with the **RG35XX Plus**
device file. On another model, before the first boot, open the card's
`REGLINUX` partition on your computer, edit `extlinux/extlinux.conf`, and change
the file name on the `FDT /boot/...dtb` line to your model's:

| Model | File after `FDT /boot/` |
|---|---|
| RG35XX Plus | `sun50i-h700-anbernic-rg35xx-plus.dtb` (default) |
| RG35XX Plus, Rev6 screen | `sun50i-h700-anbernic-rg35xx-plus-rev6-panel.dtb` |
| RG35XX 2024 | `sun50i-h700-anbernic-rg35xx-2024.dtb` |
| RG35XX 2024, Rev6 screen | `sun50i-h700-anbernic-rg35xx-2024-rev6-panel.dtb` |
| RG35XX H | `sun50i-h700-anbernic-rg35xx-h.dtb` |
| RG35XX H, Rev6 screen | `sun50i-h700-anbernic-rg35xx-h-rev6-panel.dtb` |
| RG35XX SP | `sun50i-h700-anbernic-rg35xx-sp.dtb` |
| RG35XX SP, v2 screen | `sun50i-h700-anbernic-rg35xx-sp-v2-panel.dtb` |
| RG35XX Pro | `sun50i-h700-anbernic-rg35xx-pro.dtb` |
| RG40XX H | `sun50i-h700-anbernic-rg40xx-h.dtb` |
| RG40XX V | `sun50i-h700-anbernic-rg40xx-v.dtb` |
| RG34XX | `sun50i-h700-anbernic-rg34xx.dtb` |
| RG34XX SP | `sun50i-h700-anbernic-rg34xx-sp.dtb` |
| RG28XX | `sun50i-h700-anbernic-rg28xx.dtb` |
| RG CubeXX | `sun50i-h700-anbernic-rgcubexx.dtb` |

The wrong file usually means a black screen or no controls. A system update
writes `extlinux.conf` again: after updating, check the `FDT` line.

### Allwinner A133 (TrimUI Smart Pro, TrimUI Brick, MagicX Zero 28 / Zero 40)

Boots from the microSD card; the internal eMMC is left alone. On the MagicX
Zero 28 and Zero 40, use the **TF1** slot. Wi-Fi is 2.4 GHz only.

### Allwinner A33 (Miyoo A30, PocketGo S30)

Boots from the microSD card. On the PocketGo S30, sound goes to the speaker
only (the headphone jack is not handled yet).

### NES Classic / SNES Classic

These consoles start REG Linux from a **USB stick**, through a module installed
with [hakchi2-CE](https://github.com/TeamShinkansen/Hakchi2-CE). Nothing in the
console's own storage is replaced.

1. Write the `nes-classic` image to a USB stick.
2. Install `reglinux-usb.hmod` (in the image's `boot` folder) with hakchi2-CE.
3. Connect the stick through a powered USB OTG Y-cable and start the console.

### Allwinner T527 (TrimUI Smart Pro S)

Boots from the microSD card with nothing written to the eMMC; remove the card
to start the stock system. Use the default image. The `-spl.img` variant is an
alternative that does not start on every unit.

### Rockchip RK3128 (G28, SEGAM PS7000)

Boots from the microSD card; the internal storage is not touched. On the G28,
only one of the two USB-C ports carries data.

### Rockchip RK3288 (GPD XD)

Boots from the microSD card (the device tries the card first); nothing is
written to the eMMC.

### PCs (x86_64)

Write the image to a USB stick or card and choose it in the firmware boot menu.

### Qualcomm devices

Qualcomm-based handhelds are not part of the 26.12 release.
