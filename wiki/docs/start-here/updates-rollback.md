---
title: Updates
description: How REG Linux updates itself, what an update keeps, and how to go back to an earlier version.
---

# Updates

## Update from the menu

`SYSTEM > SOFTWARE UPDATES`:

- **CHECK FOR UPDATES** turns the check on or off (on by default).
- **UPDATE TYPE**: `stable`, or `stable and beta` to also get test versions.
- **START UPDATE** downloads the new system; once it is ready the entry
  becomes **APPLY UPDATE**, and the update is installed on the next restart.

Updates come from the
[REG Linux releases on GitHub](https://github.com/REG-Linux/REG-Linux/releases).
Each download is checked against its checksum before it is installed. Keep the
device charged or plugged in during an update. From a shell, `system-upgrade`
does the same; its log is `/userdata/system/logs/system-upgrade.log`.

## What an update keeps

- **Kept:** everything in `/userdata`: games, saves, BIOS files, screenshots,
  your `system.conf` settings, controller configurations and REG Station
  settings. Also `system-boot.conf` on the `REGLINUX` partition.
- **Replaced:** the system itself and the boot files. A device tree chosen by
  hand in `extlinux/extlinux.conf` (the `FDT` line, see
  [Install](../installation.md#anbernic-h700-rg35xx-rg40xx-rg34xx-rg28xx-rg-cubexx))
  is kept.

## Going back to an earlier version

REG Linux has no one-click rollback: an update replaces the previous system.
To go back, write the earlier image from the
[releases page](https://github.com/REG-Linux/REG-Linux/releases) to a card. To
keep your data, copy `/userdata` (or at least `roms`, `saves`, `bios` and
`system/system.conf`) somewhere else first, then copy it back.
