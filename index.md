---
layout: default
title: Retro Emulation OS
body_class: home
description: REG Linux — retro gaming OS for 186 devices. Flash, boot, play. Supports ARM, AArch64, RISC-V, and x86_64.
preload_image: /assets/images/logo-regstation.webp
---
{% assign home = site.data.home %}
{% assign community_channels = site.data.community.channels %}
{% assign home_channel_order = "discord|wiki|github" | split: "|" %}
{% include site-header.html nav_current="home" %}

<main>
  <!-- Hero: one image, one pitch, one CTA -->
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
        <img src="https://img.shields.io/discord/1308118498073255936?style=flat-square&logo=discord&label=Discord&color=5865F2" alt="Discord Members" loading="lazy" />
      </a>
      <a href="https://github.com/REG-Linux/REG-Linux/releases" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/github/v/release/REG-Linux/REG-Linux?style=flat-square&logo=github&label=Latest%20Release&color=22c55e" alt="Latest Release" loading="lazy" />
      </a>
      <a href="https://github.com/REG-Linux/REG-Linux/commits/main" target="_blank" rel="noreferrer">
        <img src="https://img.shields.io/github/last-commit/REG-Linux/REG-Linux?style=flat-square&logo=github&label=Last%20Commit&color=f59e0b" alt="Last Commit" loading="lazy" />
      </a>
    </div>
  </section>

  <!-- Stats badges -->
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

  <!-- Emulators: static logo grid -->
  <section class="emulators-strip cv-auto" id="stack">
    <div class="section-heading">
      <h2>Pre-configured emulators</h2>
      <p>RetroArch, MAME, and specialist emulators — inputs, shaders, and hotkeys already set up.</p>
    </div>
    <div class="emu-logo-grid">
      {% for logo in home.emulator_logos %}
        <figure class="emu-logo">
          <img src="{{ logo.image | relative_url }}" alt="{{ logo.label }}" loading="lazy" />
          <figcaption>{{ logo.label }}</figcaption>
        </figure>
      {% endfor %}
    </div>
    <div style="text-align: center; margin-top: 1.5rem;">
      <a class="btn secondary" href="{{ '/play/' | relative_url }}">All systems, engines, and ports</a>
    </div>
  </section>

  <!-- Hardware: compact -->
  <section class="hardware-strip cv-auto" id="hardware">
    <div class="section-heading">
      <h2>Runs on your hardware</h2>
      <p>Handhelds, SBCs, TV boxes, and PCs. ARM, AArch64, RISC-V, x86_64.</p>
    </div>
    <div class="hw-cards">
      <article class="card">
        <h3>Handhelds</h3>
        <p>Anbernic, Powkiddy, Retroid, AYN, AYANEO. Controls and suspend work out of the box.</p>
      </article>
      <article class="card">
        <h3>SBCs</h3>
        <p>Raspberry Pi, Orange Pi, Radxa, Khadas. Plug in, boot, play.</p>
      </article>
      <article class="card">
        <h3>PCs</h3>
        <p>Steam Deck, ROG Ally, or any x86_64 machine. Boot from USB or install to disk.</p>
      </article>
    </div>
    <div style="text-align: center; margin-top: 1.5rem;">
      <a class="btn primary" href="{{ '/download/' | relative_url }}">Browse all 186 devices</a>
      <a class="btn secondary" href="https://compat.reglinux.org">Check compatibility</a>
    </div>
  </section>

  <!-- Get started: 3 steps -->
  <section class="get-started cv-auto" id="get-started">
    <div class="section-heading">
      <h2>Get started in 3 steps</h2>
    </div>
    <div class="steps-grid">
      {% for step in home.getting_started_steps %}
        <div class="step-card">
          <span class="step-number">{{ step.number }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
          {% if step.cta_label %}
            <a class="btn secondary" href="{{ step.cta_href | relative_url }}">{{ step.cta_label }}</a>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </section>

  <!-- Community -->
  <section class="community cv-auto" id="community">
    <div class="section-heading">
      <h2>Open source, community-driven</h2>
    </div>
    <div class="community-links">
      {% for channel_id in home_channel_order %}
        {% assign channel = community_channels | where: "id", channel_id | first %}
        {% if channel %}
          <a href="{{ channel.url }}" target="_blank" rel="noreferrer" class="community-card community-link-card">
            <span class="community-link-label">
              <img src="{{ channel.icon | relative_url }}" alt="{{ channel.icon_alt }}" loading="lazy" />
              <span>{{ channel.home_label }}</span>
            </span>
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
/* Social proof badges */
.social-proof { padding: 0; }
.proof-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0 1rem;
}
.proof-badges a { display: inline-block; line-height: 0; }
.proof-badges img { height: 22px; border-radius: 4px; }

/* Stats badges */
.stats-strip { padding: 0; }
.stats-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 0;
}
.stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--card, rgba(12,16,28,0.75));
  border: 1px solid var(--border, rgba(255,255,255,0.08));
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text, #f4f6fb);
}
.stat-icon { font-size: 1.1rem; }

/* Emulator logo grid */
.emu-logo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}
@media (max-width: 600px) { .emu-logo-grid { grid-template-columns: repeat(2, 1fr); } }
.emu-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
}
.emu-logo img {
  width: 64px;
  height: 64px;
  object-fit: contain;
}
.emu-logo figcaption {
  font-size: 0.75rem;
  color: var(--text-muted, #b2bed1);
  text-align: center;
}

/* Hardware cards */
.hw-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
@media (max-width: 768px) { .hw-cards { grid-template-columns: 1fr; } }
.hw-cards .card h3 { margin-top: 0; font-size: 1.1rem; }
.hw-cards .card p { font-size: 0.85rem; color: var(--text-muted, #b2bed1); }

/* Steps */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }
.step-card {
  text-align: center;
  padding: 1.5rem;
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(120deg, #2bb0e9, #1d7ddc);
  color: #030915;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.step-card h3 { margin: 0 0 0.3rem; font-size: 1.1rem; }
.step-card p { color: var(--text-muted, #b2bed1); font-size: 0.9rem; margin: 0 0 0.75rem; }
</style>
