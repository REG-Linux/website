# PlayStation Vita

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/psvita.webp" alt="PlayStation Vita icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/psvita.png" alt="PlayStation Vita logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2012 by Sony, the PlayStation Vita was a portable system.

## Technical specifications

- CPU: ARM Cortex-A9 MPCore quad-core main processor paired with a dual-core PowerVR SGX543MP4+ GPU.
- Memory: 512 MB RAM for the system and 128 MB VRAM dedicated to graphics.
- Display: 5-inch OLED (later LCD) touchscreen at 960×544 with multi-touch support.
- Sound: Dual stereo speakers plus a headphone jack with multi-channel PCM/audio effects.

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
Source data: REG Linux emulationstation/es-system/es_systems.yml
