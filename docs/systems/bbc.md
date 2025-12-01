# BBC Micro

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/bbc.webp" alt="BBC Micro icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/bbc.png" alt="BBC Micro logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The BBC Microcomputer System, launched by Acorn Computers in 1981 as part of the BBC’s Computer Literacy Project, became a staple of UK schools and homes. The platform spanned several models—the Model A/B, Master 128, Master Turbo and Master 512—and is celebrated for its robust OS, expandable architecture and educational software like *Granny’s Garden* and *Elite*.

REG-Linux exposes the system via the `bbc` group so compatible themes can use the `bbc` visual set.

## Technical specifications

- Manufacturer: Acorn Computers
- Release year: 1981
- Hardware type: computer

## Supported ROM extensions

`mfi`, `dfi`, `hfe`, `mfm`, `td0`, `imd`, `d77`, `d88`, `1dd`, `cqm`, `cqi`, `dsk`, `ima`, `img`, `ufi`, `360`, `ipf`, `ssd`, `bbc`, `dsd`, `adf`, `ads`, `adm`, `adl`, `fsd`, `wav`, `tap`, `bin`, `zip`, `7z`

## Quick reference

- **Emulator:** MAME
- **ROM folder:** `/userdata/roms/bbc`
- **Accepted formats:** see list above
- **System group:** `bbc`

## BIOS

BBC Micro emulation requires several ROM sets. Copy them (zip/7z archives are accepted) into the `roms/bbc` folder or your global BIOS directory so REG-Linux can discover them:

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `bbcb.zip` | `bios/bbcb.zip` | BBC Model B ROM bundle |
| `bbc_acorn8271.zip` | `bios/bbc_acorn8271.zip` | 8271 floppy controller ROM |
| `saa5050.zip` | `bios/saa5050.zip` | SAA5050 text/graphics chip ROM |

For additional audio support place `bbc.zip` inside `bios/mame/samples` so sample-dependent software can play correctly.

## ROMs

Store BBC Micro games and utilities under `/userdata/roms/bbc`. Use raw disk dumps, tape images or archives; MAME automatically reads supported containers from that folder.

## Emulators

### MAME

MAME (which includes the former MESS project) emulates the BBC Micro driver. Each ROM contains the metadata needed to select the correct driver, so keep your ROM set aligned with your MAME build. Use the in-game **Menu** (`[HOTKEY]` + south button or `Tab`) to remap controls, adjust video or switch disks.

Standardized features exposed via REG-Linux include `bbc.videomode`, `bbc.decoration` and `bbc.padtokeyboard`.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| VIDEO MODE `bbc.video` | Choose BGFX shaders or direct Accel/OpenGL rendering. |
| BGFX GRAPHICS API `bbc.bgfxbackend` | Select the API used by BGFX if enabled (OpenGL, GLES, Vulkan). |
| BGFX VIDEO FILTER `bbc.bgfxshaders` | Apply CRT/smoothing shaders from the BGFX list. |
| CRT SWITCHRES `bbc.switchres` | Use SwitchRes profiles on CRT displays. |
| VERTICAL ROTATION `bbc.rotation` | Rotate output for vertical setups. |
| ALT DPAD MODE `bbc.altdpad` | Adjust D-pad orientation when controllers behave oddly. |
| SPECIAL CONTROL LAYOUTS `bbc.altlayout` | Choose alternate layouts for unique control needs. |
| MEDIA TYPE `bbc.altromtype` | Specify the media you are loading (cassette/disk/ROM). |
| UI KEYS `bbc.enableui` | Enable MAME UI key bindings at launch. |

## Controls

The BBC Micro supported joysticks, paddles and light pens; REG-Linux maps the default layout to a [REG-Linux Retropad](/configure_a_controller):

![bbcmicro controller overlay](../images/controller-overlays/bbcmicro.png)

Use the MAME menu or the `bbc.altlayout` option to mimic special peripherals if required.

## Troubleshooting

- Confirm BIOS archives (`bbcb.zip`, `bbc_acorn8271.zip`, `saa5050.zip`) exist with the correct MD5 checksums.
- Double-check ROMs live under `/userdata/roms/bbc` and use a supported format.
- Use the MAME menu to change media type (cassette vs disk) or load an alternative TAPE/DISK image if a game stalls.
