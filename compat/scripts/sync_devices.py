#!/usr/bin/env python3
"""Sync _data/devices.yml and _data/socs.yml from the REG-Linux board repo.

Reads:
  ~/REG-Linux/configs/reglinux-*.board          → SoC metadata + DTS names
  ~/REG-Linux/package/system/reglinux-system/Config.in.targets → board image paths

Compares with:
  _data/devices.yml   (existing website device entries)
  _data/socs.yml      (existing SoC catalog)

Outputs:
  Updated _data/devices.yml  with new devices appended
  Updated _data/socs.yml     with new SoCs appended
  Sync report on stdout

Run from the website repo root:
    python3 compat/scripts/sync_devices.py [--dry-run]

Set REG_LINUX_PATH env var to override the default ~/REG-Linux path.
"""

import argparse
import os
import re
import sys
from pathlib import Path

import yaml

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).resolve().parents[2]
REG_LINUX = Path(os.environ.get("REG_LINUX_PATH", str(Path.home() / "REG-Linux")))
CONFIGS_DIR = REG_LINUX / "configs"
TARGETS_FILE = REG_LINUX / "package" / "system" / "reglinux-system" / "Config.in.targets"
DEVICES_YML = REPO_ROOT / "_data" / "devices.yml"
SOCS_YML = REPO_ROOT / "_data" / "socs.yml"

# ---------------------------------------------------------------------------
# SoC prefix patterns to strip from DTS names → device slug
# Order matters: more specific patterns first.
# ---------------------------------------------------------------------------
DTS_SOC_PREFIXES = [
    # Amlogic (meson family — must come before shorter patterns)
    r"meson-g12b-a311d-",
    r"meson-gxl-s905\w*-",
    r"meson-gxm-",
    r"meson-gxbb-",
    r"meson-g12a-",
    r"meson-g12b-",
    r"meson-sm1-",
    r"meson8m2-",
    r"meson8-",
    r"s7d_s905x5m_",
    # Allwinner
    r"sun\d+i-h\d+-(?:plus-)?",
    r"sun\d+i-r\d+-",
    r"sun\d+i-t\d+-",
    # Rockchip
    r"rk\d+s?-",
    # Broadcom
    r"bcm\d+-",
    # Qualcomm
    r"(?:qcs|sm|sdm)\d+-",
    # Samsung
    r"exynos\d+-",
    # StarFive
    r"jh\d+-starfive-",
    r"jh\d+-",
    # T-Head
    r"th\d+-",
    # SpacemiT
    r"k1-x_",
    r"k1-",
    r"m1-x_",
    r"x1_",
    # MediaTek
    r"mt\d+-",
    # Apple
    r"t\d{4,}-",
    # NVIDIA
    r"tegra\d+-",
    # Intel FPGA
    r"socfpga_cyclone5_",
]

# Compiled regex: try each prefix pattern
DTS_SOC_PREFIX_RE = re.compile(
    r"^(?:" + "|".join(DTS_SOC_PREFIXES) + r")", re.IGNORECASE
)

# ---------------------------------------------------------------------------
# DTS variant suffixes to strip (PCB revisions / RAM variants, not separate devices)
# ---------------------------------------------------------------------------
VARIANT_SUFFIXES = [
    r"-rev\d+-panel$",
    r"-v\d+-panel$",         # -v2-panel
    r"-v\d+\.\d+\w*$",      # -v1.2a, -v1.3b
    r"-v\d+$",               # -v11
    r"-\d+g$",               # -16g, -4g (RAM variants)
    r"-(?:100m|gbit)$",      # network variants
]
VARIANT_SUFFIX_RE = re.compile("|".join(VARIANT_SUFFIXES))

# ---------------------------------------------------------------------------
# Brand detection from device slug
# ---------------------------------------------------------------------------
BRAND_RULES = [
    # (slug_pattern, brand_name, id_prefix)
    # Order: more specific first
    (r"^anbernic-",       "Anbernic",      "anbernic-"),
    (r"^powkiddy-",       "Powkiddy",      "powkiddy-"),
    (r"^trimui-",         "TrimUI",        "trimui-"),
    (r"^gameforce-",      "Gameforce",     "gameforce-"),
    (r"^magicx-",         "MagicX",        "magicx-"),
    (r"^ayn-",            "Ayn",           "ayn-"),
    (r"^ayaneo-",         "AYANEO",        "ayaneo-"),
    (r"^retroid",         "Retroid",       "retroid-"),
    (r"^rpi-",            "Raspberry",     "raspberry-pi-"),
    (r"^rp\d",            "Retroid",       "retroid-pocket-"),
    (r"^odroid-go",       "HardKernel",    "hardkernel-odroid-go-"),
    (r"^odroid-n",        "HardKernel",    "hardkernel-odroid-n"),
    (r"^odroid-m",        "HardKernel",    "hardkernel-odroid-m"),
    (r"^odroid-c",        "HardKernel",    "hardkernel-odroid-c"),
    (r"^odroidc",         "HardKernel",    "hardkernel-odroid-c"),
    (r"^odroidxu",        "HardKernel",    "hardkernel-odroid-xu"),
    (r"^orangepi-",       "Orange Pi",     "orange-pi-"),
    (r"^bananapi-",       "Banana Pi",     "banana-pi-"),
    (r"^nanopi-",         "FriendlyElec",  "nano-pi-"),
    (r"^khadas-",         "Khadas",        "khadas-"),
    (r"^kvim",            "Khadas",        "khadas-vim-"),
    (r"^vim",             "Khadas",        "khadas-vim-"),
    (r"^radxa-",          "Radxa",         "radxa-"),
    (r"^rock-",           "Radxa",         "radxa-rock-"),
    (r"^rock64",          "Pine64",        "pine64-rock64"),
    (r"^rockpro64",       "Pine64",        "pine64-rockpro64"),
    (r"^quartzpro64",     "Pine64",        "pine64-quartzpro64"),
    (r"^renegade",        "Firefly",       "firefly-renegade"),
    (r"^firefly-",        "Firefly",       "firefly-"),
    (r"^roc-pc$",         "Firefly",       "firefly-roc-pc"),
    (r"^beelink-",        "Beelink",       "beelink-"),
    (r"^gtking",          "Beelink",       "beelink-gt-king"),
    (r"^tinker",          "ASUS",          "asus-tinker-board"),
    (r"^miqi$",           "MQMaker",       "mqmaker-miqi"),
    (r"^miniloong-",      "MiniLoong",     "miniloong-"),
    (r"^visionfive-",     "Starfive",      "starfive-visionfive-"),
    (r"^milkv-",          "Milk-V",        "milk-v-"),
    (r"^milk-",           "Milk-V",        "milk-v-"),
    (r"^lichee-",         "Sipeed",        "sipeed-lichee-"),
    (r"^beaglev-",        "BeagleBoard",   "beaglev-"),
    (r"^musepi-",         "MusePi",        "musepi-"),
    (r"^mangmi-",         "Mangmi",        "mangmi-"),
    (r"^indiedroid-",     "Indiedroid",    "indiedroid-"),
    (r"^mekotronics-",    "Mekotronics",   "mekotronics-"),
    (r"^armsom-",         "ArmSoM",        "armsom-"),
    (r"^xu20-",           "XU",            "xu20-"),
    (r"^ps5000",          "Unbranded",     "unbranded-ps5000"),
    (r"^ps7000",          "Unbranded",     "unbranded-ps7000"),
    (r"^batlexp-",        "BatleXP",       "batlexp-"),
    (r"^nexbox-",         "Nexbox",        "nexbox-"),
    (r"^minix-",          "Minix",         "minix-"),
    (r"^x96-",            "X96",           "x96-"),
    (r"^h96-",            "H96",           "h96-"),
    (r"^a95x",            "A95X",          "a95x-"),
    (r"^xpi-",            "XPi",           "xpi-"),
    (r"^libretech-",      "Libre Computer","libretech-"),
    (r"^wetek-",          "WeTek",         "wetek-"),
    (r"^tronsmart-",      "Tronsmart",     "tronsmart-"),
    (r"^nintendo-",       "Nintendo",      "nintendo-"),
    (r"^odin$",           "Ayn",           "ayn-odin"),
]

# ---------------------------------------------------------------------------
# Device type detection (from device ID)
# ---------------------------------------------------------------------------
TVBOX_PATTERNS = [
    "x96", "h96", "a95x", "tx3", "nexbox", "wetek", "tronsmart",
    "mxiii", "s905-tvbox", "s905x3-tvbox", "beelink",
]

HANDHELD_PATTERNS = [
    "rg", "rgb", "rk2023", "x35", "x55", "xu10", "xu20", "odin",
    "pocket", "steam-deck", "rog-ally", "gameforce", "ayaneo",
    "magicx", "odroid-go", "powkiddy", "game-console", "rk3326-clone",
    "trimui", "miniloong", "mangmi", "batlexp", "ps5000", "ps7000",
    "retroid",
]

SBC_PATTERNS = [
    "raspberry-pi", "banana-pi", "orange-pi", "nano-pi", "khadas",
    "radxa", "firefly", "hardkernel-odroid-c", "hardkernel-odroid-m",
    "hardkernel-odroid-n", "hardkernel-odroid-xu",
    "milk-v", "starfive", "mqmaker", "asus-tinker",
    "pine64", "indiedroid", "mekotronics", "armsom", "beaglev",
    "sipeed", "musepi", "libretech", "minix",
]

CONSOLE_PATTERNS = ["capcom", "nes-classic", "snes-classic", "nintendo"]

PC_PATTERNS = ["steam-deck", "rog-ally", "ayaneo"]

# Map .board file SoC target name → arch string for socs.yml
BOARD_ARCH_MAP = {
    "H3": "armv7", "CHA": "armv7", "MINI": "armv7",
    "SUN50I": "aarch64", "H616": "aarch64", "H700": "aarch64",
    "A133": "aarch64", "T527": "aarch64",
    "S812": "armv7",
    "S905": "aarch64", "S905GEN2": "aarch64", "S905GEN3": "aarch64",
    "S922X": "aarch64", "S9GEN4": "aarch64", "A3GEN2": "aarch64",
    "ODROIDC5": "aarch64",
    "RK3128": "armv7", "RK3288": "armv7",
    "RK3326": "aarch64", "RK3328": "aarch64", "RK3399": "aarch64",
    "RK3568": "aarch64", "RK3588": "aarch64",
    "BCM2835": "armv7", "BCM2836": "armv7", "BCM2837": "aarch64",
    "BCM2711": "aarch64", "BCM2712": "aarch64",
    "XU4": "armv7",
    "X86": "x86", "X86_64": "x86_64", "X86_64_V3": "x86_64",
    "SDM845": "aarch64", "SM6115": "aarch64", "QCS6490": "aarch64",
    "SM8250": "aarch64", "SM8550": "aarch64",
    "MT8395": "aarch64",
    "JH7110": "riscv64", "K1": "riscv64", "TH1520": "riscv64",
    "ASAHI": "aarch64", "L4T": "aarch64",
    "JZ4770": "mipsel", "DE10NANO": "armv7",
}

# Map .board CPU flag → human-readable model string
CPU_MODEL_MAP = {
    "cortex_a7": "Cortex-A7",
    "cortex_a9": "Cortex-A9",
    "cortex_a15_a7": "Cortex-A15/A7",
    "cortex_a17": "Cortex-A17",
    "cortex_a35": "Cortex-A35",
    "cortex_a53": "Cortex-A53",
    "cortex_a55": "Cortex-A55",
    "cortex_a57": "Cortex-A57",
    "cortex_a72": "Cortex-A72",
    "cortex_a72_a53": "Cortex-A72/A53",
    "cortex_a73_a53": "Cortex-A73/A53",
    "cortex_a75_a55": "Cortex-A75/A55",
    "cortex_a76": "Cortex-A76",
    "cortex_a76_a55": "Cortex-A76/A55",
    "cortex_x3": "Cortex-X3",
}

# Map GPU driver flag → human-readable string
GPU_DRIVER_MAP = {
    "PANFROST_MESA3D": "Mesa3D (Panfrost)",
    "LIMA_MESA3D": "Mesa3D (Lima)",
    "FREEDRENO_MESA3D": "Mesa3D (Freedreno)",
    "GPU_X86": "Mesa3D",
    "RPI_MESA3D": "Mesa3D (V3D)",
    "POWERVR_GE8300_DRIVER": "PowerVR GE8300",
    "IMG_GPU_POWERVR": "IMG PowerVR",
    "ODROIDC5_LIBMALI": "libmali",
    "MESA3D_VULKAN_DRIVER_IMAGINATION": "Mesa3D (Imagination)",
}

# Map board target → SoC display name (for new socs.yml entries)
# Only needed for SoCs NOT already in socs.yml.
SOC_DISPLAY_NAMES = {
    "H3": ("Allwinner", "H3"),
    "CHA": ("Allwinner", "H3"),
    "MINI": ("Allwinner", "R16"),
    "SUN50I": ("Allwinner", "H5/H6"),
    "H616": ("Allwinner", "H616"),
    "H700": ("Allwinner", "H700"),
    "A133": ("Allwinner", "A133"),
    "T527": ("Allwinner", "T527"),
    "S812": ("Amlogic", "S812"),
    "S905": ("Amlogic", "S905(X)"),
    "S905GEN2": ("Amlogic", "S912"),
    "S905GEN3": ("Amlogic", "S905X3"),
    "S922X": ("Amlogic", "S922X"),
    "S9GEN4": ("Amlogic", "S905Y4"),
    "A3GEN2": ("Amlogic", "A311D2"),
    "ODROIDC5": ("Amlogic", "S905X5M"),
    "RK3128": ("Rockchip", "RK3128"),
    "RK3288": ("Rockchip", "RK3288"),
    "RK3326": ("Rockchip", "RK3326"),
    "RK3328": ("Rockchip", "RK3328"),
    "RK3399": ("Rockchip", "RK3399"),
    "RK3568": ("Rockchip", "RK3566/RK3568"),
    "RK3588": ("Rockchip", "RK3588"),
    "BCM2835": ("Broadcom", "BCM2835"),
    "BCM2836": ("Broadcom", "BCM2836"),
    "BCM2837": ("Broadcom", "BCM2837"),
    "BCM2711": ("Broadcom", "BCM2711"),
    "BCM2712": ("Broadcom", "BCM2712"),
    "XU4": ("Samsung", "Exynos 5422"),
    "X86_64": ("AMD/Intel", "x86_64"),
    "X86_64_V3": ("AMD/Intel", "x86_64-v3"),
    "SDM845": ("Qualcomm", "SDM845"),
    "SM6115": ("Qualcomm", "SM6115"),
    "QCS6490": ("Qualcomm", "QCS6490"),
    "SM8250": ("Qualcomm", "SD865 (SM8250)"),
    "SM8550": ("Qualcomm", "8gen2 (SM8550)"),
    "MT8395": ("MediaTek", "Genio 1200 (MT8395)"),
    "JH7110": ("StarFive", "JH7110"),
    "K1": ("SpacemiT", "K1"),
    "TH1520": ("T-Head", "TH1520"),
    "ASAHI": ("Apple", "M1/M2"),
    "L4T": ("NVIDIA", "Tegra X1"),
    "JZ4770": ("Ingenic", "JZ4770"),
    "DE10NANO": ("Intel", "Cyclone V"),
}

# Map board target → existing socs.yml slug (for targets that use a different
# naming convention than the straightforward lowercase-hyphenated form).
SOC_TARGET_TO_SLUG = {
    "H3": "allwinner-h3",
    "CHA": "allwinner-h3",
    "MINI": "allwinner-r16",
    "SUN50I": "allwinner-sun50i",
    "H616": "allwinner-h616",
    "H700": "allwinner-h700",
    "A133": "allwinner-a133",
    "T527": "allwinner-t527",
    "S812": "amlogic-s812",
    "S905": "amlogic-s905-x",
    "S905GEN2": "amlogic-s912",
    "S905GEN3": "amlogic-s905x3",
    "S922X": "amlogic-s922x",
    "S9GEN4": "amlogic-s905y4",
    "A3GEN2": "amlogic-a311d2",
    "ODROIDC5": "amlogic-s905x5m",
    "RK3128": "rockchip-rk3128",
    "RK3288": "rockchip-rk3288",
    "RK3326": "rockchip-rk3326",
    "RK3328": "rockchip-rk3328",
    "RK3399": "rockchip-rk3399",
    "RK3568": "rockchip-rk3566",   # board covers both rk3566 and rk3568
    "RK3588": "rockchip-rk3588",
    "BCM2835": "broadcom-bcm2835",
    "BCM2836": "broadcom-bcm2836",
    "BCM2837": "broadcom-bcm2837",
    "BCM2711": "broadcom-bcm2711",
    "BCM2712": "broadcom-bcm2712",
    "XU4": "samsung-exynos-5422",
    "X86_64": "amd-zen-2-apu",
    "X86_64_V3": "amd-ryzen-z1",
    "SDM845": "qualcomm-sdm845",
    "SM6115": "qualcomm-sm6115",
    "QCS6490": "qualcomm-qcs6490",
    "SM8250": "qualcomm-sd865-sm8250",
    "SM8550": "qualcomm-8gen2-sm8550",
    "MT8395": "genio-1200-mt8395",
    "JH7110": "starfive-jh7110",
    "K1": "spacemit-k1",
    "TH1520": "th1520",
    "ASAHI": "apple-m1",
    "L4T": "nvidia-tegra-x1",
    "JZ4770": "ingenic-jz4770",
    "DE10NANO": "intel-cyclone-v",
}

# NA features by device type
NA_BY_TYPE = {
    "sbc":      ["battery", "analog_sticks", "buttons", "suspend", "rumble"],
    "handheld": ["ethernet"],
    "console":  ["analog_sticks", "ethernet", "battery"],
    "pc":       ["battery", "buttons", "analog_sticks"],
}

# ---------------------------------------------------------------------------
# Manual overrides: DTS device slug → devices.yml ID
# For cases where heuristic derivation fails.
# ---------------------------------------------------------------------------
MANUAL_DTS_TO_DEVICE_ID = {
    # -----------------------------------------------------------------------
    # Broadcom RPi (DTS uses bcm27xx naming)
    # -----------------------------------------------------------------------
    "rpi-b": "raspberry-pi-a-a-b-b",
    "rpi-b-plus": "raspberry-pi-a-a-b-b",
    "rpi-cm": None,                  # skip: compute module
    "rpi-zero": "raspberry-pi-zero",
    "rpi-zero-w": "raspberry-pi-zero",
    "rpi-2-b": "raspberry-pi-2",
    "rpi-zero-2-w": "raspberry-pi-zero-2",
    "rpi-3-b": "raspberry-pi-3",
    "rpi-3-b-plus": "raspberry-pi-3",
    "rpi-cm3": None,                 # skip: compute module
    "rpi-4-b": "raspberry-pi-4",
    "rpi-400": "raspberry-pi-400",
    "rpi-cm4": None,                 # skip: compute module
    "rpi-cm4s": None,
    "rpi-cm4-io": None,
    "rpi-5-b": "raspberry-pi-5",

    # -----------------------------------------------------------------------
    # Allwinner H700 (anbernic-h700 umbrella image)
    # -----------------------------------------------------------------------
    "anbernic-rg28xx": "anbernic-rg28xx",
    "anbernic-rg34xx": "anbernic-rg34xx",
    "anbernic-rg34xx-sp": None,        # variant
    "anbernic-rg35xx-2024": "anbernic-rg35xx-2024",
    "anbernic-rg35xx-h": "anbernic-rg35xx-h",
    "anbernic-rg35xx-plus": "anbernic-rg35xx-plus",
    "anbernic-rg35xx-pro": "anbernic-rg35xx-pro",
    "anbernic-rg35xx-sp": "anbernic-rg35xx-sp",
    "anbernic-rg40xx-h": "anbernic-rg40xx-h",
    "anbernic-rg40xx-v": "anbernic-rg40xx-v",
    "anbernic-rgcubexx": "anbernic-rg-cubexx",

    # -----------------------------------------------------------------------
    # Allwinner H3 — naming normalization
    # -----------------------------------------------------------------------
    "orangepi-pc": "orange-pi-pc",
    "orangepi-pc-plus": "orange-pi-pc-plus",
    "orangepi-one": "orange-pi-one",
    "orangepi-plus2e": "orange-pi-plus-2e",
    "bananapi-m2-zero": "banana-pi-m2-zero",

    # -----------------------------------------------------------------------
    # Allwinner H3 / CHA / MINI — special board targets
    # -----------------------------------------------------------------------
    "libretech-all-h3-cc": "libretech-tritium-h5",

    "nintendo-nes-classic": "nintendo-nes-classic",
    "nintendo-super-nes-classic": "nintendo-snes-classic",

    # -----------------------------------------------------------------------
    # Allwinner SUN50I (H5/H6)
    # -----------------------------------------------------------------------
    "orangepi-pc2": "orange-pi-pc-2",
    "orangepi-3-lts": "orange-pi-3-lts",
    "orangepi-3": "orange-pi-3",
    "orangepi-one-plus": "orange-pi-one-plus",

    # -----------------------------------------------------------------------
    # Allwinner H616/H618
    # -----------------------------------------------------------------------
    "orangepi-zero2": "orange-pi-zero-2",
    "orangepi-zero3": "orange-pi-zero-3",
    "orangepi-zero2w": "orange-pi-zero-2w",
    "bananapi-m4berry": "banana-pi-m4-berry",
    "bananapi-m4zero": "banana-pi-m4-zero",
    "mangopi-mqquad": None,            # skip: not a retrogaming device
    "x96-mate": "x96-mate",

    # -----------------------------------------------------------------------
    # Allwinner T527
    # -----------------------------------------------------------------------
    "orangepi-4a": "orange-pi-4a",

    # -----------------------------------------------------------------------
    # Allwinner A133 (no DTS in board file — these are BSP kernel)
    # -----------------------------------------------------------------------

    # -----------------------------------------------------------------------
    # Rockchip RK3326 multi-device image
    # -----------------------------------------------------------------------
    "odroid-go2": "hardkernel-odroid-go-advance",
    "odroid-go3": "hardkernel-odroid-go-super",
    "gameforce-chi": "gameforce-chi",
    "anbernic-rg351m": "anbernic-rg351-p-m-mp",
    "anbernic-rg351v": "anbernic-rg351v",
    "batlexp-g350": "batlexp-g350",

    # -----------------------------------------------------------------------
    # Rockchip RK3128
    # -----------------------------------------------------------------------
    "evb": None,                       # skip: reference board
    "xpi-3128": "xpi-3128",
    "ps5000": "unbranded-ps5000",
    "ps7000": "unbranded-ps7000",

    # -----------------------------------------------------------------------
    # Rockchip RK3288
    # -----------------------------------------------------------------------
    "tinker": "asus-tinker-board-s",
    "tinker-s": "asus-tinker-board-s",
    "miqi": "mqmaker-miqi",

    # -----------------------------------------------------------------------
    # Rockchip RK3328
    # -----------------------------------------------------------------------
    "rock64": "pine64-rock64",
    "roc-cc": "firefly-renegade",

    # -----------------------------------------------------------------------
    # Rockchip RK3399
    # -----------------------------------------------------------------------
    "anbernic-rg552": "anbernic-rg552",
    "orangepi-800": "orange-pi-800",
    "rockpro64": "pine64-rockpro64",
    "rock960": "vamrs-rock960",
    "rock-pi-4b": "radxa-rock-pi-4",
    "orangepi-4-lts": "orange-pi-4-lts",
    "nanopi-m4v2": "nano-pi-m4v2",
    "hugsun-x99": "hugsun-x99",
    "tinker-2": "asus-tinker-board-2",

    # -----------------------------------------------------------------------
    # Rockchip RK3568/RK3566 — anbernic-rgxx3 umbrella + other boards
    # -----------------------------------------------------------------------
    "anbernic-rg-ds": "anbernic-rg-ds",
    "anbernic-rg-arc-d": "anbernic-rgarc",
    "anbernic-rg-arc-s": None,         # variant of rgarc
    "powkiddy-rgb10max3": "powkiddy-rgb10-max-3",
    "powkiddy-x55": "powkiddy-x55",
    "powkiddy-rgb20sx": "powkiddy-rgb20sx",
    "powkiddy-rgb30": "powkiddy-rgb30",
    "powkiddy-rk2023": "powkiddy-rk2023",
    "odroid-m1s": "hardkernel-odroid-m1s",
    "rock-3a": "radxa-rock-3a",
    "rock-3c": "radxa-rock-3c",
    "odroid-m1": "hardkernel-odroid-m1",
    "roc-pc": "firefly-roc-pc",        # covers rk3566-roc-pc and rk3568-roc-pc
    "anbernic-rg353p": "anbernic-rg353p-s",
    "anbernic-rg353ps": None,          # variant
    "anbernic-rg353v": "anbernic-rg353v-s",
    "anbernic-rg353vs": None,          # variant
    "anbernic-rg353m": "anbernic-rg353m",
    "anbernic-rg503": "anbernic-rg503",
    "miniloong-pocket1": "miniloong-pocket1",

    # -----------------------------------------------------------------------
    # Rockchip RK3588
    # -----------------------------------------------------------------------
    "gameforce-ace": "gameforce-ace",
    "orangepi-5": "orange-pi-5",
    "orangepi-5b": "orange-pi-5b",
    "orangepi-5-plus": "orange-pi-5-plus",
    "orangepi-5-max": "orange-pi-5-max",
    "orangepi-5-ultra": "orange-pi-5-ultra",
    "rock-5a": "radxa-rock-5a",
    "rock-5b": "radxa-rock-5b",
    "rock-5c": "radxa-rock-5c",
    "rock-5-itx": "radxa-rock-5-itx",
    "indiedroid-nova": "indiedroid-nova",
    "khadas-edge2": "khadas-edge-2",
    "odroid-m2": "hardkernel-odroid-m2",
    "quartzpro64": "pine64-quartzpro64",
    "armsom-sige7": "armsom-sige7",
    "bananapi-m7": "banana-pi-m7",

    # -----------------------------------------------------------------------
    # Amlogic S812
    # -----------------------------------------------------------------------
    "mxiii": "amlogic-mxiii",
    "mxiii-plus": "amlogic-mxiii-plus",
    "m8s": None,
    "m8s-plus": None,
    "wetek-core": "wetek-core",
    "minix-neo-x8": "minix-neo-x8",
    "tronsmart-s82": "tronsmart-s82",

    # -----------------------------------------------------------------------
    # Amlogic S905 family
    # -----------------------------------------------------------------------
    "nanopi-k2": "nano-pi-k2",
    "odroidc2": "hardkernel-odroid-c2",
    "nexbox-a95x": "nexbox-a95x",
    "p231": None,                      # skip: reference board
    "p230": None,                      # skip: reference board
    "tx3-mini": "tx3-mini",
    "p212": None,                      # skip: reference board
    "p281": None,                      # skip: reference board
    "libretech-cc": "libretech-lepotato",
    "khadas-vim": "khadas-vim-1",
    "libretech-cc-v2": "libretech-lepotato-v2",
    "minix-neo-u1": "minix-neo-u1",

    # -----------------------------------------------------------------------
    # Amlogic S905gen2
    # -----------------------------------------------------------------------
    "radxa-zero": "radxa-zero",
    "khadas-vim2": "khadas-vim-2",
    "nexbox-a1": "nexbox-a1",
    "q200": None,                      # skip: reference board
    "q201": None,
    "s912-libretech-pc": "libretech-s912-pc",
    "vega-s96": "tronsmart-vega-s96",

    # -----------------------------------------------------------------------
    # Amlogic S905gen3
    # -----------------------------------------------------------------------
    "odroid-c4": "hardkernel-odroid-c4",
    "khadas-vim3l": "khadas-vim-3l",
    "bananapi-m5": "banana-pi-m5",
    "h96-max": "h96-max",
    "sei610": None,                    # skip: reference board
    "x96-air": "x96-air",
    "x96-air-gbit": None,             # variant
    "a95xf3-air": "a95xf3-air",
    "a95xf3-air-gbit": None,          # variant
    "x96-max-plus": "x96-max-plus",
    "x96-max-plus-100m": None,        # variant
    "x96-max-plus-2101": None,        # variant

    # -----------------------------------------------------------------------
    # Amlogic S922X
    # -----------------------------------------------------------------------
    "odroid-n2": "hardkernel-odroid-n2",
    "odroid-n2-plus": "hardkernel-odroid-n2-plus",
    "odroid-n2l": "hardkernel-odroid-n2l",
    "khadas-vim3": "khadas-vim-3",
    "gtking": "beelink-gt-king",
    "gtking-pro": "beelink-gt-king-pro",
    "radxa-zero2": "radxa-zero-2",
    "odroid-go-ultra": "hardkernel-odroid-go-ultra",
    "bananapi-m2s": "banana-pi-m2s",

    # -----------------------------------------------------------------------
    # Amlogic special: S9GEN4, A3GEN2, ODROIDC5
    # -----------------------------------------------------------------------
    "kvim1s": "khadas-vim-1s",
    "kvim4": "khadas-vim-4",
    "kvim4n": None,                    # variant
    "odroidc5": "hardkernel-odroid-c5",

    # -----------------------------------------------------------------------
    # Samsung
    # -----------------------------------------------------------------------
    "odroidxu4": "hardkernel-odroid-xu3-xu4",

    # -----------------------------------------------------------------------
    # Qualcomm SM8550
    # -----------------------------------------------------------------------
    "ayn-odin2": "ayn-odin2",
    "ayn-odin2mini": "ayn-odin2-mini",
    "ayn-odin2portal": "ayn-odin2-portal",
    "ayn-thor": "ayn-thor",
    "ayaneo-ps": "ayaneo-pockets",
    "ayaneo-pocketace": "ayaneo-pocket-ace",
    "ayaneo-pocketdmg": "ayaneo-pocket-dmg",
    "ayaneo-pocketds": "ayaneo-pocket-ds",
    "ayaneo-pocketevo": "ayaneo-pocket-evo",
    "retroidpocket-rp6": "retroid-pocket-6",
    "retroidpocket-rp6-top-dpad": None,  # variant

    # Qualcomm SM8250
    "retroidpocket-rp5": "retroid-pocket-5",
    "retroidpocket-rpmini": "retroid-pocket-mini",
    "retroidpocket-flip2": "retroid-pocket-flip2",

    # Qualcomm SDM845
    "ayn-odin": "ayn-odin",

    # Qualcomm SM6115
    "mangmi-air-x": "mangmi-air-x",

    # Qualcomm QCS6490
    "radxa-dragon-q6a": "radxa-dragon-q6a",

    # -----------------------------------------------------------------------
    # MediaTek MT8395
    # -----------------------------------------------------------------------
    "radxa-nio-12l": "radxa-nio-12l",

    # -----------------------------------------------------------------------
    # StarFive JH7110
    # -----------------------------------------------------------------------
    "visionfive-2": "starfive-visionfive-2",

    # -----------------------------------------------------------------------
    # T-Head TH1520
    # -----------------------------------------------------------------------
    "milkv-meles": "milk-v-meles",
    "lichee-pi-4a": "sipeed-lichee-pi-4a",
    "beaglev-ahead": "beaglev-ahead",

    # -----------------------------------------------------------------------
    # SpacemiT K1
    # -----------------------------------------------------------------------
    "bananapi-f3": "banana-pi-f3",
    "orangepi-rv2": "orange-pi-rv2",
    "milkv-jupiter": "milk-v-jupiter",
    "musepi-pro": "musepi-pro",
    "orangepi-r2s": "orange-pi-r2s",
    "deb1": None,                      # skip: dev board

    # -----------------------------------------------------------------------
    # Apple Asahi (Mac models — group as single generic entry)
    # All t8xxx/t6xxx DTS → skip individual, we add one "asahi" entry
    # -----------------------------------------------------------------------
    "j274": None, "j293": None, "j313": None, "j456": None, "j457": None,
    "j314s": None, "j314c": None, "j316s": None, "j316c": None,
    "j375c": None, "j375d": None,
    "j413": None, "j415": None, "j473": None, "j493": None,
    "j414s": None, "j414c": None, "j416s": None, "j416c": None,
    "j474s": None, "j475c": None, "j475d": None, "j180d": None,

    # -----------------------------------------------------------------------
    # NVIDIA L4T
    # -----------------------------------------------------------------------
    "p3450-0000": "nvidia-jetson-nano",

    # -----------------------------------------------------------------------
    # Intel DE10Nano
    # -----------------------------------------------------------------------
    "de10_nano": "intel-de10nano",

    # -----------------------------------------------------------------------
    # Ingenic JZ4770 (retro handhelds — these are niche, add the notable ones)
    # -----------------------------------------------------------------------
    "gcw0": "gcw-zero",
    "gcw0_proto": None,                # variant
    "pocketgo2": "pocketgo-2",
    "pocketgo2v2": None,               # variant
    "rg280m": "anbernic-rg280m",
    "rg280v": "anbernic-rg280v",
    "rg300": "anbernic-rg300",
    "rg300x": "anbernic-rg300x",
    "rg350": "anbernic-rg350",
    "rg350m": "anbernic-rg350m",
    "rs97": "rs97",

    # -----------------------------------------------------------------------
    # DTS-less devices in devices.yml (use generic image, no own DTS)
    # These are NOT in the board DTS → will show as "stale" but are valid.
    # The script handles them via KNOWN_DTS_LESS_DEVICES below.
    # -----------------------------------------------------------------------
}

# Devices that exist in devices.yml but share a generic image without their own
# DTS entry. These should NOT be flagged as stale.
KNOWN_DTS_LESS_DEVICES = {
    # rk3326 generic image — many clone handhelds detected at boot
    "powkiddy-rgb10",
    "powkiddy-rgb10x",
    "powkiddy-xu10",
    "powkiddy-rgb20-pro",
    "powkiddy-rgb10-max-3-pro",
    "powkiddy-x35h",
    "powkiddy-x35s",
    "magicx-xu-mini-m",
    "unbranded-game-console-r33s",
    "unbranded-game-console-r35s-r36s",
    "unbranded-rk3326-clones",
    # x86_64 generic image
    "steam-deck",
    "asus-rog-ally",
    # StarFive JH7110 — milk-v-mars uses same image as visionfive-2
    "milk-v-mars",
    # Firefly long names in devices.yml map to roc-pc DTS
    "firefly-station-m2-roc-rk3566-pc",
    "firefly-station-m3-roc-rk3588s-pc",
    "firefly-station-p2-roc-rk3568-pc",
    # CHA image (Capcom Home Arcade uses libretech-all-h3-cc DTS)
    "capcom-home-arcade",
    # Custom DTS added by board overlay, not in main .board DTS list
    "anbernic-rg552",       # rk3399 board overlay DTS
    "anbernic-rg353m",      # rk3568 board, shares DTS with rg353v
    "banana-pi-m7",         # rk3588 board overlay DTS
}


# ---------------------------------------------------------------------------
# Parsing functions
# ---------------------------------------------------------------------------

def parse_board_file(path: Path) -> dict:
    """Parse a reglinux-*.board file and extract SoC metadata."""
    text = path.read_text()
    info = {"file": path.name}

    # Architecture
    if "BR2_aarch64=y" in text:
        info["br2_arch"] = "aarch64"
    elif "BR2_arm=y" in text:
        info["br2_arch"] = "arm"
    elif "BR2_riscv=y" in text:
        info["br2_arch"] = "riscv"
    elif "BR2_x86_64=y" in text:
        info["br2_arch"] = "x86_64"
    elif "BR2_mipsel=y" in text:
        info["br2_arch"] = "mipsel"

    # CPU model
    m = re.search(r'BR2_(cortex_\w+)=y', text)
    if m:
        info["cpu_flag"] = m.group(1)
        info["cpu_model"] = CPU_MODEL_MAP.get(m.group(1), m.group(1))

    # Kernel version
    m = re.search(r'BR2_LINUX_KERNEL_CUSTOM_VERSION_VALUE="([^"]+)"', text)
    if m:
        info["kernel"] = m.group(1)

    # DTS names
    m = re.search(r'BR2_LINUX_KERNEL_INTREE_DTS_NAME="([^"]+)"', text)
    if m:
        info["dts_names"] = m.group(1).split()
    else:
        info["dts_names"] = []

    # GPU driver
    for flag, driver in GPU_DRIVER_MAP.items():
        if f"BR2_PACKAGE_{flag}=y" in text or f"BR2_PACKAGE_SYSTEM_{flag}=y" in text:
            info["gpu_driver"] = driver
            break

    # SoC target
    m = re.search(r'BR2_PACKAGE_SYSTEM_TARGET_(\w+)=y', text)
    if m:
        info["target"] = m.group(1)

    return info


def parse_config_in_targets(path: Path) -> dict[str, list[str]]:
    """Parse Config.in.targets → {soc_target: [board_image_path, ...]}."""
    text = path.read_text()
    result: dict[str, list[str]] = {}

    # Match: default "path1 path2 ..." ... if BR2_PACKAGE_SYSTEM_TARGET_XXX
    # Handle multi-line defaults (backslash continuation)
    # Join continued lines first
    joined = re.sub(r'\\\n\s*', ' ', text)

    for m in re.finditer(
        r'default\s+"([^"]+)"\s+if\s+BR2_PACKAGE_SYSTEM_TARGET_(\w+)',
        joined,
    ):
        paths_str, target = m.group(1), m.group(2)
        board_paths = paths_str.strip().split()
        result.setdefault(target, []).extend(board_paths)

    return result


def strip_dts_soc_prefix(dts_name: str) -> str:
    """Strip the vendor directory and SoC chip prefix from a DTS name.

    'allwinner/sun50i-h700-anbernic-rg28xx' → 'anbernic-rg28xx'
    'rockchip/rk3326-odroid-go2'            → 'odroid-go2'
    'amlogic/meson-g12b-a311d-khadas-vim3'  → 'khadas-vim3'
    """
    # Strip vendor directory prefix
    if "/" in dts_name:
        dts_name = dts_name.rsplit("/", 1)[-1]

    # Strip SoC chip prefix
    result = DTS_SOC_PREFIX_RE.sub("", dts_name)
    return result if result else dts_name


def is_variant_dts(slug: str) -> bool:
    """Check if a DTS slug is a hardware revision variant, not a distinct device."""
    return bool(VARIANT_SUFFIX_RE.search(slug))


def dedupe_slug(slug: str) -> str:
    """Strip variant suffixes to get the canonical device slug."""
    return VARIANT_SUFFIX_RE.sub("", slug)


def detect_type(device_id: str) -> str:
    """Detect device type from its ID."""
    for pat in PC_PATTERNS:
        if pat in device_id:
            return "pc"
    for pat in TVBOX_PATTERNS:
        if pat in device_id:
            return "tvbox"
    for pat in HANDHELD_PATTERNS:
        if pat in device_id:
            return "handheld"
    for pat in SBC_PATTERNS:
        if pat in device_id:
            return "sbc"
    for pat in CONSOLE_PATTERNS:
        if pat in device_id:
            return "console"
    return "unknown"


def slug_to_device_id(slug: str) -> str:
    """Convert a DTS-derived device slug to a devices.yml ID using brand rules."""
    for pattern, _brand, prefix in BRAND_RULES:
        if re.match(pattern, slug):
            # Remove the matched part from slug and prepend the prefix
            remainder = re.sub(pattern, "", slug)
            device_id = prefix + remainder
            # Clean up: collapse hyphens, strip trailing
            device_id = re.sub(r"-+", "-", device_id).strip("-")
            return device_id
    # Fallback: use slug as-is
    return slug


def slug_to_brand(slug: str) -> str:
    """Extract brand name from a device slug."""
    for pattern, brand, _prefix in BRAND_RULES:
        if re.match(pattern, slug):
            return brand
    return "Unknown"



# Words that should stay uppercase in titles
UPPERCASE_WORDS = {
    "lts", "nes", "snes", "itx", "sbc", "pc", "usb", "otg", "ds", "sp",
    "ddr", "rgb", "hdmi", "gpu", "cpu", "sd", "tv", "rk", "gba", "nds",
}

# Brand-specific model prefixes to keep in the title
# e.g. Radxa "Rock 5C" not just "5C"
BRAND_MODEL_PREFIXES = {
    "Radxa": "Rock",
    "Pine64": "",
}

def slug_to_title(slug: str, brand: str) -> str:
    """Generate a human-readable title from device slug and brand."""
    # Remove brand prefix from slug to avoid duplication
    title_part = slug
    for pattern, _b, _p in BRAND_RULES:
        if re.match(pattern, slug):
            title_part = re.sub(pattern, "", slug)
            break

    # For brands with model prefix (e.g. Radxa → keep "Rock" in title)
    model_prefix = BRAND_MODEL_PREFIXES.get(brand, "")

    # Split into words
    words = title_part.replace("-", " ").split()

    # Title-case with acronym preservation
    titled_words = []
    for w in words:
        if w.lower() in UPPERCASE_WORDS:
            titled_words.append(w.upper())
        elif re.match(r'^[a-z]*\d', w):
            # Mixed alpha-numeric like "rg35xx" → uppercase
            titled_words.append(w.upper())
        else:
            titled_words.append(w.title())

    titled = " ".join(titled_words)

    # Prepend model prefix if needed and not already present
    if model_prefix and not titled.lower().startswith(model_prefix.lower()):
        titled = f"{model_prefix} {titled}"

    # Split concatenated ALL-CAPS words with digits: "ODIN2MINI" → "ODIN2 MINI"
    # Only split when a digit is followed by 3+ uppercase letters (a new word)
    titled = re.sub(r'(\d)([A-Z]{3,})', r'\1 \2', titled)
    # Split camelCase: "OdinMini" → "Odin Mini"
    titled = re.sub(r'([a-z])([A-Z])', r'\1 \2', titled)

    return f"{brand} {titled}".strip()


# ---------------------------------------------------------------------------
# Main sync logic
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Sync devices.yml from REG-Linux repo")
    parser.add_argument("--dry-run", action="store_true", help="Report only, don't write files")
    args = parser.parse_args()

    # --- Load existing data ---
    print("Loading existing devices.yml and socs.yml...")
    with open(DEVICES_YML) as f:
        existing_devices: dict = yaml.safe_load(f) or {}
    with open(SOCS_YML) as f:
        existing_socs: dict = yaml.safe_load(f) or {}

    # --- Parse board files ---
    print("Parsing .board files...")
    board_info: dict[str, dict] = {}
    for board_file in sorted(CONFIGS_DIR.glob("reglinux-*.board")):
        info = parse_board_file(board_file)
        target = info.get("target")
        if target:
            board_info[target] = info

    print(f"  Found {len(board_info)} SoC targets")

    # --- Parse Config.in.targets ---
    print("Parsing Config.in.targets...")
    target_boards = parse_config_in_targets(TARGETS_FILE)
    total_images = sum(len(v) for v in target_boards.values())
    print(f"  Found {total_images} board image paths across {len(target_boards)} targets")

    # --- Build complete device list from DTS ---
    print("\nBuilding device list from DTS names...")
    dts_devices: dict[str, dict] = {}  # canonical_slug → {target, dts, device_id, ...}

    for target, info in board_info.items():
        for dts_name in info.get("dts_names", []):
            slug = strip_dts_soc_prefix(dts_name)

            # Strip variant suffixes to get canonical slug
            slug = dedupe_slug(slug)

            if slug in dts_devices:
                continue  # already processed (e.g., same DTS in multiple boards)

            # Check manual override first
            if slug in MANUAL_DTS_TO_DEVICE_ID:
                device_id = MANUAL_DTS_TO_DEVICE_ID[slug]
                if device_id is None:
                    continue  # explicitly skipped
            else:
                device_id = slug_to_device_id(slug)

            brand = slug_to_brand(slug)
            title = slug_to_title(slug, brand)
            soc_slug = SOC_TARGET_TO_SLUG.get(target)
            mfr, model = SOC_DISPLAY_NAMES.get(target, ("Unknown", target))
            soc_name = f"{mfr} {model}".strip()
            arch = BOARD_ARCH_MAP.get(target)

            dts_devices[slug] = {
                "slug": slug,
                "device_id": device_id,
                "target": target,
                "dts": dts_name,
                "brand": brand,
                "title": title,
                "soc_slug": soc_slug,
                "soc_name": soc_name,
                "arch": arch,
                "cpu_model": info.get("cpu_model"),
                "kernel": info.get("kernel"),
                "gpu_driver": info.get("gpu_driver"),
            }

    # Also add x86_64 and x86_64_v3 as generic PC targets
    for target in ["X86_64", "X86_64_V3"]:
        if target in board_info:
            slug = target.lower().replace("_", "-")
            device_id = "generic-" + slug
            mfr, model = SOC_DISPLAY_NAMES.get(target, ("", ""))
            dts_devices[slug] = {
                "slug": slug,
                "device_id": device_id,
                "target": target,
                "dts": slug,
                "brand": "Generic",
                "title": f"Generic PC ({slug})",
                "soc_slug": SOC_TARGET_TO_SLUG.get(target),
                "soc_name": f"{mfr} {model}".strip(),
                "arch": "x86_64",
                "cpu_model": board_info[target].get("cpu_model"),
                "kernel": board_info[target].get("kernel"),
                "gpu_driver": board_info[target].get("gpu_driver"),
            }

    print(f"  Derived {len(dts_devices)} unique devices from DTS")

    # --- Compare with existing devices.yml ---
    board_device_ids = {d["device_id"] for d in dts_devices.values()}
    existing_ids = set(existing_devices.keys())

    in_board_not_yml = board_device_ids - existing_ids
    in_yml_not_board = existing_ids - board_device_ids - KNOWN_DTS_LESS_DEVICES

    matched = board_device_ids & existing_ids
    dts_less_matched = existing_ids & KNOWN_DTS_LESS_DEVICES

    print(f"\n{'='*60}")
    print(f"SYNC REPORT")
    print(f"{'='*60}")
    print(f"  Devices in REG-Linux board repo:  {len(board_device_ids)}")
    print(f"  Devices in devices.yml:           {len(existing_ids)}")
    print(f"  Matched (DTS):                    {len(matched)}")
    print(f"  Matched (DTS-less / generic img): {len(dts_less_matched)}")
    print(f"  In board repo, NOT in devices.yml:{len(in_board_not_yml)}")
    print(f"  In devices.yml, NOT in board repo:{len(in_yml_not_board)}")

    if in_board_not_yml:
        print(f"\n--- NEW devices to add to devices.yml ({len(in_board_not_yml)}) ---")
        for dev in sorted(dts_devices.values(), key=lambda d: d["device_id"]):
            if dev["device_id"] in in_board_not_yml:
                print(f"  + {dev['device_id']:40s}  (DTS: {dev['slug']}, SoC: {dev['target']}, brand: {dev['brand']})")

    if in_yml_not_board:
        print(f"\n--- STALE devices in devices.yml ({len(in_yml_not_board)}) ---")
        print(f"  (These have no DTS entry and are not in KNOWN_DTS_LESS_DEVICES)")
        for did in sorted(in_yml_not_board):
            print(f"  ? {did}")

    # --- Generate new devices.yml entries ---
    new_entries: dict[str, dict] = {}
    for dev in sorted(dts_devices.values(), key=lambda d: d["device_id"]):
        device_id = dev["device_id"]
        if device_id not in existing_devices:
            device_type = detect_type(device_id)
            wiki_type_dir = {
                "handheld": "handhelds",
                "sbc": "sbc",
                "console": "consoles",
                "pc": "pc",
            }.get(device_type, "other")

            brand_slug = dev["brand"].lower().replace(" ", "-")
            name_slug = device_id.replace(f"{brand_slug}-", "").replace(brand_slug, "")
            name_slug = name_slug.strip("-")

            soc_display = dev["soc_name"]
            new_entries[device_id] = {
                "title": dev["title"],
                "brand": dev["brand"],
                "manufacturer": [dev["brand"]],
                "soc": [soc_display] if soc_display else [],
                "image": f"/assets/images/{device_id}.webp",
                "board_url": f"https://reglinux.org/wiki/{wiki_type_dir}/{brand_slug}/{name_slug}/",
                "description": f"REG Linux image for {dev['title']} powered by {soc_display}.",
                "lede": f"{dev['title']} pairs the {soc_display} SoC with the REG Linux stack for a polished retro console.",
            }

    # --- Check for missing SoCs ---
    missing_socs: dict[str, dict] = {}
    for target, slug in SOC_TARGET_TO_SLUG.items():
        if slug not in existing_socs and target in board_info:
            info = board_info[target]
            mfr, model = SOC_DISPLAY_NAMES.get(target, ("Unknown", target))
            missing_socs[slug] = {
                "manufacturer": mfr,
                "model": model,
                "slug": slug,
                "cpu": {
                    "arch": {"aarch64": "ARMv8-A", "arm": "ARMv7-A", "riscv": "RISC-V",
                             "x86_64": "x86_64", "mipsel": "MIPS32"}.get(info.get("br2_arch", ""), ""),
                    "cores": "",
                    "max_clock": "",
                    "model": info.get("cpu_model", ""),
                },
                "gpu": {
                    "api": "",
                    "model": "",
                    "driver": info.get("gpu_driver", ""),
                },
                "kernel_version": info.get("kernel", ""),
            }

    if missing_socs:
        print(f"\n--- Missing SoCs (not in socs.yml) ({len(missing_socs)}) ---")
        for slug, soc in sorted(missing_socs.items()):
            print(f"  + {slug:30s}  ({soc['manufacturer']} {soc['model']})")

    # --- Write updated files ---
    if args.dry_run:
        print(f"\n[DRY RUN] Would add {len(new_entries)} devices and {len(missing_socs)} SoCs")
        return

    if new_entries:
        print(f"\nAppending {len(new_entries)} new devices to devices.yml...")
        merged = dict(existing_devices)
        merged.update(new_entries)
        # Sort alphabetically
        sorted_devices = dict(sorted(merged.items()))
        with open(DEVICES_YML, "w") as f:
            yaml.dump(sorted_devices, f, default_flow_style=False, allow_unicode=True,
                      sort_keys=False, width=120)
        print(f"  Written to {DEVICES_YML}")

    if missing_socs:
        print(f"\nAppending {len(missing_socs)} new SoCs to socs.yml...")
        merged_socs = dict(existing_socs)
        for slug, soc_data in missing_socs.items():
            merged_socs[slug] = soc_data
        sorted_socs = dict(sorted(merged_socs.items()))
        with open(SOCS_YML, "w") as f:
            yaml.dump(sorted_socs, f, default_flow_style=False, allow_unicode=True,
                      sort_keys=False, width=120)
        print(f"  Written to {SOCS_YML}")

    if not new_entries and not missing_socs:
        print("\nEverything is in sync!")

    print("\nDone.")


if __name__ == "__main__":
    main()
