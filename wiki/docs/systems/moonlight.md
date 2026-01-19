# Moonlight Embedded

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/moonlight.webp" alt="Moonlight Embedded icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/moonlight.png" alt="Moonlight Embedded logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

[Moonlight](https://moonlight-stream.org) mirrors NVIDIA GameStream (and Sunshine) to stream PC games to REG-Linux devices. The bundled [Moonlight Embedded](https://github.com/irtimmer/moonlight-embedded) client turns your console into a low-latency receiver for your PC library; it cannot stream from cloud services such as GeForce Now.

## Quick reference

- **ROM folder:** `/userdata/roms/moonlight`
- **Accepted ROM formats:** `.moonlight`
- **Emulator:** `moonlight`
- **System group:** `moonlight`

## Prerequisites

1. Install or enable [Sunshine](https://docs.lizardbyte.dev/projects/sunshine/en/latest/) or another GameStream server on your gaming PC.
2. Ensure the PC has compatible hardware (NVENC for NVIDIA, VAAPI for Intel, VCE for AMD) and launch Sunshine with an accessible username/password.
3. REG-Linux and the PC must share the same LAN/VLAN unless you configure a VPN.

## Pairing and setup

1. SSH into REG-Linux and run `REG-Linux-moonlight list` to discover your Sunshine server.
2. Pair with `REG-Linux-moonlight pair <IP>` and enter the PIN that appears in the terminal into Sunshine’s prompt.
3. After pairing, run `REG-Linux-moonlight init` to generate `.moonlight` launchers, update `gamelist.xml`, and download metadata/artwork.
4. Use `REG-Linux-moonlight scrape` later to refresh the library.

Moonlight writes its library data into `/userdata/system/configs/moonlight/gamelist.txt`.

## Configuration

Streaming resolution, bitrate, and framerate are set via the Advanced System Options menu inside EmulationStation. For fine-grained control, drop a `moonlight.conf` file into `/userdata/system/configs/moonlight/`; the upstream `moonlight.conf` samples at https://github.com/moonlight-stream/moonlight-embedded/blob/master/moonlight.conf provide useful defaults.

On some devices (e.g., Odroid Go Advance), add `platform = sdl` to `moonlight.conf` or select “SDL” as the Preferred AV Decoder to ensure correct orientation.

## Shortcuts

- `Start+Select+L1+R1`: quit session.
- `Start`: open Moonlight settings.
- Hold `Start`: toggle mouse mode.
- `Ctrl+Alt+Shift+Q`: quit on keyboard.
- `Ctrl+Alt+Shift+X`: toggle windowed/full-screen.
- `Ctrl+Alt+Shift+Z`: toggle mouse control.
- `Ctrl+Alt+Shift+S`: toggle performance stats.

## Troubleshooting

- If games do not appear, re-run `REG-Linux-moonlight list` after verifying Sunshine is running.
- Ignore occasional `KeyError: ''` traces; they only signal missing metadata.
- For further help check the generic support pages.
