# Quake III

## Metadata

- Manufacturer: Ports
- Release Year: 1999
- Hardware: port
- Platform tag: pc
- Group: ports

## Supported ROM extensions

quake3

## Emulators

- **ioquake3** (ioquake3) – Requires BR2_PACKAGE_IOQUAKE3

## Notes

Quake III is optimized to be played with a mouse and keyboard, but here it is also pre-configured to be played with a gamepad.

For the basic configuration you must have the "baseq3" and "missionpack" folders in the "/userdata/roms/quake3" directory.

To start a game, create a file with the extension .quake3, for example "Quake III Arena.quake3".
Inside this file, add the following line: "+set fs_game "baseq3" for the game "Quake III Arena.
For Quake III: Team Arena mode create another file with: "+set fs_game "missionpack".

Repeat this step for each mod you wish to play, giving the file a logical name to help you navigate through artwork etc.

Please note that menu options in Team Arena and other mods can only be selected using a mouse, once the game is started the controller will function normally.

For more info: https://wiki.batocera.org/systems:ioquake3

---
Source: `quake3.yml`
