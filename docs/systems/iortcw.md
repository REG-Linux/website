# Return To Castle Wolfenstein

## Metadata

- Manufacturer: Ports
- Release Year: 2001
- Hardware: port
- Platform tag: pc
- Group: ports

## Supported ROM extensions

rtcw

## Emulators

- **iortcw** (iortcw) – Requires BR2_PACKAGE_IORTCW

## Notes

IORTCW uses the games files from your 2001 version of the game `Return to Castle Wolfenstein`.
To use IORTCW in Batocera, you need to do the following:

1. Install Return to Castle Wolfenstein in Windows or Linux (Steam or GOG receommended)
2. Copy the .pk3 files only from your installation locations `Main` folder to /userdata/roms/iortcw in it's own `main` folder.
3. Create an initial file with a rtcw extension, like so: `Return to Castle Wolfenstein.rtcw`.
4. Update you games list in Batocera EmulationStation and the game should be available under `Ports`.

Notes:

It is important to use the exact directory name above.
i.e. /userdata/roms/iortcw/main is where your .pk3 should be located.
A keyboard and mouse / touchscreen is required for game start.

For more info: https://wiki.batocera.org/systems:iortcw

---
Source: `iortcw.yml`
