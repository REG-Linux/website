---
layout: default
title: Retro Gaming OS for Handhelds, SBCs & PCs
body_class: home
description: REG Linux — retro gaming OS for 186 devices. Flash, boot, play. Supports ARM, AArch64, RISC-V, and x86_64.
preload_image: /assets/images/logo-regstation.webp
---
{% assign home = site.data.home %}
{% assign community_channels = site.data.community.channels %}
{% assign home_channel_order = "discord|wiki|github" | split: "|" %}
{% include site-header.html nav_current="home" %}

<main>
  <!-- Hero -->
  <section class="hero" id="home">
    <div class="hero-text">
      <h1>Retro gaming OS<br/>for any device</h1>
      <p class="lede">
        Flash. Boot. Play.<br/>
        186 devices. 50+ emulated systems. Pre-configured and ready to go.
      </p>
      <div class="hero-cta">
        <a class="btn primary large" href="{{ '/download/' | relative_url }}">Download REG Linux</a>
        <a class="btn secondary" href="{{ '/download/' | relative_url }}">Browse all devices</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-regstation.webp' | relative_url }}"
             alt="REG-Station frontend"
             width="420" height="258"
             loading="eager" fetchpriority="high" decoding="async" />
      </figure>
    </div>
  </section>

  <!-- Social proof -->
  <section class="social-proof">
    <div class="proof-badges">
      <a href="https://github.com/REG-Linux/REG-Linux" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/github/stars/REG-Linux/REG-Linux?style=flat-square&logo=github&label=GitHub%20Stars&color=2bb0e9" alt="GitHub Stars" loading="lazy" />
      </a>
      <a href="https://discord.gg/a9HH4ZpVqp" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/discord/885430145677164554?style=flat-square&logo=discord&label=Discord&color=5865F2" alt="Discord Members" loading="lazy" />
      </a>
      <a href="https://github.com/REG-Linux/REG-Linux" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/github/commit-activity/m/REG-Linux/REG-Linux?style=flat-square&logo=github&label=Monthly%20Commits&color=22c55e" alt="Monthly Commits" loading="lazy" />
      </a>
      <a href="https://github.com/REG-Linux/REG-Linux/commits/main" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/github/last-commit/REG-Linux/REG-Linux?style=flat-square&logo=github&label=Last%20Commit&color=f59e0b" alt="Last Commit" loading="lazy" />
      </a>
    </div>
  </section>

  <!-- Stats -->
  <section class="stats-strip" id="features">
    <div class="stats-grid">
      {% for stat in home.stats %}
        <div class="stat-badge">
          <span class="stat-icon">{{ stat.icon }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      {% endfor %}
    </div>
  </section>

  <!-- Emulators — inside a card like the play page -->
  <section class="cv-auto" id="stack">
    <div class="section-heading">
      <h2>Pre-configured emulators</h2>
      <p>RetroArch, MAME, and specialist emulators — inputs, shaders, and hotkeys already set up.</p>
    </div>
    <div class="card" style="max-width: 900px; margin: 0 auto;">
      <div class="emu-tile-grid">
        {% for logo in home.emulator_logos %}
          <figure class="emulator-tile">
            <img src="{{ logo.image | relative_url }}" alt="{{ logo.label }}" loading="lazy" />
            <figcaption>
              <strong>{{ logo.label }}</strong>
            </figcaption>
          </figure>
        {% endfor %}
      </div>
      <div style="text-align: center; margin-top: 1rem;">
        <a class="btn secondary" href="{{ '/play/' | relative_url }}">All systems, engines, and ports &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Hardware — cards with device counts and links -->
  <section class="cv-auto" id="hardware">
    <div class="section-heading">
      <h2>Runs on your hardware</h2>
      <p>186 devices across ARM, AArch64, RISC-V, and x86_64.</p>
    </div>
    <div class="hw-cards">
      <a class="card hw-link" href="{{ '/download/' | relative_url }}">
        <h3>🎮 Handhelds</h3>
        <p>Anbernic, Powkiddy, Retroid, AYN, AYANEO. Controls and suspend work out of the box.</p>
        <span class="hw-count">56 devices</span>
      </a>
      <a class="card hw-link" href="{{ '/download/' | relative_url }}">
        <h3>🖥️ SBCs</h3>
        <p>Raspberry Pi, Orange Pi, Radxa, Khadas. Plug in, boot, play.</p>
        <span class="hw-count">89 devices</span>
      </a>
      <a class="card hw-link" href="{{ '/download/' | relative_url }}">
        <h3>💻 PCs & TV Boxes</h3>
        <p>Steam Deck, ROG Ally, x86_64 machines, and Android TV boxes.</p>
        <span class="hw-count">41 devices</span>
      </a>
    </div>
  </section>

  <!-- Get started — 3 substantial steps -->
  <section class="cv-auto" id="get-started">
    <div class="section-heading">
      <h2>Get started</h2>
    </div>
    <div class="steps-grid">
      <div class="step-card card">
        <span class="step-number">1</span>
        <h3>Pick your device</h3>
        <p>Find your hardware and download the right image.</p>
        <div class="step-pills">
          <a href="{{ '/download/' | relative_url }}" class="step-pill">Handhelds</a>
          <a href="{{ '/download/' | relative_url }}" class="step-pill">SBCs</a>
          <a href="{{ '/download/' | relative_url }}" class="step-pill">PCs</a>
        </div>
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Browse devices</a>
      </div>
      <div class="step-card card">
        <span class="step-number">2</span>
        <h3>Flash</h3>
        <p>Write the image to an SD card or SSD. Takes about 2 minutes.</p>
        <div class="step-tools">
          <a href="https://etcher.balena.io/" target="_blank" rel="noreferrer">balenaEtcher</a>
          <span class="step-sep">&middot;</span>
          <a href="https://www.raspberrypi.com/software/" target="_blank" rel="noreferrer">RPi Imager</a>
          <span class="step-sep">&middot;</span>
          <code>dd</code>
        </div>
      </div>
      <div class="step-card card">
        <span class="step-number">3</span>
        <h3>Play</h3>
        <p>Boot, pair controllers, add your games via network share or USB. That's it.</p>
        <a class="btn secondary" href="https://compat.reglinux.org">Check compatibility</a>
      </div>
    </div>
  </section>

  <!-- Community — compact row -->
  <section class="cv-auto" id="community">
    <div class="community-row">
      {% for channel_id in home_channel_order %}
        {% assign channel = community_channels | where: "id", channel_id | first %}
        {% if channel %}
          <a href="{{ channel.url }}" target="_blank" rel="noreferrer" class="community-link-card">
            <img src="{{ channel.icon | relative_url }}" alt="{{ channel.icon_alt }}" loading="lazy" />
            <span>{{ channel.home_label }}</span>
            <span class="arrow">&rarr;</span>
          </a>
        {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Free, open source, and community supported.</p>
</footer>

<style>
/* Social proof */
.social-proof { padding: 0; }
.proof-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; padding: 0.5rem 0 1rem; }
.proof-badges a { display: inline-block; line-height: 0; }
.proof-badges img { height: 22px; border-radius: 4px; }

/* Stats */
.stats-strip { padding: 0; }
.stats-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; padding: 1rem 0; }
.stat-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: rgba(43, 176, 233, 0.08); border: 1px solid rgba(43, 176, 233, 0.2);
  border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: var(--text);
}
.stat-icon { font-size: 1.1rem; }

/* Emulator tile grid — reuse play page's .emulator-tile class */
.emu-tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}
@media (max-width: 600px) { .emu-tile-grid { grid-template-columns: repeat(2, 1fr); } }

/* Hardware cards */
.hw-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 768px) { .hw-cards { grid-template-columns: 1fr; } }
.hw-link {
  text-decoration: none; color: var(--text);
  transition: transform 0.15s, border-color 0.15s;
}
.hw-link:hover { transform: translateY(-2px); border-color: var(--accent); text-decoration: none; }
.hw-link h3 { margin-top: 0; font-size: 1.1rem; }
.hw-link p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; }
.hw-count { font-size: 0.75rem; color: var(--accent); font-weight: 600; font-family: 'JetBrains Mono', monospace; }

/* Get started steps */
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }
.step-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.step-number {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(120deg, #2bb0e9, #1d7ddc);
  color: #030915; font-size: 1.2rem; font-weight: 700;
}
.step-card h3 { margin: 0; font-size: 1.1rem; }
.step-card p { color: var(--text-muted); font-size: 0.85rem; margin: 0; }
.step-pills { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }
.step-pill {
  padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;
  background: rgba(43, 176, 233, 0.08); border: 1px solid rgba(43, 176, 233, 0.2);
  color: var(--accent); text-decoration: none;
}
.step-pill:hover { background: rgba(43, 176, 233, 0.15); text-decoration: none; }
.step-tools { font-size: 0.82rem; color: var(--text-muted); }
.step-tools a { color: var(--accent); }
.step-sep { margin: 0 0.3rem; opacity: 0.4; }
.step-card .btn { margin-top: auto; }

/* Community row — compact */
.community-row {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;
}
@media (max-width: 600px) { .community-row { grid-template-columns: 1fr; } }
.community-link-card {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none; color: var(--text);
  font-size: 0.85rem; font-weight: 500;
  transition: border-color 0.15s;
}
.community-link-card:hover { border-color: var(--accent); text-decoration: none; }
.community-link-card img { width: 20px; height: 20px; }
.community-link-card .arrow { margin-left: auto; color: var(--text-muted); }
</style>
