---
layout: default
title: Credits & Upstream Projects
permalink: /credits/
body_class: credits
description: REG Linux is built on the shoulders of these open-source projects. Thank you.
---
{% include site-header.html nav_current="credits" %}

<main>
  <section class="hero">
    <div class="hero-text" style="text-align: center; max-width: 640px; margin: 0 auto;">
      <p class="eyebrow">Open source</p>
      <h1>Credits</h1>
      <p class="lede">
        REG Linux wouldn't exist without these projects. We pick, adapt, and integrate their work to build a retro gaming OS. All credit goes to the original teams.
      </p>
    </div>
  </section>

  <section class="credits-grid">
    <a href="https://buildroot.org" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/buildroot.png' | relative_url }}" alt="Buildroot" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>Buildroot</h3>
        <p>The build system at the foundation of REG Linux. Buildroot generates the entire root filesystem, toolchain, and kernel from source via cross-compilation.</p>
        <span class="credit-link">buildroot.org</span>
      </div>
    </a>

    <a href="https://www.armbian.com" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/armbian.png' | relative_url }}" alt="Armbian" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>Armbian</h3>
        <p>Kernel patches, device trees, and board support for ARM SBCs. REG Linux uses Armbian's kernel configs and patches for many supported boards.</p>
        <span class="credit-link">armbian.com</span>
      </div>
    </a>

    <a href="https://libreelec.tv" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/libreelec.png' | relative_url }}" alt="LibreELEC" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>LibreELEC</h3>
        <p>Immutable OS architecture and Buildroot packaging patterns. REG Linux's read-only root filesystem and update mechanisms draw from LibreELEC's design.</p>
        <span class="credit-link">libreelec.tv</span>
      </div>
    </a>

    <a href="https://batocera.org" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/batocera.png' | relative_url }}" alt="Batocera" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>Batocera</h3>
        <p>EmulationStation frontend, packaging recipes, and emulator integration. REG Linux forked from Batocera and continues to share and upstream improvements.</p>
        <span class="credit-link">batocera.org</span>
      </div>
    </a>

    <a href="https://rocknix.org" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/rocknix.svg' | relative_url }}" alt="ROCKNIX" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>ROCKNIX</h3>
        <p>Handheld device support, controller configs, and suspend/resume fixes. ROCKNIX's work on Rockchip and Qualcomm handhelds benefits the whole ecosystem.</p>
        <span class="credit-link">rocknix.org</span>
      </div>
    </a>

    <a href="https://knulli.org" target="_blank" rel="noreferrer" class="credit-card">
      <div class="credit-logo">
        <img src="{{ '/assets/images/credits/knulli.png' | relative_url }}" alt="KNULLI" loading="lazy" />
      </div>
      <div class="credit-info">
        <h3>KNULLI</h3>
        <p>Budget handheld support and community testing. KNULLI targets devices that other distributions skip, and their work on Allwinner and RK3128 boards helps REG Linux too.</p>
        <span class="credit-link">knulli.org</span>
      </div>
    </a>
  </section>

  <section class="credits-note" style="text-align: center; margin-top: 2rem;">
    <p class="muted" style="max-width: 520px; margin: 0 auto; font-size: 0.85rem;">
      REG Linux is open source. If we use your work and you're not listed here, <a href="https://github.com/REG-Linux/website/issues">let us know</a>.
    </p>
  </section>
</main>

<style>
.credits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 700px) { .credits-grid { grid-template-columns: 1fr; } }

.credit-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--card, rgba(16,22,40,0.85));
  border: 1px solid var(--border, rgba(255,255,255,0.12));
  border-radius: var(--radius, 14px);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--text, #f4f6fb);
  transition: transform 0.15s, border-color 0.15s;
}
.credit-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent, #2bb0e9);
  text-decoration: none;
}

.credit-logo {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.credit-logo img {
  max-width: 72px;
  max-height: 72px;
  object-fit: contain;
  border-radius: 8px;
}

.credit-info h3 {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
}
.credit-info p {
  margin: 0 0 0.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.credit-link {
  font-size: 0.75rem;
  color: var(--accent);
}
</style>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Free, open source, and community supported.</p>
</footer>
