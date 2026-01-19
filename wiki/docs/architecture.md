---
title: REG Linux System Architecture
description: REG Linux (Retro Emulation Gaming Linux) is an immutable operating system
  built for handhelds, single-board computers, and small form-factor PCs across ARM,...
---

# REG Linux System Architecture

REG Linux (Retro Emulation Gaming Linux) is an immutable operating system built for handhelds, single-board computers, and small form-factor PCs across ARM, AArch64, RISC-V, MIPS32el, and x86_64.
This page gives a user-facing tour of how the system is assembled, how it boots, and how day-to-day services behave without diving into source files.

## 1. Design Principles

- **Immutable core** – The playable system arrives as a compressed SquashFS image. Updates replace the full image, keeping the base system pristine and predictable.
- **Deterministic builds** – Every board compiles from a fixed toolchain and a controlled build recipe, so firmware is reproducible and host-independent.
- **Hardware-aware configuration** – GPU choices, display routing, controller quirks, and case-specific daemons live in board definitions so that each device feels tuned out of the box.
- **Split state** – The root filesystem stays read-only, `/userdata` keeps all player changes, and `/boot` hosts the minimal vendor-friendly slice that also carries upgrades.
- **Message-driven services** – A lightweight IPC daemon lets different parts of the OS exchange commands, allowing hardware control without heavy supervisors.

## 2. Build & Packaging Pipeline

### 2.1 Buildroot external build tree

- Each target inherits a common base that bundles the BusyBox userland, SquashFS tooling, SDL runtimes, various libraries, and the REG Linux system utilities.
- Board descriptions add SoC optimizations, kernel overlays, patches, device trees, and image recipes so that a single definition describes how to produce a flashable image.
- Hardware variants that can share binaries are grouped together, and the build pipeline iterates that list to generate per-device SD-card or eMMC images.

### 2.2 Toolchains and kernel

- Toolchains default to an optimized GCC 14 + glibc stack with link-time optimization, automatic parallelism support, and tuned linker flags.
- Every kernel reuses a shared configuration fragment that enables the HID stack, overlayfs, SquashFS (with LZ4/Zstd), CIFS/KSmbd, performance tooling, and a wide controller driver library.
- Vendor patches and board overlays extend that base so each target ships with the right boot firmware, drivers, and DTS selections.

### 2.3 Post-build and post-image steps

- After the root filesystem is staged, packaging hooks:
  - Compress `lib/modules` and `lib/firmware` into SquashFS updates so they can be swapped atomically.
  - Relocate writable state into `/userdata`, ensuring things like SSH keys, network stacks, and emulation front-ends persist upgrades.
  - Generate the version banner and the `datainit` bundle that seeds `/userdata` on first boot.
- Image hooks then:
  - Copy kernel images, initramfs archives, SquashFS payloads, firmware packs, rescue content, and board-specific configuration into the boot partition.
  - Create bootable disk layouts with per-board partitioning and randomized UUIDs.
  - Produce checksums and per-build reports alongside the final compressed image.

## 3. Boot Flow & Storage Layout

REG Linux images use a MBR or GPT disk with a vendor-friendly VFAT boot partition plus a writable userdata partition.
At power-on the initramfs mounts the boot slice, applies any pending updates, and assembles the read-only root from the SquashFS image plus an in-RAM overlay (optionally filled from a saved overlay file).
Once firmware archives and boot configuration are staged, control passes to BusyBox init.
Updates therefore behave like file swaps on the boot partition, while customizations stay confined to `/userdata` or an optional overlay snapshot.

## 4. Persistent Data & Configuration

### 4.1 `/userdata` mount

- Early boot scripts mount `/userdata` according to the `sharedevice` setting in the boot configuration. Choices include the internal partition, a RAM-backed drive, the first external storage, network shares, or specific UUIDs.
- The mount helper understands ext, btrfs, NTFS (with health checks), exFAT, and performs read/write verification before exposing the share to the rest of the system.
- Utility helpers discover `/boot`, `/userdata`, and their parent disks to assist the updater and redeployment flows.

### 4.2 Data initialization

- A population step compares the expected `datainit` manifest with the live `/userdata` tree. Missing BIOS readme files, controller databases, themes, or configuration templates are extracted automatically.
- The initializer also keeps persistent udev rules, generates a unique machine ID, loads system configuration into memory, and runs board-defined post-share hooks.

### 4.3 Runtime configuration stores

- **Boot configuration** – Read before `/userdata` is available. Controls share selection, autoresize, GPU overrides, and multi-GPU switching.
- **System configuration** – Lives under `/userdata/system` and stores service toggles, audio/video defaults, network credentials, controller behavior, and other runtime preferences.
- **Environment helpers** – Profile snippets route `XDG_*` paths into `/userdata` so desktop applications place caches and configs in the writable area, including controller database overrides.

## 5. Runtime Services & Init

### 5.1 Init system

- REG Linux relies on BusyBox SysV init, with numbered scripts that orchestrate boot:
  - An early helper launches the IPC daemon so other scripts can send hardware commands.
  - Network services (ConnMan and companions) initialize Wi-Fi and optional wired interfaces.
  - Share mounting and population happen before higher-level daemons to guarantee persistent storage is ready.
  - Mid-boot scripts apply CPU governor choices, keyboard layouts, brightness settings, controller modes, and timezone adjustments.
  - Late scripts handle HDMI-CEC standby commands and user-defined services placed under `/userdata/system/services`.

### 5.2 Service selection

- The `system.services` key inside the main configuration lists optional daemons such as file sharing, SSH, log forwarding, or Syncthing.
- A helper command edits that list, while the final init script cross-references built-in service definitions and any user-provided entries.
- Each service honors the classic SysV `start`/`stop`/`restart` lifecycle so new helpers can be added without touching the base image.

## 6. Graphics, Audio, and Input Stack

- SDL2 and SDL3 are built for every target to guarantee consistent controller and display behavior across front-ends.
- Graphics targets are grouped by capability (GLES2, GLES3, Vulkan). Each group selects the right Mesa variant, vendor driver, and compositor stack. Wayland is preferred on capable GPUs, while older boards fall back to SDL or Xorg pipelines.
- Audio uses Batocera-tuned ALSA helpers. Default volume, device selection, and advanced profiles persist in the system configuration file.
- Controllers benefit from the expanded HID kernel fragment plus userspace helpers for arcade sticks, PS3 pads, and handheld-specific layouts. Configuration keys toggle entire controller families without reflashing.

## 7. Gaming & Application Stack

- **Front-end** – REG Linux ships a customized EmulationStation build responsible for display selection, rotation, and launching Wayland or X11 sessions when needed.
- **Standalone emulators** – Flagship engines (DuckStation, PCSX2, PPSSPP, Ryujinx, Vita3K, RPCS3, NS emulation, and more) are bundled as self-contained applications. Each can install shaders, BIOS stubs, or configuration templates into the `datainit` bundle so users always start from sane defaults.
- **RetroArch & libretro** – RetroArch plus its shader packs, assets, and per-core libraries cover lighter systems. Joypad autoconfigs live in `datainit` so handheld controls map properly.
- **Native ports & engines** – Game ports such as OpenJazz, Cannonball, and TheForceEngine install their configs into the shared `datainit` tree to keep saves and tweaks inside `/userdata`.
- **System helpers** – A lightweight configuration generator ties front-ends to emulator settings on a per-game basis, reading metadata from the seeded runtime database.

## 8. Networking & External Storage

- **Storage backends** – The share-mounting framework mixes internal drives, removable media, NAS exports (NFS/CIFS), and even per-folder exports so ROMs, saves, and BIOS files can reside on different devices.
- **Transport services** – Samba/KSmbd, NFS, SSH, wsdd discovery, and Syncthing provide LAN connectivity and syncing. Users pick which ones run through the services list.
- **USB & MTP** – USB mass storage and MTP are enabled globally, allowing `/userdata` to appear as a drive whenever the handheld is connected to a PC.
- **Wireless stacks** – ConnMan with IWD and BlueZ handles Wi-Fi, Bluetooth, and pairing workflows while respecting power-save preferences.

## 9. Updates, Recovery, and Overlay Control

- The system updater fetches per-board archives, verifies checksums, temporarily remounts `/boot` as writable, and unpacks the payload onto that partition.
- During the next boot the initramfs detects the updated payloads, swaps in the new SquashFS root, firmware, and module archives, and flags the update so migrations can run before the system resumes normal service.
- Advanced users can persist manual tweaks inside `/` by saving the RAM overlay to a dedicated ext4 file on the boot partition, then reusing it on subsequent boots.
- A minimal rescue environment lives alongside the main image so devices can flash, update, or repair disks even if the main system fails to boot.

## 10. System Component Overview

REG Linux groups its software into functional domains so you can reason about what is installed on your device:

- **System** – Base OS features: versioning utilities, CLI helpers, bezels, messaging daemons, swap helpers, rescue environment, and Samba integration.
- **Graphics & GPU** – Mesa, vendor binaries, Vulkan layers, and compositor tweaks tailored to each SoC.
- **Emulation & Games** – RetroArch cores, standalone emulator engines, ports, and native games with their assets and shaders.
- **Controllers & Accessories** – Support packages for handheld shells, fan controllers, sensors, lighting, and diagnostics.
- **Networking & Tooling** – Connectivity daemons, optional external toolchains, firmware bundles, and cloud sync helpers.

Each component contributes configuration files to the shared `datainit` tree so freshly flashed systems always seed `/userdata` with the right defaults.

## 11. Board Support Architecture

- Each vendor/board family has its own directory containing:
  - A filesystem overlay for device-specific init scripts, firmware, or configuration files.
  - Patch sets for kernels, bootloaders, and device trees.
  - Boot script templates that decide how kernels, DTBs, and configuration files land inside the boot partition.
  - Disk layout descriptions that define partition sizes, bootloader gaps, and special blobs.
  - Optional helper utilities for flashing, display calibration, or accessory tuning.
- Global overlays house init scripts and configuration shared by every target, while a central directory maintains shared kernel fragments, patches, and module/firmware packagers.

## 12. Developer Entry Points

- **Add a board** – Start from an existing board definition, then adjust toolchain, kernel, and overlay directives while providing matching boot scripts and disk layouts.
- **Tune the base system** – Modify the system configuration defaults, `datainit` content, or version numbering to ship new behavior.
- **Extend runtime services** – Drop new service scripts into the shared services directory so they can be toggled through `system.services`.
- **Build & test** – Run the board-specific `make` target to produce SD images, boot them, verify `/userdata/system/logs/`, and exercise OTA flows via the manual update helper without reflashing hardware.

Through the combination of an immutable base image, a writable userdata volume, and message-driven runtime configuration, REG Linux stays portable across boards while letting players customize behavior safely.
