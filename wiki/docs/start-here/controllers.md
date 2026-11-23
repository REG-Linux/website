---
title: Controllers and hotkeys
description: Configure and pair controllers in REG Station, and the hotkey combinations used in games.
---

# Controllers and hotkeys

## Configure a controller

A handheld's built-in buttons work out of the box. For an external USB or
Bluetooth controller, press a button on it: REG Station opens the
configuration screen by itself. Follow the prompts, one button at a time.

The `CONTROLLERS` menu (press **Start**, then `CONTROLLERS`) has:

| Entry | Use |
|---|---|
| `CONFIGURE` | controller configuration |
| `MAPPING` | change what each button does |
| `BT DEVICES` | Bluetooth controllers already paired |
| `PAIR BT MANUAL` / `PAIR BT AUTO` | pair a Bluetooth controller (put it in pairing mode first) |
| `LIGHT GUNS` | light gun settings |

To swap the confirm and cancel buttons in menus:
`CONTROLLERS > CONFIGURE > SWITCH CONFIRM & CANCEL BUTTONS IN REG-STATION`.

## The hotkey

In a game, the **hotkey** button plus another button gives a shortcut. The
hotkey is the Guide / Home button, or **Select** on controllers that have none
(Fn on some handhelds).

### In RetroArch (default for most systems)

| Hotkey + | Action |
|---|---|
| Start | quit the game |
| North (top) button | RetroArch menu |
| South button | reset |
| L1 | save state |
| R1 | load state |
| D-pad left / right | previous / next save slot |

### In Libra

Libra is REG Station's built-in game player, an option for libretro cores:
`GAMES & EMULATION > GAME SETTINGS > USE LIBRA (IN-PROCESS LIBRETRO)`. It adds
more shortcuts:

| Hotkey + | Action |
|---|---|
| Start | quit the game |
| North button | quick menu |
| South button | reset |
| West button | pause |
| East button | screenshot |
| L1 / R1 | save / load state |
| D-pad left / right | previous / next save slot |
| D-pad up / down | volume |
| L3 | display mode |
| L2 (hold) | rewind |
| R2 | fast-forward on / off |

### Standalone emulators

Emulators that run outside RetroArch (PlayStation 2, GameCube…) quit with
**hotkey + Start** too. Their other shortcuts differ per emulator.

## Volume, brightness and power keys

| Keys | Action |
|---|---|
| Volume + / − | volume |
| Volume + and − together | mute |
| Mode/Function + Volume + / − | brightness |
| Power, short press | sleep or power off, depending on the device |
| Power, held 2 seconds | power menu |

These can be changed in `/userdata/system/configs/keys.conf`.
