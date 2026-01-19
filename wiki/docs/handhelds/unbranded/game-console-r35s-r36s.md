---
title: Game Console R35S R36S
description: '| SoC | CPU | GPU | | --- | --- | --- | | Rockchip RK3326 | ARM Cortex-A35
  (Quad-core) @ 1.3 GHz | Mali G31 |'
manufacturer: Unbranded
slug: unbranded/game-console-r35s-r36s
url: https://REG Linux.org/handhelds/unbranded/game-console-r35s-r36s
generated: 2025-11-23 18:01:10.842867
---

# Game Console R35S R36S


## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Rockchip RK3326 | ARM Cortex-A35 (Quad-core) @ 1.3 GHz | Mali G31 |

| Display | RAM | eMMC | Connectivity |
| --- | --- | --- | --- |
| 3.5-inch 640*480 | 1 GB DDR3 | None | None |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Mainline Linux | Panfrost (GL 3.1/GLES 3.1) | Sway | REG-ES |

## Emulators


## Install REG Linux

### Installation

Download the current RK3326 REG Linux image for this device from the REG Linux download page, then follow the steps in the Installation guide.

### New displays (R36s of year 2024)

Recent R36s have new displays that need some extra actions to work.

The simplest way so far is:

- Determine which panel do you have (or just try every option until it works)
- Download a mipi-panel.dtbo.r36s-panel* there [there](https://github.com/stolen/r.nix-distribution/releases/tag/panel_overlays)
- Rename the downloaded file and put it to a boot ( REG Linux ) partition as overlays/mipi-panel.dtbo

These files mostly have just basic refresh rate (77.378 FPS) ( panel4 has 50, 60, 75 because we tested it)

If you have an original .dtb file, you can generate a mipi-panel.dtbo from it. Assuming you have an SSH access and you have scp 'd the original dtb as rk3326-r35s-linux.dtb , the process would be as follows: RK3326:~ # mount -o remount,rw /flash RK3326:~ # mkdir -p /flash/overlays/ RK3326:~ # # ## Be not afraid! importpanel.py may run for a minute or two for some panels RK3326:~ # /usr/libexec/generic-dsi/importpanel.py rk3326-r35s-linux.dtb -O dtbo -o /flash/overlays/mipi-panel.dtbo RK3326:~ # sync ; mount -o remount,ro /flash/ Here we just make an overlays directory writable, then call a script that does all the importing stuff. Feel free to run this script on your PC, modify it and experiment with panel timings.

This script adds a bunch of potentially useful refresh rates, but we have very few knowledge on which modes work well. Please check them with wlr-randr or with game configuration and tell us which modes work with your panel.