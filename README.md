# 🌐 REG Linux Website

This repository hosts the **official website of REG Linux**, built for [https://reglinux.org](https://reglinux.org).

REG Linux is an **immutable Linux system** designed for **retro gaming devices**, targeting ARM, AArch64, RISC-V, and x86_64 platforms.

---

## 🧩 Project Overview

- **Website:** [https://reglinux.org](https://reglinux.org)
- **Wiki:** [https://wiki.reglinux.org](https://wiki.reglinux.org)
- **Main Repo:** [REG-Linux/REG-Linux](https://github.com/REG-Linux/REG-Linux)
- **Organization:** [REG-Linux](https://github.com/REG-Linux)

---

## 🖥️ About REG Linux

REG Linux (Retro Emulation Gaming Linux) is:
- 🔒 Immutable and lightweight  
- 🧱 Buildroot-based (no systemd)  
- 🕹️ Tuned for retro-gaming performance  
- 🧩 Modular with device profiles for ARM, RISC-V, and x86_64 targets  

The website provides:
- 🪄 A showcase of supported devices  
- ⬇️ Direct downloads for stable and preview releases  
- 📖 Links to documentation and wiki  
- 💬 Community access via Discord and GitHub

---

## 🧰 Structure

Typical Jekyll layout


---

## 🚀 Deployment (GitHub Pages)

The site is automatically published via **GitHub Pages** from the `main` branch:

- Live at: [https://reglinux.org](https://reglinux.org)
- Served by: [REG-Linux/reglinux.github.io](https://github.com/REG-Linux/reglinux.github.io)

### Manual update:
```bash
jekyll build
git add .
git commit -m "Update site content"
git push


