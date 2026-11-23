---
title: FAQ
description: Short answers to common questions about REG Linux.
---

# FAQ

**Does REG Linux replace my device's original system?**
No. It runs from the microSD card (a USB stick on the NES/SNES Classic) and does
not write to the internal storage. Remove the card to start the original system.

**Does REG Linux come with games or BIOS files?**
No. Only content whose licence allows it is included. You add your own games
and BIOS files: see [Add games and BIOS files](../start-here/adding-games.md).

**Where are my saves?**
In `/userdata/saves/`, on the card's `SHARE` partition. Updates keep them.

**Can I read the card on Windows or macOS?**
The `REGLINUX` partition, yes. The `SHARE` partition, where games and saves
are, is ext4: Windows and macOS need an ext4 driver. Copying over the network
is usually easier.

**How do I update?**
`SYSTEM > SOFTWARE UPDATES`. See [Updates](../start-here/updates-rollback.md).

**Can I go back to the previous version?**
Write the earlier image to a card. Copy `/userdata` somewhere first to keep your
data. See [Updates](../start-here/updates-rollback.md#going-back-to-an-earlier-version).

**My device is not in the list.**
Only the devices listed in [Devices](../devices/index.md) have an image. Images
are not interchangeable between device families.

**What is REG Station?**
The game menu of REG Linux: it lists your games, launches emulators and holds
all the settings.

**What is the difference between RetroArch and Libra?**
Both run libretro emulator cores. RetroArch is the default. Libra is REG
Station's built-in player, with more hotkeys: see
[Controllers and hotkeys](../start-here/controllers.md#in-libra).

**Where do I report a problem?**
Create a support file (`TOOLS > SUPPORT FILE`) and attach it to your report:
see [Troubleshooting](troubleshooting.md#asking-for-help).
