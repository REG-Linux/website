# PlayStation Vita

## Metadata

- Manufacturer: Sony
- Release Year: 2012
- Hardware: portable

## Supported ROM extensions

zip, psvita

## Emulators

- **vita3k** (vita3k) – Requires BR2_PACKAGE_VITA3K

## Notes

The world's first emulator for the PlayStation Vita.

---------------------------------
## VITA3K IMPORTANT INFO ##
---------------------------------

Games require the system modules be present for Vita3K to (low level) emulate them.
This can be done by installing the PS Vita firmware through Vita3K.

Note: You MUST set-up Vita3k using the F1 option, choose applications & then run the Vita3K-config program

1. Go through the wizard hitting next for all the default options & create a user account.

Note: do not change the path for Vita3k to run.

2. You must install the required firmware:

The firmware can be downloaded from the official PlayStation website here:
https://www.playstation.com/en-us/support/hardware/psvita/system-software/

There's also an additional firmware package that contains the system fonts that needs to be installed.
The font firmware package can be downloaded straight from the PlayStation servers, here:
http://dus01.psp2.update.playstation.net/update/psp2/image/2022_0209/sd_59dcf059d3328fb67be7e51f8aa33418/PSP2UPDAT.PUP?dest=us

Ideally save them to /userdata/bios/psvita

Install both firmware packages using the File > Install Firmware menu option to where you have the firmware saved on your system.

Game compatibility is here:
https://vita3k.org/compatibility.html?lang=en#

3. You must install a game rom via a maidump package format only for now with the .zip extension. vpk packages do not currently work.
Again via the File menu install the zip file(s) needed.

This will create the ROM which can be chosen from the list - take note of the Game ID.
i.e. PCSE00005

4. Now in your /userdata/roms/psvita folder ensure the rom has the Game ID embedded in the zip file between square brackets [].
i.e. Street Fighter X Tekken (USA) [PCSE00005].zip
Alternatively to save space & because the rom is installed in the psvita config directory you can remove the rom zip files.
Just be sure the replace the file with a .psvita extension alternative.
i.e. Street Fighter X Tekken (USA) [PCSE00005].psvita

This will enable Emulation Station to see your installed game & launch it via the ES GUI.

Please refer to the wiki - https://wiki.batocera.org/playground:systems:psvita

---
Source: `psvita.yml`
