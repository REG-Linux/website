---
layout: post
title: "How to Install REG Linux on Anbernic RG35XX Plus"
date: 2026-03-29
author: REG Linux Team
description: "Step-by-step guide to installing REG Linux on the Anbernic RG35XX Plus. Download, flash, boot, and start playing retro games in under 10 minutes."
tags: [guide, anbernic, rg35xx, handheld]
---

The Anbernic RG35XX Plus is one of the most popular budget retrogaming handhelds. It runs an Allwinner H700 SoC (quad-core Cortex-A53), has a 3.5-inch IPS screen, built-in WiFi, and a 3300mAh battery. Street price is around $60.

REG Linux supports it fully. Here's how to get it running.

## What you need

- Anbernic RG35XX Plus
- A microSD card (16GB minimum, 32GB or larger recommended)
- A computer with an SD card reader
- [balenaEtcher](https://etcher.balena.io/) (free, works on Windows/Mac/Linux)

## Step 1: Download the image

Go to the [RG35XX Plus download page](/download/anbernic-rg35xx-plus/) and grab the latest REG Linux image. The file will be a compressed `.img.gz` — you don't need to decompress it, balenaEtcher handles that automatically.

If you want to verify what works on this device before flashing, check the [compatibility matrix](https://compat.reglinux.org/device/anbernic-rg35xx-plus).

## Step 2: Flash the SD card

1. Insert your microSD card into your computer.
2. Open balenaEtcher.
3. Click **Flash from file** and select the downloaded `.img.gz`.
4. Select your SD card as the target. Double-check you've picked the right drive.
5. Click **Flash** and wait. This takes about 2 minutes.

When it's done, eject the card safely.

## Step 3: First boot

Insert the SD card into the RG35XX Plus and power it on. The first boot takes a bit longer than usual — REG Linux expands the data partition to fill the card and sets up initial configuration. Give it a minute or two.

You'll boot into EmulationStation, the graphical frontend. From here you can browse systems, change settings, and launch games.

## Step 4: Configure WiFi

WiFi lets you transfer ROMs over the network, scrape game metadata, and update the system.

1. In EmulationStation, open **System Settings** (press Start).
2. Go to **Network Settings**.
3. Select your WiFi network and enter the password.

Once connected, note the IP address shown in the network settings. You'll use it to transfer files.

## Step 5: Add your ROMs

You have a few options:

**Over the network (easiest):**
The device exposes a Samba share on your local network. On your computer, open a file browser and navigate to `\\<device-ip>\share` (Windows) or `smb://<device-ip>/share` (Mac/Linux). Drop your ROM files into the appropriate system folders — `snes` for SNES games, `gba` for GBA, and so on.

**Via SD card:**
Power off the device, remove the SD card, and plug it into your computer. Copy ROMs to the `roms` directory on the data partition, organized by system folder.

**Via USB:**
Plug a USB drive with ROMs into the device via the USB-C port with an OTG adapter. EmulationStation can browse external storage directly.

After adding ROMs, go back to EmulationStation and select **Update Games Lists** from the main menu (press Start). Your games will appear under their respective system entries.

## Step 6: Play

Select a system, pick a game, and press A to launch. Controls are mapped automatically. The RG35XX Plus has a D-pad, dual analog sticks, ABXY buttons, L/R triggers, and Start/Select — more than enough for anything up through PS1.

**Useful hotkeys:**
- **Select + Start** — quit the current game and return to EmulationStation
- **Select + R1** — save state
- **Select + L1** — load state
- **Select + X** — open the RetroArch quick menu

## What runs well on this device

The H700 handles 8-bit and 16-bit consoles without breaking a sweat. Here's a rough guide:

- **Full speed:** NES, SNES, Genesis, Game Boy, GBA, Neo Geo, CPS1/CPS2, PS1
- **Mostly playable:** N64 (many titles), PSP (2D games and lighter 3D), Dreamcast (some titles)
- **Too demanding:** Saturn, DS (3D titles), PSP (heavier 3D)

Check the [compatibility matrix](https://compat.reglinux.org/device/anbernic-rg35xx-plus) for detailed per-feature status reported by testers.

## Troubleshooting

**Black screen on boot:** Make sure you flashed the correct image for the RG35XX Plus specifically, not the RG35XX (without Plus). They use different SoCs.

**WiFi won't connect:** Try moving closer to your router. The H700's WiFi antenna is small. If it still won't connect, check that your network isn't using WPA3-only mode.

**No games showing up:** Press Start, select **Update Games Lists**. Make sure ROM files are in the right system folders and in a supported format (`.sfc` for SNES, `.gba` for GBA, etc.).

For more help, join the [REG Linux Discord](/community/) or check the [wiki](https://reglinux.org/wiki/).
