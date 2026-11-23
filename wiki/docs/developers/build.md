---
title: Build REG Linux
description: Build a REG Linux image from source with Docker or Podman, the make targets, and the build options.
---

# Build REG Linux

REG Linux is a [Buildroot](https://buildroot.org/) external tree. Builds run in
a container, so the only requirements on the host are Git, `make` and Docker or
Podman, plus disk space: a full build of one target takes tens of GB.

## Get the source

```
git clone --recurse-submodules https://github.com/REG-Linux/REG-Linux.git
cd REG-Linux
```

## Build an image

```
make list-targets          # every target, e.g. h700, rk3326, bcm2711, x86_64
make h700-build            # build the h700 target
```

The first build downloads the build container image and all sources, then
builds the toolchain: expect several hours. Later builds reuse the downloads and
`ccache`.

Images end up in
`output/<target>/images/reglinux/images/<board>/`: the
`reglinux-<target>-<board>-<version>-<date>.img.gz` to write to a card, and the
`boot-<board>.tar.zst` used by system updates, each with `.md5` and `.sha256`
files. A target can produce several images (for example `a33` builds
`miyoo-a30`, `pocketgo-s30` and `nes-classic`).

## Useful targets

| Target | What it does |
|---|---|
| `<target>-build` | build the image |
| `<target>-config` | write the Buildroot configuration only |
| `<target>-pkg PKG=<name>` | build one package |
| `<target>-cleanpkg PKG=<name>` | clean one package, so it builds again from scratch |
| `<target>-shell` | open a shell in the build container |
| `<target>-build-errors` | show failed packages and their log paths |
| `<target>-build-log PKG=<name>` | show one package's build log |
| `<target>-monitor` | follow a running build (from another terminal) |
| `<target>-flash DEV=/dev/sdX` | write the image to a card |
| `<target>-clean` | remove the target's output |
| `help`, `vars` | all targets, and the current settings |

## Build options

Set them on the command line (`make DEBUG_BUILD=n h700-build`) or in a
`reglinux.mk` file at the top of the tree.

| Variable | Default | Meaning |
|---|---|---|
| `DEBUG_BUILD` | `y` | debug build; use `n` for release-like images (adds the kernel's no-debug fragment) |
| `CONTAINER` | `docker` | `podman` to use Podman |
| `DL_DIR` | `./dl` | download cache, shared by all targets |
| `OUTPUT_DIR` | `./output` | build output |
| `CCACHE_DIR` | `./buildroot-ccache` | compiler cache |
| `PARALLEL_BUILD` | `y` | parallel build with Buildroot per-package directories |
| `MINI_BUILD` | `n` | build on the minimal base (`configs/reglinux-board.mini`) instead of the full one |
| `BRCACHE` | `n` | restore already-built packages from the build cache |

## Closed-source parts

REG Station (the frontend) and regmsgd (the service that launches emulators and
applies settings) are not open source. Builds download their published binaries
for your target's CPU; nothing else is needed.

## Testing a build

- Write the image to a card and boot it, or update a running system without
  rewriting the card: copy `boot-<board>.tar.zst` to
  `/userdata/system/upgrade/` on the device and run `system-upgrade manual`.
- Logs are in `/userdata/system/logs/` (see [Troubleshooting](../help/troubleshooting.md#logs)).

To add a device, see [Add a board](new-board.md).
