---
title: Troubleshooting
description: Black screen, no controls, no sound, games that will not start, and where REG Linux keeps its logs.
---

# Troubleshooting

## The device does not start, or stays on a black screen

- **First start:** the device reboots once by itself after installing; give it
  a minute. See [First boot](../start-here/first-boot.md).
- **Anbernic H700:** the image starts with the RG35XX Plus device file. Any
  other model needs the `FDT` line changed first, see
  [Install](../installation.md#anbernic-h700-rg35xx-rg40xx-rg34xx-rg28xx-rg-cubexx).
- **MagicX Zero 28 / Zero 40:** the card must be in the **TF1** slot.
- Write the image again and check the download against its `.sha256` file.
  Try another card: cheap or worn cards are the most common cause.
- Make sure the image is the one for your device: images are not
  interchangeable between device families.

## Controls do not respond, or are mixed up

- External controller: open `CONTROLLERS > CONFIGURE` and configure it again.
- Hotkeys need a hotkey button: see [Controllers and hotkeys](../start-here/controllers.md).
- On an H700 handheld, wrong controls usually mean the wrong device file
  (see above).

## No sound

- Check `SYSTEM > SYSTEM SETTINGS > AUDIO OUTPUT`, and the volume keys.
- On the PocketGo S30, sound comes from the speaker only.

## A game does not start

- Check `TOOLS > MISSING BIOS`: many systems need BIOS files, see
  [Add games and BIOS files](../start-here/adding-games.md#bios-files).
- Check that the file type is accepted by that system (its page in
  [Systems](../systems/index.md)).
- Try another emulator or core: in the game list's options menu,
  `ADVANCED SYSTEM OPTIONS` sets the emulator for that system.

## Wi-Fi does not connect

- `NETWORK & SERVICES > NETWORK`: check Wi-Fi is enabled, select the network
  again and retype the key.
- Some devices only have 2.4 GHz Wi-Fi (the A133 handhelds, for example).

## Logs

| Log | Where |
|---|---|
| REG Station | `/userdata/system/logs/regstation.log` |
| System update | `/userdata/system/logs/system-upgrade.log` |
| First-boot file extraction | `/userdata/system/logs/extracted.files.log` |
| Background service (regmsgd) | `/var/log/regmsgd.log` (until the next restart) |
| Emulators | `/var/log/regmsg/launcher-<number>.log` (until the next restart) |

Logs in `/var/log` are lost at power off: collect them before restarting.

## Asking for help

`TOOLS > SUPPORT FILE` (or `system-support` from a shell) gathers the logs and
system information into one file,
`/userdata/saves/reglinux-<version>-support-<date>.tar.gz`. Wi-Fi keys,
passwords and account tokens are removed from it. Attach that file when you
report a problem on [the community channels](../community.md) or in a
[GitHub issue](https://github.com/REG-Linux/REG-Linux/issues).
