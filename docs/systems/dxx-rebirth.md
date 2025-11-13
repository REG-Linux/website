# DXX Rebirth

## Overview

Introduced in 1998 by Ports, the DXX Rebirth was a port system. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Manufacturer: Ports
- Release year: 1998
- Hardware type: port
- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

d1x, d2x

## Emulators

- **dxx-rebirth** (dxx-rebirth) – Requires BR2_PACKAGE_DXX_REBIRTH

## Notes

DXX-Rebirth allows you to play Descent 1 & 2.

DXX-Rebirth requires game data to play.
You can get Descent 1 PC shareware data and Descent 2 PC demo data from the DXX-Rebirth website.
https://www.dxx-rebirth.com/download/dxx/content/descent-pc-shareware.zip
https://www.dxx-rebirth.com/download/dxx/content/descent2-pc-demo.zip

Full game data is supported (and recommended), but is not freely available.
You can buy full Descent 1 game data and/or buy full Descent 2 game data from GOG.com.
DXX-Rebirth contains engines for both games.
Each engine works for its respective game without the data from the other, so players who wish to purchase only one game may do so.

Put your Descent data files in /userdata/roms/dxx-rebirth in it's own Descent directory.
Then within that directory, /userdata/roms/dxx-rebirth/Descent add a blank file Descent.d1x.
That file will launch the game and allow your to scrape game information via EmulationStation.

Do the same for Descent 2 however using a blank file Descent2.d2x in /userdata/roms/dxx-rebirth/Descent2 accordingly.

A mouse & keyboard is required initially but you can configure a controller per user.

For more info: https://wiki.batocera.org/systems:dxx-rebirth

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
