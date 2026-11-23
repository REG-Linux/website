---
title: Add games and BIOS files
description: Where games and BIOS files go on REG Linux, and four ways to copy them, over the network, by USB cable, from a computer, or on an external drive.
---

# Add games and BIOS files

## Where files go

Everything you add lives in `/userdata`, the `SHARE` partition of the card:

| Folder | Contents |
|---|---|
| `roms/<system>/` | games, one folder per system: `roms/snes/`, `roms/psx/`, `roms/gba/`… |
| `bios/` | BIOS and firmware files |
| `saves/` | save files and save states |
| `screenshots/` | screenshots |
| `system/system.conf` | settings |

Each `roms/<system>/` folder has an `_info.txt` file about that system and its
emulators. The folder names are the system names used in this wiki's
[Systems](../systems/index.md) pages, which also list the accepted file types.

After copying, refresh the game lists: `GAMES & EMULATION > COLLECTIONS >
UPDATE GAMELISTS`, or restart REG Station.

## Copy games

### Over the network (Samba)

With the device on Wi-Fi, open:

- Windows: `\\REGLINUX\share`
- macOS / Linux: `smb://reglinux.local/share`

The share is the whole `/userdata` folder. See
[Network, SSH and Samba](network.md) for passwords and security.

### Over the network (SFTP)

Any SFTP client (FileZilla, WinSCP, `scp`) works: host `reglinux.local`, user
`root`. The password is on the [network page](network.md).

### With a USB cable

Connected to a computer, the device appears as a media device (MTP) showing
`/userdata`.

### From a computer, with the card

The `SHARE` partition is **ext4**. Linux reads it directly; Windows and macOS
need an extra ext4 driver. The `REGLINUX` partition (FAT) only holds system
files: do not put games there.

### On an external drive

In `SYSTEM > SYSTEM SETTINGS > STORAGE DEVICE`, choose the drive. REG Linux then
uses a `reglinux` folder on that drive as `/userdata`: put games in
`reglinux/roms/<system>/` on the drive. USB drives formatted vfat, exFAT, NTFS,
ext4 or btrfs are supported.

## BIOS files

Some systems need BIOS files from the original hardware. Copy them to
`/userdata/bios/` (or the sub-folder named on the system's page), with the
exact file names given there.

To see what is missing: `TOOLS > MISSING BIOS`. A warning at game launch can be
turned on in REG Station's settings; it is off by default.

REG Linux does not include or download BIOS files.
