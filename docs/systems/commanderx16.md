# Commander X16

## Metadata

- Manufacturer: The 8-Bit Guy
- Release Year: 2019
- Hardware: computer
- Platform tag: commanderx16

## Supported ROM extensions

bas, img, prg

## Emulators

- **x16emu** (x16emu) – Requires BR2_PACKAGE_X16EMU

## Notes

Extract your Commander X16 games here in their own directory.
The games with .IMG .PRG extensions will show in EmulationStation to run accordingly.

If you have a game without an appropriate extension you can create a .BAS file with DOS commands.
i.e. in the game folder create a PLANETX16.BAS file.
Then add into the file the DOS commands to load the game, like so...

LOAD "PLANETX16"
RUN

If you have an .IMG file which doesn't load then create an autorun.cmd file with the DOS commands also.
i.e. X16 Wars would contain the following...

LOAD "WARS.PRG"
...
RUN

For more info: https://wiki.batocera.org/systems:commanderx16

---
Source: `commanderx16.yml`
