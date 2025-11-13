# PlayStation 4

## Metadata

- Manufacturer: Sony
- Release Year: 2013
- Hardware: console

## Supported ROM extensions

ps4

## Emulators

- **shadps4** (shadps4) – Requires BR2_PACKAGE_SHADPS4

## Notes

Do not attempt to use this emulator unless you have a jailbroken PS4 console with back-up games.
PS4 emulation is very experiemental & required a high specified x86_64 PC.

Before you can play a game you must install the game via the associated .PKG file of your backed-up game using the F1 menu.
Then in the new installation directory for the installed game, create a file with a .ps4 extension so EmularionStation will see it.
i.e. /userdata/roms/ps4/CUSA03173/Bloodborne.ps4

Then you can launch the game from EmulationStation accordingly.

DLC content will be stored in: /userdata/roms/ps4/DLC

Very important: To play games you typically need the system modules from your PS4 that has been jailbroken.
Place the decrypted system module files in: /userdata/system/configs/shadps4/user/sys_modules

For more info: https://wiki.batocera.org/systems:ps4

---
Source: `ps4.yml`
