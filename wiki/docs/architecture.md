---
title: Architecture
description: How a REG Linux image is built, how it boots, where data lives, and the main services.
---

# Architecture

REG Linux is an image-based system: the operating system is one read-only file
replaced as a whole by updates, and everything the user adds lives on a
separate data partition.

## Build

- A [Buildroot](https://buildroot.org/) external tree: the
  [REG-Linux repository](https://github.com/REG-Linux/REG-Linux) holds the
  packages, board files and configurations; Buildroot itself is a submodule.
- Each target (`configs/reglinux-<target>.board`) includes a toolchain and the
  common system configuration. Toolchains are built by Buildroot: GCC 14 with
  musl or glibc for most targets, GCC 15 or 16 with glibc for some.
- On musl targets, glibc-only programs (PortMaster ports, some binaries) run on
  an optional *glibc sidecar* downloaded at install time.
- Builds run in a Docker or Podman container: see [Build REG Linux](developers/build.md).

## Storage

| Partition | Format | Contents |
|---|---|---|
| `REGLINUX` | FAT | boot loader files, kernel, initrd, the system image, `system-boot.conf` (boot-time settings: Wi-Fi, storage device, security…) |
| `SHARE` | ext4 | `/userdata`: games, BIOS, saves, screenshots, `system/system.conf` |

`/userdata` can also be moved to an external drive or a network share
(`STORAGE DEVICE` in the system settings).

## Boot

1. The boot loader (U-Boot with `extlinux/extlinux.conf` on most ARM devices)
   starts the kernel and REG Linux's initrd.
2. The initrd installs pending updates (`*.update` files on the boot
   partition): when one is present it starts the **rescue** system, which
   applies it and reboots. A new image has such files, which is why the first
   boot reboots once.
3. Otherwise the initrd mounts the read-only system image with a writable
   overlay in memory, and starts it.
4. SysV init runs the `/etc/init.d/S*` scripts: device setup (eudev), the
   per-device default settings, mounting `/userdata` (`S11share`), filling it
   with the default files (`S12populateshare`), the services, and REG Station.

## Settings

- `/boot/system-boot.conf`: settings needed before `/userdata` is mounted.
- `/userdata/system/system.conf`: everything else, written by REG Station's
  menus.
- `/usr/share/reglinux/sysconfigs/`: per-device defaults, chosen at boot from
  the device tree model.

## Main components

| Area | Component |
|---|---|
| Frontend | **REG Station**: game lists, menus, settings; includes **Libra**, an in-process libretro player |
| Launching and configuration | **regmsgd**: launches emulators with the right configuration (per-emulator Lua generators), applies settings, handles keys and the BIOS check |
| Emulators | RetroArch with libretro cores (the default), standalone emulators, ports and engines |
| Display | Wayland: Sway on most devices (Weston on a few), XWayland where X11 programs need it; Mesa GPU drivers per SoC |
| Sound | PipeWire |
| Network | ConnMan with IWD (Wi-Fi), BlueZ (Bluetooth), ksmbd (Samba share), Dropbear (SSH, SFTP) |
| Services | `system-services` turns optional services on and off |

## Updates

`system-upgrade` downloads `boot-<board>.tar.zst` from the GitHub releases,
checks it, installs the new kernel, initrd and rescue files, and lets the
rescue system install the rest on the next boot. `/userdata` is kept; its
default files are refreshed without touching the user's settings. See
[Updates](start-here/updates-rollback.md).
