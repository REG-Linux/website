---
title: First boot
description: What happens the first time REG Linux starts, and the few settings to check before playing.
---

# First boot

## What you will see

1. **Install pass.** The first start installs the system files and grows the
   data partition to the full size of the card. The device then **reboots by
   itself**. Do not take the card out or power off during this step.
2. **Extracting files.** On the next start, the boot screen shows
   *Extracting files to /userdata* while the default folders, BIOS
   placeholders and settings are copied to the card.
3. **REG Station.** The game menu appears.

If extraction is interrupted, it runs again on the next start. Its log is
`/userdata/system/logs/extracted.files.log`.

## Controllers

A handheld's own buttons are ready to use. When you press a button on a new
external controller or keyboard, REG Station opens the controller
configuration by itself. See [Controllers and hotkeys](controllers.md).

## Settings to check

Open the menu with **Start**:

| What | Where |
|---|---|
| Language | `SYSTEM > SYSTEM SETTINGS > LANGUAGE (REGION)` |
| Time zone | `SYSTEM > SYSTEM SETTINGS > TIME ZONE` |
| Wi-Fi | `NETWORK & SERVICES > NETWORK`: enable Wi-Fi, pick the network, enter the key |
| Screen rotation | `SYSTEM > SYSTEM SETTINGS > SCREEN ROTATION` |
| Sound output | `SYSTEM > SYSTEM SETTINGS > AUDIO OUTPUT` |
| Confirm / cancel buttons | `CONTROLLERS > CONFIGURE > SWITCH CONFIRM & CANCEL BUTTONS IN REG-STATION` |

## Next

- [Add games and BIOS files](adding-games.md)
- [Network, SSH and Samba](network.md)
- [Updates](updates-rollback.md)
