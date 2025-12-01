# GameCube

## Overview

Introduced in 2001 by Nintendo, the GameCube was a distinctive cube-shaped console that bridged the company's fifth and sixth generations. REG-Linux handles every GameCube title through the `gc` system group so metadata scraping, themes and visual sets stay consistent. Emulation is powered by Dolphin, the same emulator REG-Linux uses for Wii titles, which delivers excellent compatibility and the option to upscale the original graphics if the host hardware can keep up.

Dolphin exposes "Advanced System Options" that let you distribute the boosted rendering (higher **VIDEO RESOLUTION** settings) with optional **HIRES TEXTURES** for sharper models. When available, use those to make GameCube titles look crisp on modern displays without sacrificing the original gameplay.

## Technical specifications

- Manufacturer: Nintendo
- Release year: 2001
- Hardware type: home console (disc-based)
- CPU: IBM PowerPC "Gekko" processor at 485 MHz (Broadway derivative with SPE extensions)
- Memory: 24 MB of 1T-SRAM main RAM + 16 MB dedicated 1T-SRAM for textures
- GPU: ATI "Flipper" with hardware transform-and-lighting, 12 texture layers, outputting 640×480 (NTSC) or 720×480 (PAL)
- Sound: 16-bit ADPCM DSP with Dolby Pro Logic II support over a 64 MB/s audio bus
- Region tag: Worldwide (handled per ROM)

## Quick reference

- **ROM folder:** `/userdata/roms/gamecube`
- **Accepted ROM formats:** `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.rvz`, `.elf`, `.dol`, `.m3u`
- **Emulators:** Dolphin (standalone), Dolphin (libretro)
- **System group:** `gc`

## BIOS

Dolphin uses the GameCube IPL to deliver the original boot animation and allow access to settings such as memory card management. Install the regional IPL file under `/userdata/bios/GC/<region>/IPL.bin` and Dolphin will load it automatically. Hold down the `A`/`east` face button as soon as the boot animation appears to enter the BIOS screen.

| MD5 checksum                       | Share file path       | Description        |
|------------------------------------|:----------------------|--------------------|
| `db92574caab77a7ec99d4605fd6f2450` | `bios/GC/EUR/IPL.bin` | European BIOS file |
| `b17148254a5799684c7d783206504926` | `bios/GC/JAP/IPL.bin` | Japanese BIOS file |
| `b17148254a5799684c7d783206504926` | `bios/GC/USA/IPL.bin` | American BIOS file |

## ROM storage and formats

Store every GameCube ROM in `/userdata/roms/gamecube`. If you use a Riivolution patch, follow the JSON structure described on the [Dolphin emulator page](/emulators/dolphin#riivolution_patches) before launching the game from EmulationStation.

### Multi-disc games

For games that span multiple discs (e.g., *The Legend of Zelda: The Wind Waker*), create an `.m3u` playlist beside the ROMs. The playlist contains one line per disc, for example:

```m3u
Tales of Symphonia - Disc 1.rvz
Tales of Symphonia - Disc 2.rvz
```

REG-Linux v31 and higher hide the extra discs in EmulationStation, leaving only the playlist entry visible. If you edit the Dolphin configuration directly, keep **Change Discs Automatically** enabled so Dolphin knows how to swap discs without prompting.

## GBA Link

REG-Linux v36 added GameCube Port Type options that emulate accessories like the Game Boy Advance player. The **GBA (Internal)** port type lets Dolphin load a Game Boy Advance ROM internally, and the **Auto e-Reader** option for port 2 attaches one of the available e-Reader models. The mapping always mirrors the physical controller number (a GBA on port 2 uses Player 2's controller, port 4 uses Player 4 and so forth).

#### No Cartridge

Games such as *Four Swords Adventures* or *Final Fantasy Crystal Chronicles* simply connect the GBA without inserting a cartridge. The console loads the needed code into memory when prompted, so you only need to set the matching controller type for the port. Remember that titles like *Pac-Man Vs.* require the GBA on port 4, so you need four connected controllers before the GBA player can participate.

#### With Cartridge

When a GameCube game expects a Game Boy Advance cartridge, REG-Linux automatically loads the requested ROM from a `.gbl` file. The first line of the file is the GameCube ROM name, followed by the GBA ROMs you want to load:

```
Pokemon Box - Ruby & Sapphire (USA).rvz
Pokemon - Emerald Version (USA, Europe).7z
```

The first GBA ROM is loaded into the first connected GBA, the second ROM to the second GBA, etc. If you list fewer ROMs than GBAs, the final ROM is reused. Filenames may be absolute or relative to `/userdata/roms/gb` or within the same folder as the `.gbl`. Existing GBA save files are synced automatically.

To simulate the physical requirement of leaving the GBA off until the game prompts you, hold `[SELECT]` + `[START]` on the GBA controller during the loading period. Wait for the Nintendo logo to disappear, then press `east` to boot the GameCube game once it asks you to connect the GBA.

#### e-Reader

The e-Reader integration relies on mouse input. When **Auto e-Reader** is enabled, Player 2's analog stick controls the cursor, `[L2]` + `west` performs a left click and `[R2]` + `north` performs a right click. For instance, in *Animal Crossing's* in-game post office, open the e-Reader machine, choose Communication, and the game will prompt you to scan a card. After you click **Scan e-Reader Card(s)** using the mapped inputs, select the card file you want to load.

## Emulators

### Dolphin

Dolphin is the primary emulator for GameCube games in REG-Linux. Its performance and visual fidelity surpass the original hardware on modern machines, with options like higher internal resolutions or high-resolution texture packs. Advanced features such as GameCube port management, shader precaching and fullscreen enhancements are adjustable through Dolphin's settings pages.

#### Dolphin configuration

Standardized features available to Dolphin include `gamecube.videomode` and `gamecube.ratio`. Additional toggles appear in the EmulationStation Advanced Options. The most important options include:

| ES setting name | REG-Linux.conf_key | Description & possible values |
| --- | --- | --- |
| GRAPHICS BACKEND | `gamecube.gfxbackend` | Rendering API: OpenGL (`opengl`) or Vulkan (`vulkan`). |
| RENDERING RESOLUTION | `gamecube.internal_resolution` | Internal render scale for 3D models. 1x native through 8x+ resolutions. |
| UBERSHADERS | `wii.ubershaders` | Reduces stutter by compiling shaders in advance. Options: no_ubershader, exclusive_ubershader, hybrid_ubershader, skip_draw. |
| PRE-CACHE SHADERS | `gamecube.wait_for_shaders` | Compile shaders on next launch for smoother play: `0` Off, `1` On. |
| PERFORMANCE HACKS | `gamecube.perf_hacks` | Enables several performance compromises. `0` Off, `1` On. |
| USE PAD PROFILES | `gamecube.use_pad_profiles` | Loads stored controller mappings: `0` Off, `1` On. |
| GAMECUBE PORT 1 TYPE | `gamecube.dolphin_port_1_type` | Choose accessories (None, Standard Controller, GameCube Adapter for Wii U, Steering Wheel, Dance Mat, DK Bongos, Keyboard, GBA (Internal)). |
| GAMECUBE PORT 2 TYPE | `gamecube.dolphin_port_2_type` | Same options as port 1. |
| GAMECUBE PORT 3 TYPE | `gamecube.dolphin_port_3_type` | Same options as port 1. |
| GAMECUBE PORT 4 TYPE | `gamecube.dolphin_port_4_type` | Same options as port 1. |
| ANISOTROPIC FILTERING | `gamecube.anisotropic_filtering` | Improves texture clarity: Off (`0`), 2x, 4x, 8x, 16x. |
| DUAL CORE MODE | `gamecube.dual_core` | Enables dual core (less stable). `0` Off, `1` On. |
| GPU SYNC | `gamecube.gpu_sync` | Stabilizes timing when using dual core. `0` Off, `1` On. |
| ANTI-ALIASING | `gamecube.antialiasing` | Smooths jagged edges: Off, 2x, 4x, 8x. |
| ANTI-ALIASING MODE | `gamecube.use_ssaa` | Choose between MSAA (`0`) and SSAA (`1`). |
| HIRES TEXTURES | `gamecube.hires_textures` | Enables high-resolution texture packs: `0` Off, `1` On. |
| WIDESCREEN HACK (GLITCHY) | `gamecube.widescreen_hack` | Forces 16:9 output (may introduce visual glitches). `0` Off, `1` On. |
| ENABLE CHEATS | `gamecube.enable_cheats` | Allows cheats and aspect ratio fixes: `0` Off, `1` On. |
| MEMORY MANAGEMENT UNIT | `gamecube.enable_mmu` | Required for some titles: `0` Off, `1` On. |
| FAST DISK SPEED | `gamecube.enable_fastdisc` | Speeds up disc access: `0` Off, `1` On. |
| VSYNC | `gamecube.vsync` | Syncs frames to avoid tearing: `0` Off, `1` On. |
| DUALSHOCK MOTION CONTROL | `gamecube.dsmotion` | Map DS4 gyro to emulate Wii pointer: `0` Off, `1` On. |
| MOUSE AS IR WIIMOTE | `gamecube.mouseir` | Use mouse as Wii pointer: `0` Off, `1` On. |
| RUMBLE | `gamecube.rumble` | Enable rumble support: `0` Off, `1` On. |

### RetroArch

[RetroArch](https://docs.libretro.com/) is the frontend that runs the libretro Dolphin core. It provides shared menus, shaders, overlays and quick access to hotkeys.

#### libretro: dolphin

Open RetroArch's Quick Menu during gameplay with `[HOTKEY]` + the south face button (see [controller configuration](/configure_a_controller)) and adjust per-core settings there. Otherwise, RetroArch shares the same standardized `gamecube.*` options as the standalone emulator.

## Controls

The default GameCube layout is represented on the [REG-Linux Retropad](/configure_a_controller) overlay below:

![gamecube controller overlay](../images/controller-overlays/gamecube-1.png)

### GameCube adapter for Wii U USB passthrough

Use USB passthrough so Dolphin handles GameCube adapters like it does Wii controllers. Create the following udev rule:

```
SUBSYSTEM=="usb", ENV{DEVTYPE}=="usb_device", ATTRS{idVendor}=="057e", ATTRS{idProduct}=="0337", MODE="0666"
```

Save it as `userdata/system/udev/rules.d/51-gcadapter.rules` (a reboot is the simplest way to ensure the rule takes effect). Enable **Custom Pad Profile** and select **GameCube Adapter for Wii U** in Dolphin's controller settings (open Dolphin from the file manager while the adapter is connected so it becomes selectable).

### Custom Pad Profile

Since REG-Linux v31 you can create and save custom GameCube controller profiles in Dolphin. Press `F1` while Dolphin is running through EmulationStation to open the pad options screen. Here you can remap buttons, calibrate sticks and save the profile. Only one profile can be active per port.

Once saved, set **USE PAD PROFILES** (`gamecube.use_pad_profiles`) to **TRUE** and Dolphin will load your layout. Profiles live under `/userdata/system/configs/dolphin-emu/Profiles`.

For more remapping guidance see [/remapping_controls_per_emulator#gamecube](/remapping_controls_per_emulator#gamecube).

## Troubleshooting

### There are infrequent frame-drops in my games despite them running at full-speed most of the time

We recommend enabling **PRE-CACHE SHADERS** (`gamecube.wait_for_shaders`) in the Dolphin advanced options. The first launch takes longer while shaders compile, but later runs should stay smooth.

#### It's still happening!

On very weak hardware, disabling **UBERSHADERS** (`wii.ubershaders`) can reduce stutter even if it sacrifices some visual polish.

### I have X problem with Y game

Dolphin's own wiki is an excellent source for game-specific issues and recommended settings. Search for your title at <https://wiki.dolphin-emu.org/index.php?title=Main_Page>.
