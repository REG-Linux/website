---
layout: default
title: Download REG Linux builds
permalink: /download/
body_class: download
description: Choose your REG Linux image by vendor or architecture across 64 supported devices.
---
<header class="site-header">
  <div class="logo">
    <img src="{{ '/assets/images/reg_linux_logo.png' | relative_url }}" alt="REG Linux" width="120" height="42" loading="lazy" />
  </div>
  <nav class="site-nav" aria-label="Primary">
    <a href="{{ '/' | relative_url }}#features">Features</a>
    <a href="{{ '/' | relative_url }}#stack">Stack</a>
    <a href="{{ '/' | relative_url }}#hardware">Hardware</a>
    <a href="{{ '/' | relative_url }}#get-started">Get Started</a>
    <a href="{{ '/' | relative_url }}#community">Community</a>
    <a href="{{ '/download/' | relative_url }}" aria-current="page">Download</a>
  </nav>
  <a class="btn ghost" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">GitHub</a>
</header>

<main>
  <section class="hero download-hero">
    <div class="hero-text">
      <p class="eyebrow">Pick your hardware</p>
      <h1>Download REG Linux builds</h1>
      <p class="lede">Browse curated images for 64 handhelds, SBCs, and mini PCs. Each board page includes flashing instructions, release notes, and troubleshooting tips.</p>
      <div class="hero-cta">
        <a class="btn primary" href="#brands">Jump to vendors</a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Contribute images</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-retroarch.png' | relative_url }}" alt="REG Linux builds" loading="lazy" />
        <figcaption>Images stay close to mainline kernels for stability.</figcaption>
      </figure>
    </div>
  </section>

  <section class="download-summary" id="brands">
    <div>
      <h2>Supported architectures</h2>
      <p>REG focuses on common retro hardware classes. Pick your CPU family if you are unsure about the device vendor.</p>
      <div class="arch-pills">
        <span class="chip">AArch64</span><span class="chip">ARMv6</span><span class="chip">ARMv7</span><span class="chip">RISC-V</span><span class="chip">x86-64</span>
      </div>
    </div>
    <div class="brand-pills">
      <h2>Vendors</h2>
      <p>Quick links to each vendor section.</p>
      <div class="pill-grid">
            <a href="#brand-anbernic">Anbernic <span>7 devices</span></a>
            <a href="#brand-asus">ASUS <span>2 devices</span></a>
            <a href="#brand-banana-pi">Banana Pi <span>5 devices</span></a>
            <a href="#brand-beelink">Beelink <span>2 devices</span></a>
            <a href="#brand-firefly">Firefly <span>3 devices</span></a>
            <a href="#brand-friendlyelec">FriendlyElec <span>2 devices</span></a>
            <a href="#brand-gameforce">Gameforce <span>2 devices</span></a>
            <a href="#brand-hardkernel">HardKernel <span>6 devices</span></a>
            <a href="#brand-khadas">Khadas <span>7 devices</span></a>
            <a href="#brand-koch-media">Koch Media <span>1 devices</span></a>
            <a href="#brand-milk-v">Milk-V <span>2 devices</span></a>
            <a href="#brand-mqmaker">MQMaker <span>1 devices</span></a>
            <a href="#brand-orange-pi">Orange Pi <span>9 devices</span></a>
            <a href="#brand-radxa">Radxa <span>5 devices</span></a>
            <a href="#brand-raspberry">Raspberry <span>8 devices</span></a>
            <a href="#brand-starfive">Starfive <span>1 devices</span></a>
            <a href="#brand-valve">Valve <span>1 devices</span></a>
      </div>
    </div>
  </section>

  <section class="download-brand" id="brand-anbernic">
  <div class="brand-heading">
    <h2>Anbernic</h2>
    <p>7 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/anbernic-rg351v" target="_blank" rel="noreferrer" aria-label="Anbernic RG351V board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg351v.png' | relative_url }}" alt="Anbernic RG351V" loading="lazy" width="148" height="220"></div>
  <div class="device-body">
    <h3>Anbernic RG351V</h3>
    <p>Tested REG Linux image tailored for Anbernic RG351V with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg351-pmmp" target="_blank" rel="noreferrer" aria-label="Anbernic RG351 P/M/MP board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg351p-m-mp.png' | relative_url }}" alt="Anbernic RG351 P/M/MP" loading="lazy" width="220" height="114"></div>
  <div class="device-body">
    <h3>Anbernic RG351 P/M/MP</h3>
    <p>Tested REG Linux image tailored for Anbernic RG351 P/M/MP with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg552" target="_blank" rel="noreferrer" aria-label="Anbernic RG552 board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg552.png' | relative_url }}" alt="Anbernic RG552" loading="lazy" width="220" height="119"></div>
  <div class="device-body">
    <h3>Anbernic RG552</h3>
    <p>Tested REG Linux image tailored for Anbernic RG552 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg503" target="_blank" rel="noreferrer" aria-label="Anbernic RG503 board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg503.png' | relative_url }}" alt="Anbernic RG503" loading="lazy" width="220" height="100"></div>
  <div class="device-body">
    <h3>Anbernic RG503</h3>
    <p>Tested REG Linux image tailored for Anbernic RG503 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg353vs" target="_blank" rel="noreferrer" aria-label="Anbernic RG353V(S) board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg353v.png' | relative_url }}" alt="Anbernic RG353 V / VS" loading="lazy" width="146" height="220"></div>
  <div class="device-body">
    <h3>Anbernic RG353V(S)</h3>
    <p>Tested REG Linux image tailored for Anbernic RG353V(S) with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg353m" target="_blank" rel="noreferrer" aria-label="Anbernic RG353M board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg353m.png' | relative_url }}" alt="Anbernic RG353M" loading="lazy" width="220" height="112"></div>
  <div class="device-body">
    <h3>Anbernic RG353M</h3>
    <p>Tested REG Linux image tailored for Anbernic RG353M with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/anbernic-rg353ps" target="_blank" rel="noreferrer" aria-label="Anbernic RG353P(S) board details">
  <div class="device-media"><img src="{{ '/assets/images/anbernic-rg353p.png' | relative_url }}" alt="Anbernic RG353P(S)" loading="lazy" width="220" height="105"></div>
  <div class="device-body">
    <h3>Anbernic RG353P(S)</h3>
    <p>Tested REG Linux image tailored for Anbernic RG353P(S) with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-asus">
  <div class="brand-heading">
    <h2>ASUS</h2>
    <p>2 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/asus-rog-ally" target="_blank" rel="noreferrer" aria-label="Asus ROG Ally board details">
  <div class="device-media"><img src="{{ '/assets/images/asus-rog-ally.webp' | relative_url }}" alt="Asus ROG Ally" loading="lazy" width="220" height="91"></div>
  <div class="device-body">
    <h3>Asus ROG Ally</h3>
    <p>Tested REG Linux image tailored for Asus ROG Ally with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/asus-tinker-board-s" target="_blank" rel="noreferrer" aria-label="Asus Tinker Board (S) board details">
  <div class="device-media"><img src="{{ '/assets/images/asus-tinker-board.png' | relative_url }}" alt="Asus Tinker Board (S)" loading="lazy" width="220" height="164"></div>
  <div class="device-body">
    <h3>Asus Tinker Board (S)</h3>
    <p>Tested REG Linux image tailored for Asus Tinker Board (S) with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-banana-pi">
  <div class="brand-heading">
    <h2>Banana Pi</h2>
    <p>5 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/banana-pi-m2-zero" target="_blank" rel="noreferrer" aria-label="Banana Pi M2 Zero board details">
  <div class="device-media"><img src="{{ '/assets/images/bananapim2zero.png' | relative_url }}" alt="Banana Pi M2 Zero" loading="lazy" width="220" height="155"></div>
  <div class="device-body">
    <h3>Banana Pi M2 Zero</h3>
    <p>Tested REG Linux image tailored for Banana Pi M2 Zero with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/banana-pi-m4-berry" target="_blank" rel="noreferrer" aria-label="Banana Pi M4 Berry board details">
  <div class="device-media"><img src="{{ '/assets/images/bananapi-m4-berry.png' | relative_url }}" alt="Banana Pi M4 Berry" loading="lazy" width="220" height="140"></div>
  <div class="device-body">
    <h3>Banana Pi M4 Berry</h3>
    <p>Tested REG Linux image tailored for Banana Pi M4 Berry with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/banana-pi-m2s" target="_blank" rel="noreferrer" aria-label="Banana Pi M2S board details">
  <div class="device-media"><img src="{{ '/assets/images/bananapi-m2s.png' | relative_url }}" alt="Banana Pi M2S" loading="lazy" width="220" height="131"></div>
  <div class="device-body">
    <h3>Banana Pi M2S</h3>
    <p>Tested REG Linux image tailored for Banana Pi M2S with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/banana-pi-m5" target="_blank" rel="noreferrer" aria-label="Banana Pi M5 board details">
  <div class="device-media"><img src="{{ '/assets/images/bananapi-m5.png' | relative_url }}" alt="Banana Pi M5" loading="lazy" width="220" height="138"></div>
  <div class="device-body">
    <h3>Banana Pi M5</h3>
    <p>Tested REG Linux image tailored for Banana Pi M5 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/banana-pi-m7" target="_blank" rel="noreferrer" aria-label="Banana Pi M7 board details">
  <div class="device-media"><img src="{{ '/assets/images/bananapi-m7.png' | relative_url }}" alt="Banana Pi M7" loading="lazy" width="220" height="126"></div>
  <div class="device-body">
    <h3>Banana Pi M7</h3>
    <p>Tested REG Linux image tailored for Banana Pi M7 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-beelink">
  <div class="brand-heading">
    <h2>Beelink</h2>
    <p>2 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/beelink-gt-king" target="_blank" rel="noreferrer" aria-label="Beelink GT King board details">
  <div class="device-media"><img src="{{ '/assets/images/Beelink-GT-King.png' | relative_url }}" alt="Beelink GT King" loading="lazy" width="220" height="129"></div>
  <div class="device-body">
    <h3>Beelink GT King</h3>
    <p>Tested REG Linux image tailored for Beelink GT King with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/beelink-gt-king-pro" target="_blank" rel="noreferrer" aria-label="Beelink GT King Pro board details">
  <div class="device-media"><img src="{{ '/assets/images/beelink-gt-king-pro.png' | relative_url }}" alt="Beelink GT King Pro" loading="lazy" width="220" height="148"></div>
  <div class="device-body">
    <h3>Beelink GT King Pro</h3>
    <p>Tested REG Linux image tailored for Beelink GT King Pro with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-firefly">
  <div class="brand-heading">
    <h2>Firefly</h2>
    <p>3 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/firefly-station-m2-roc-rk3566-pc" target="_blank" rel="noreferrer" aria-label="Firefly Station M2 / ROC-RK3566-PC board details">
  <div class="device-media"><img src="{{ '/assets/images/firefly-station-m2.png' | relative_url }}" alt="Firefly Station M2" loading="lazy" width="220" height="134"></div>
  <div class="device-body">
    <h3>Firefly Station M2 / ROC-RK3566-PC</h3>
    <p>Tested REG Linux image tailored for Firefly Station M2 / ROC-RK3566-PC with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/firefly-station-p2-roc-rk3568-pc" target="_blank" rel="noreferrer" aria-label="Firefly Station P2 / ROC-RK3568-PC board details">
  <div class="device-media"><img src="{{ '/assets/images/firefly-station-p2.png' | relative_url }}" alt="Firefly Station P2" loading="lazy" width="220" height="136"></div>
  <div class="device-body">
    <h3>Firefly Station P2 / ROC-RK3568-PC</h3>
    <p>Tested REG Linux image tailored for Firefly Station P2 / ROC-RK3568-PC with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/firefly-station-m3-roc-rk3588s-pc" target="_blank" rel="noreferrer" aria-label="Firefly Station M3 / ROC-RK3588S-PC board details">
  <div class="device-media"><img src="{{ '/assets/images/firefly-station-m3.png' | relative_url }}" alt="Firefly Station M3" loading="lazy" width="220" height="128"></div>
  <div class="device-body">
    <h3>Firefly Station M3 / ROC-RK3588S-PC</h3>
    <p>Tested REG Linux image tailored for Firefly Station M3 / ROC-RK3588S-PC with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-friendlyelec">
  <div class="brand-heading">
    <h2>FriendlyElec</h2>
    <p>2 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/nano-pi-k2" target="_blank" rel="noreferrer" aria-label="Nano Pi K2 board details">
  <div class="device-media"><img src="{{ '/assets/images/nanopik2.png' | relative_url }}" alt="FriendlyElec Nano Pi K2" loading="lazy" width="220" height="176"></div>
  <div class="device-body">
    <h3>Nano Pi K2</h3>
    <p>Tested REG Linux image tailored for Nano Pi K2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/nano-pi-m4v2" target="_blank" rel="noreferrer" aria-label="Nano Pi M4v2 board details">
  <div class="device-media"><img src="{{ '/assets/images/nanopim4v2.png' | relative_url }}" alt="FriendlyElec Nano Pi M4v2" loading="lazy" width="220" height="166"></div>
  <div class="device-body">
    <h3>Nano Pi M4v2</h3>
    <p>Tested REG Linux image tailored for Nano Pi M4v2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-gameforce">
  <div class="brand-heading">
    <h2>Gameforce</h2>
    <p>2 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/gameforce-chi" target="_blank" rel="noreferrer" aria-label="Gameforce CHI board details">
  <div class="device-media"><img src="{{ '/assets/images/gameforce-chi.png' | relative_url }}" alt="Gameforce CHI" loading="lazy" width="220" height="123"></div>
  <div class="device-body">
    <h3>Gameforce CHI</h3>
    <p>Tested REG Linux image tailored for Gameforce CHI with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/gameforce-ace" target="_blank" rel="noreferrer" aria-label="Gameforce ACE board details">
  <div class="device-media"><img src="{{ '/assets/images/gameforce-ace.png' | relative_url }}" alt="Gameforce ACE" loading="lazy" width="220" height="96"></div>
  <div class="device-body">
    <h3>Gameforce ACE</h3>
    <p>Tested REG Linux image tailored for Gameforce ACE with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-hardkernel">
  <div class="brand-heading">
    <h2>HardKernel</h2>
    <p>6 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-c2" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID C2 board details">
  <div class="device-media"><img src="{{ '/assets/images/odroidc2.png' | relative_url }}" alt="HardKernel ODROID C2" loading="lazy" width="220" height="156"></div>
  <div class="device-body">
    <h3>HardKernel ODROID C2</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID C2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-c4" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID C4 board details">
  <div class="device-media"><img src="{{ '/assets/images/odroidc4.png' | relative_url }}" alt="HardKernel ODROID C4" loading="lazy" width="220" height="193"></div>
  <div class="device-body">
    <h3>HardKernel ODROID C4</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID C4 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-go-ultra" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID GO Ultra board details">
  <div class="device-media"><img src="{{ '/assets/images/hardkernel-odroid-go-ultra.png' | relative_url }}" alt="HardKernel ODROID GO Ultra" loading="lazy" width="220" height="91"></div>
  <div class="device-body">
    <h3>HardKernel ODROID GO Ultra</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID GO Ultra with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-go-super" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID Go Super board details">
  <div class="device-media"><img src="{{ '/assets/images/hardkernel-odroid-go-super.png' | relative_url }}" alt="HardKernel ODROID GO Super" loading="lazy" width="220" height="91"></div>
  <div class="device-body">
    <h3>HardKernel ODROID Go Super</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID Go Super with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-m1" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID M1 board details">
  <div class="device-media"><img src="{{ '/assets/images/odroidm1.png' | relative_url }}" alt="HardKernel ODROID M1" loading="lazy" width="220" height="146"></div>
  <div class="device-body">
    <h3>HardKernel ODROID M1</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID M1 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/hardkernel-odroid-xu3xu4" target="_blank" rel="noreferrer" aria-label="HardKernel ODROID XU3/XU4 board details">
  <div class="device-media"><img src="{{ '/assets/images/odroidxu4.png' | relative_url }}" alt="Odroid XU4" loading="lazy" width="220" height="195"></div>
  <div class="device-body">
    <h3>HardKernel ODROID XU3/XU4</h3>
    <p>Tested REG Linux image tailored for HardKernel ODROID XU3/XU4 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-khadas">
  <div class="brand-heading">
    <h2>Khadas</h2>
    <p>7 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/khadas-vim-3" target="_blank" rel="noreferrer" aria-label="Khadas VIM 3 board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-vim3.png' | relative_url }}" alt="Khadas VIM3" loading="lazy" width="220" height="182"></div>
  <div class="device-body">
    <h3>Khadas VIM 3</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 3 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-vim-4" target="_blank" rel="noreferrer" aria-label="Khadas VIM 4 board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-vim4.png' | relative_url }}" alt="Khadas VIM4" loading="lazy" width="220" height="88"></div>
  <div class="device-body">
    <h3>Khadas VIM 4</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 4 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-vim-1" target="_blank" rel="noreferrer" aria-label="Khadas VIM 1 board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-vim1.png' | relative_url }}" alt="Khadas VIM1" loading="lazy" width="220" height="168"></div>
  <div class="device-body">
    <h3>Khadas VIM 1</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 1 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-vim-3l" target="_blank" rel="noreferrer" aria-label="Khadas VIM 3L board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-vim3-l.png' | relative_url }}" alt="Khadas VIM3L" loading="lazy" width="220" height="155"></div>
  <div class="device-body">
    <h3>Khadas VIM 3L</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 3L with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-vim-1s" target="_blank" rel="noreferrer" aria-label="Khadas VIM 1S board details">
  <div class="device-media"><img src="{{ '/assets/images/Khadas-VIM1S.png' | relative_url }}" alt="Khadas VIM1S" loading="lazy" width="220" height="120"></div>
  <div class="device-body">
    <h3>Khadas VIM 1S</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 1S with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-vim-2" target="_blank" rel="noreferrer" aria-label="Khadas VIM 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-vim2.png' | relative_url }}" alt="Khadas VIM2" loading="lazy" width="220" height="179"></div>
  <div class="device-body">
    <h3>Khadas VIM 2</h3>
    <p>Tested REG Linux image tailored for Khadas VIM 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/khadas-edge-2" target="_blank" rel="noreferrer" aria-label="Khadas Edge 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/khadas-edge2.png' | relative_url }}" alt="Khadas Edge 2" loading="lazy" width="220" height="156"></div>
  <div class="device-body">
    <h3>Khadas Edge 2</h3>
    <p>Tested REG Linux image tailored for Khadas Edge 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-koch-media">
  <div class="brand-heading">
    <h2>Koch Media</h2>
    <p>1 supported device</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/capcom-home-arcade" target="_blank" rel="noreferrer" aria-label="Capcom Home Arcade board details">
  <div class="device-media"><img src="{{ '/assets/images/capcom_home_arcade.png' | relative_url }}" alt="Capcom Home Arcade" loading="lazy" width="220" height="68"></div>
  <div class="device-body">
    <h3>Capcom Home Arcade</h3>
    <p>Tested REG Linux image tailored for Capcom Home Arcade with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-milk-v">
  <div class="brand-heading">
    <h2>Milk-V</h2>
    <p>2 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/milk-v-mars" target="_blank" rel="noreferrer" aria-label="Milk-V Mars board details">
  <div class="device-media"><img src="{{ '/assets/images/milk-mars.png' | relative_url }}" alt="Milk-V Mars" loading="lazy" width="220" height="174"></div>
  <div class="device-body">
    <h3>Milk-V Mars</h3>
    <p>Tested REG Linux image tailored for Milk-V Mars with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/milk-v-meles" target="_blank" rel="noreferrer" aria-label="Milk-V Meles board details">

  <div class="device-body">
    <h3>Milk-V Meles</h3>
    <p>Tested REG Linux image tailored for Milk-V Meles with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-mqmaker">
  <div class="brand-heading">
    <h2>MQMaker</h2>
    <p>1 supported device</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/mqmaker-miqi" target="_blank" rel="noreferrer" aria-label="MQMaker MiQi board details">
  <div class="device-media"><img src="{{ '/assets/images/mqmaker-miqi.png' | relative_url }}" alt="MQMaker MiQi" loading="lazy" width="220" height="152"></div>
  <div class="device-body">
    <h3>MQMaker MiQi</h3>
    <p>Tested REG Linux image tailored for MQMaker MiQi with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-orange-pi">
  <div class="brand-heading">
    <h2>Orange Pi</h2>
    <p>9 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/orange-pi-one" target="_blank" rel="noreferrer" aria-label="Orange Pi One board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepione.png' | relative_url }}" alt="OrangePi One" loading="lazy" width="220" height="192"></div>
  <div class="device-body">
    <h3>Orange Pi One</h3>
    <p>Tested REG Linux image tailored for Orange Pi One with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-pc" target="_blank" rel="noreferrer" aria-label="Orange Pi PC board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepipc.png' | relative_url }}" alt="OrangePi PC" loading="lazy" width="220" height="152"></div>
  <div class="device-body">
    <h3>Orange Pi PC</h3>
    <p>Tested REG Linux image tailored for Orange Pi PC with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-plus-2e" target="_blank" rel="noreferrer" aria-label="Orange Pi Plus 2E board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepiplus2e.png' | relative_url }}" alt="Orange Pi Plus 2E" loading="lazy" width="220" height="146"></div>
  <div class="device-body">
    <h3>Orange Pi Plus 2E</h3>
    <p>Tested REG Linux image tailored for Orange Pi Plus 2E with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-pc-2" target="_blank" rel="noreferrer" aria-label="Orange Pi PC 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepipc2.png' | relative_url }}" alt="Orange Pi PC 2" loading="lazy" width="220" height="148"></div>
  <div class="device-body">
    <h3>Orange Pi PC 2</h3>
    <p>Tested REG Linux image tailored for Orange Pi PC 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-one-plus" target="_blank" rel="noreferrer" aria-label="Orange Pi One Plus board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepi-one-plus_0.png' | relative_url }}" alt="Orange Pi One Plus" loading="lazy" width="220" height="151"></div>
  <div class="device-body">
    <h3>Orange Pi One Plus</h3>
    <p>Tested REG Linux image tailored for Orange Pi One Plus with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-zero-2" target="_blank" rel="noreferrer" aria-label="Orange Pi Zero 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepizero2.png' | relative_url }}" alt="Orange Pi Zero 2" loading="lazy" width="220" height="176"></div>
  <div class="device-body">
    <h3>Orange Pi Zero 2</h3>
    <p>Tested REG Linux image tailored for Orange Pi Zero 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-zero-2w" target="_blank" rel="noreferrer" aria-label="Orange Pi Zero 2W board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepi-zero2w.png' | relative_url }}" alt="Orange Pi Zero 2W" loading="lazy" width="220" height="172"></div>
  <div class="device-body">
    <h3>Orange Pi Zero 2W</h3>
    <p>Tested REG Linux image tailored for Orange Pi Zero 2W with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-zero-3" target="_blank" rel="noreferrer" aria-label="Orange Pi Zero 3 board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepizero3.png' | relative_url }}" alt="Orange Pi Zero 3" loading="lazy" width="220" height="128"></div>
  <div class="device-body">
    <h3>Orange Pi Zero 3</h3>
    <p>Tested REG Linux image tailored for Orange Pi Zero 3 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/orange-pi-800" target="_blank" rel="noreferrer" aria-label="Orange Pi 800 board details">
  <div class="device-media"><img src="{{ '/assets/images/orangepi800.png' | relative_url }}" alt="Orange Pi 800" loading="lazy" width="220" height="156"></div>
  <div class="device-body">
    <h3>Orange Pi 800</h3>
    <p>Tested REG Linux image tailored for Orange Pi 800 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-radxa">
  <div class="brand-heading">
    <h2>Radxa</h2>
    <p>5 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/radxa-zero-2" target="_blank" rel="noreferrer" aria-label="Radxa Zero 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/radxa-zero2.png' | relative_url }}" alt="Radxa Zero 2" loading="lazy" width="220" height="125"></div>
  <div class="device-body">
    <h3>Radxa Zero 2</h3>
    <p>Tested REG Linux image tailored for Radxa Zero 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/radxa-zero" target="_blank" rel="noreferrer" aria-label="Radxa Zero board details">
  <div class="device-media"><img src="{{ '/assets/images/radxa-zero.png' | relative_url }}" alt="Radxa Zero" loading="lazy" width="220" height="147"></div>
  <div class="device-body">
    <h3>Radxa Zero</h3>
    <p>Tested REG Linux image tailored for Radxa Zero with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/radxa-nio-12l" target="_blank" rel="noreferrer" aria-label="Radxa NIO 12L board details">

  <div class="device-body">
    <h3>Radxa NIO 12L</h3>
    <p>Tested REG Linux image tailored for Radxa NIO 12L with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/radxa-rock-5b" target="_blank" rel="noreferrer" aria-label="Radxa Rock 5B board details">
  <div class="device-media"><img src="{{ '/assets/images/rock5b.png' | relative_url }}" alt="Radxa Rock 5B" loading="lazy" width="220" height="181"></div>
  <div class="device-body">
    <h3>Radxa Rock 5B</h3>
    <p>Tested REG Linux image tailored for Radxa Rock 5B with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/radxa-rock-5a" target="_blank" rel="noreferrer" aria-label="Radxa Rock 5A board details">
  <div class="device-media"><img src="{{ '/assets/images/radxa-rock5a.png' | relative_url }}" alt="Radxa Rock 5A" loading="lazy" width="220" height="145"></div>
  <div class="device-body">
    <h3>Radxa Rock 5A</h3>
    <p>Tested REG Linux image tailored for Radxa Rock 5A with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-raspberry">
  <div class="brand-heading">
    <h2>Raspberry</h2>
    <p>8 supported devices</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-4" target="_blank" rel="noreferrer" aria-label="Raspberry Pi 4 board details">
  <div class="device-media"><img src="{{ '/assets/images/rpi4b.png' | relative_url }}" alt="Raspberry Pi 4" loading="lazy" width="220" height="161"></div>
  <div class="device-body">
    <h3>Raspberry Pi 4</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi 4 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-400" target="_blank" rel="noreferrer" aria-label="Raspberry Pi 400 board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberry-pi-400.png' | relative_url }}" alt="Raspberry Pi 400" loading="lazy" width="220" height="101"></div>
  <div class="device-body">
    <h3>Raspberry Pi 400</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi 400 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-5" target="_blank" rel="noreferrer" aria-label="Raspberry Pi 5 board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberry-pi-5.png' | relative_url }}" alt="Raspberry Pi 5" loading="lazy" width="220" height="166"></div>
  <div class="device-body">
    <h3>Raspberry Pi 5</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi 5 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-aabb" target="_blank" rel="noreferrer" aria-label="Raspberry Pi A/A+/B/B+ board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberrypib.png' | relative_url }}" alt="Raspberry Pi A / A+ / B / B+" loading="lazy" width="220" height="157"></div>
  <div class="device-body">
    <h3>Raspberry Pi A/A+/B/B+</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi A/A+/B/B+ with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-zero" target="_blank" rel="noreferrer" aria-label="Raspberry Pi Zero board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberrypizero.png' | relative_url }}" alt="Raspberry Pi Zero" loading="lazy" width="220" height="160"></div>
  <div class="device-body">
    <h3>Raspberry Pi Zero</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi Zero with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-2" target="_blank" rel="noreferrer" aria-label="Raspberry Pi 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberry-pi-2b.png' | relative_url }}" alt="Raspberry Pi 2" loading="lazy" width="220" height="145"></div>
  <div class="device-body">
    <h3>Raspberry Pi 2</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-zero-2" target="_blank" rel="noreferrer" aria-label="Raspberry Pi Zero 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberrypizero2.png' | relative_url }}" alt="Raspberry Pi Zero 2" loading="lazy" width="220" height="108"></div>
  <div class="device-body">
    <h3>Raspberry Pi Zero 2</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi Zero 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
<a class="device-card" href="https://reglinux.org/board/raspberry-pi-3" target="_blank" rel="noreferrer" aria-label="Raspberry Pi 3 board details">
  <div class="device-media"><img src="{{ '/assets/images/raspberry-pi-3.png' | relative_url }}" alt="Raspberry Pi 3" loading="lazy" width="220" height="151"></div>
  <div class="device-body">
    <h3>Raspberry Pi 3</h3>
    <p>Tested REG Linux image tailored for Raspberry Pi 3 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-starfive">
  <div class="brand-heading">
    <h2>Starfive</h2>
    <p>1 supported device</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/starfive-visionfive-2" target="_blank" rel="noreferrer" aria-label="StarFive VisionFive 2 board details">
  <div class="device-media"><img src="{{ '/assets/images/vision-five2.png' | relative_url }}" alt="StarFive VisionFive 2" loading="lazy" width="220" height="153"></div>
  <div class="device-body">
    <h3>StarFive VisionFive 2</h3>
    <p>Tested REG Linux image tailored for StarFive VisionFive 2 with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>

<section class="download-brand" id="brand-valve">
  <div class="brand-heading">
    <h2>Valve</h2>
    <p>1 supported device</p>
  </div>
  <div class="download-grid">
<a class="device-card" href="https://reglinux.org/board/steam-deck" target="_blank" rel="noreferrer" aria-label="Steam Deck board details">
  <div class="device-media"><img src="{{ '/assets/images/Steam_Deck.png' | relative_url }}" alt="Steam Deck" loading="lazy" width="220" height="82"></div>
  <div class="device-body">
    <h3>Steam Deck</h3>
    <p>Tested REG Linux image tailored for Steam Deck with the latest available kernels.</p>
    <span class="chip">View install notes</span>
  </div>
</a>
  </div>
</section>
</main>

<footer class="site-footer">
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.</p>
  <p class="small">Images and board descriptions are referenced from <a href="https://reglinux.org/download" target="_blank" rel="noreferrer">reglinux.org/download</a>.</p>
</footer>
