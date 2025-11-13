# Applications

## Overview

The Applications system is supported on REG Linux. It is grouped with ports titles in EmulationStation. Its platform tag is `pc` for proper filtering.

## Technical specifications

- Platform tag: pc
- EmulationStation group: ports

## Supported ROM extensions

flatpak

## Emulators

- **flatpak** (flatpak) – Requires BR2_PACKAGE_FLATPAK

## Notes

Play games (and programs) from https://flathub.org.
Programs must be installed from command line.
Example:
Install Flathub Repo : flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
Install app from url : flatpak install https://dl.flathub.org/repo/appstream/org.tuxfamily.XMoto.flatpakref
Search app from Repo : flatpak search xmoto
Install app from Repo : flatpak install xmoto
List your apps : flatpak list
Remove intalled app : flatpak remove xmoto

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
