# MS-DOS (x86)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/dos.webp" alt="DOS icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/dos.png" alt="DOS logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

DOS is the platform that brought PC gaming to life. REG-Linux treats it as the `pc` system group and supports multiple DOSBox variants so you can run everything from floppy-era arcades to CD-based shooters on modern hardware.

## Quick reference

- **ROM folder:** `/userdata/roms/dos`
- **Accepted formats:** `.pc`, `.dos`, `.zip`, `.dosz`, `.squashfs`, `.m3u`, `.iso`, `.cue`
- **Emulators:** DOSBox (standalone), DOSBox Staging, DOSBox-X, libretro: DOSBox_Pure

## ROM layout

Place each game in its own subfolder named with a `.pc`/`.dos` extension (e.g. `/.../WackyWheels.pc/`) and include a `dosbox.bat` that launches the executable (`MP.EXE`). Some emulators also accept zipped folders—rename `.zip` to `.dosz` for DOSBox_Pure integration or `.d.zip` if you want to mount it as a virtual CD.

VL-ROMs with long filenames may need DOS-friendly names (`longfi~1.iso`) when referenced from `.cue`/`.bat` files; rename files and edit cues to keep everything consistent.

## Emulators

### DOSBox (standalone)

The classic DOSBox emulator gives the most authentic experience but requires per-game setup. Use your game folder’s `dosbox.bat` and optional `dosbox.cfg` to define mounts, cycles, mapper files and custom options. Press `Ctrl+F9` to quit.

### DOSBox Staging

A user-friendly fork that keeps the traditional DOSBox feel while adding modern conveniences. It uses the same folder structure as DOSBox but eases configuration.

### DOSBox-X

A hybrid that can emulate Windows 3.x/9x while still running older DOS games. Use it if you require advanced multimedia or Windows-era features.

### DOSBox_Pure (libretro)

The libretro port automates much of the setup: point it to the game folder and it prompts for the executable, configures input, and handles fast-forward, multi-disk `.m3u` playlists and cartridge/tape/disk abstractions.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| `global.pure_cpu_type` | Choose a CPU profile (386, 486, Pentium, etc.). |
| `global.pure_cycles` | Tune the emulated cycle count for speed/accuracy. |
| `global.pure_memory_size` | Set RAM size (4 MB to 1.2 GB). |
| `global.pure_machine` | Pick a graphics adapter (SVGA, VGA, CGA, Tandy). |
| `global.pure_keyboard_layout` | Set the physical keyboard layout (US, UK, FR, etc.). |
| `global.pure_savestate` | Enable savestate/rewind support. |
| `global.pure_joystick_analog_deadzone` | Adjust joystick deadzone for drifting sticks. |
| `global.pure_controllerN_dosbox_pure` | Assign controller emulation profile (Gamepad, Keyboard, Flightstick). |

## Setup tips

- Keep a `dosbox.bat` in every game folder that issues the needed `MOUNT`, `IMG`, `C:` and `RUN` commands. Example:
  ```
  imgmount d CD\HALO2.ISO -t iso
  c:
  cd WACKY
  WW.EXE
  ```
- Place custom `dosbox.cfg` alongside `dosbox.bat` to override graphics, mapper or performance settings without affecting other games. The `[autoexec]` section should be mirrored in the batch file (DOSBox config uses forward slashes; the batch file uses Windows paths). `mapper.map` files can be created in-game via `Ctrl+F1`.
- Use tools like [ExoDOSConverter](https://github.com/Voljega/ExoDOSConverter) to convert large collections into REG-Linux-friendly folders.

## MIDI and soundfonts

DOSBox variants and DOSBox_Pure support MIDI devices. Drop `.sf2` SoundFont files into `/userdata/bios/` and configure `midiconfig` in your `dosbox.cfg` (`midiconfig = 20:0`). For DOSBox_Pure, select the MIDI device inside the core’s Audio settings.

## Controls

Most DOS games expect keyboard input. Use RETROPAD-to-keyboard mapping (Pad2Key) if you prefer controllers. The Gravis PC Gamepad layout (colored buttons) is often referenced by older titles, so the pad mapping mimics that color-coded interface.

## Troubleshooting

- **Ratio problems:** toggle `aspect=false`/`aspect=true` in the config depending on your monitor.
- **Joystick drift:** try `timed=true` or adjust deadzones in Pure.
- **Mapper issues:** set `buttonwrap=false` to avoid button IDs wrapping around.
- **CD drive errors:** rename `.iso`/`.bin` files to DOS-friendly names (no special characters) and update `.cue` references accordingly.
- **Mounting fails:** use absolute paths with `mount`, or rely on DOSBox’s `imgmount` command instead.
- **Need to quit quickly:** press `Ctrl+F9` in any DOSBox.
- **Disk swapping:** press `[HOTKEY]+[L1/L2]` or use RetroArch’s Disc Control menu when using `.m3u` playlists.

