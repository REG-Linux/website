---
layout: default
title: What you can play
permalink: /play/
body_class: play
description: Emulators, game engines, and native ports bundled with REG Linux — arcade, console, computer, and indie games ready out of the box.
---
{% assign emulators = site.data.emulators %}
{% assign engines = site.data.engines %}
{% assign ports = site.data.ports %}
{% assign bundled = site.data.bundled %}
{% assign bundled_games = site.data.bundled_games %}
{% include site-header.html nav_current="play" %}

<main>
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">50+ systems &middot; 40+ ports &middot; 8 engines</p>
      <h1>Play everything</h1>
      <p class="lede">
        REG Linux comes with pre-configured emulators, open-source game engines, and native ports.
        Controllers, shaders, and hotkeys are set up — just add your games.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download REG Linux</a>
        <a class="btn secondary" href="https://reglinux.org/wiki/systems/" target="_blank" rel="noreferrer">Full systems list on wiki</a>
      </div>
    </div>
  </section>

  <!-- Emulators -->
  <section class="play-section cv-auto" id="emulators">
    <div class="section-heading">
      <p class="eyebrow">Emulators</p>
      <h2>Arcade, console, and computer</h2>
      <p>All emulators are pre-configured with sensible defaults for controls, video, and audio.</p>
    </div>
    {% for group in emulators %}
      <h3>{{ group.title }}</h3>
      <p>{{ group.description }}</p>
      <div class="emulator-grid">
        {% for system in group.systems %}
          <figure class="emulator-card">
            <img src="{{ system.image | relative_url }}" alt="{{ system.alt }}" loading="lazy" />
            <figcaption>
              <strong>{{ system.name }}</strong>
              <span>{{ system.caption }}</span>
            </figcaption>
          </figure>
        {% endfor %}
      </div>
    {% endfor %}
  </section>

  <!-- Game Engines -->
  <section class="play-section cv-auto" id="engines">
    <div class="section-heading">
      <p class="eyebrow">Game engines</p>
      <h2>Run games natively</h2>
      <p>Open-source engines that play specific game formats directly, without emulation.</p>
    </div>
    <div class="engine-grid">
      {% for engine in engines %}
        <article class="card engine-card">
          <div class="engine-logos">
            {% for logo in engine.logos %}
              <img src="{{ logo.src | relative_url }}" alt="{{ logo.alt }}" loading="lazy" />
            {% endfor %}
          </div>
          <h3>{{ engine.name }}</h3>
          <p>{{ engine.description }}</p>
          <a class="btn secondary" href="{{ engine.url }}" target="_blank" rel="noreferrer">{{ engine.cta_label }}</a>
        </article>
      {% endfor %}
    </div>
  </section>

  <!-- Ports -->
  <section class="play-section cv-auto" id="ports">
    <div class="section-heading">
      <p class="eyebrow">Native ports</p>
      <h2>Classic games, rebuilt for Linux</h2>
      <p>Source ports and reimplementations that run natively — no emulation overhead.</p>
    </div>
    <div class="port-grid">
      {% for port in ports %}
        <article class="card port-card">
          {% if port.logo %}
            <img src="{{ port.logo.src | relative_url }}" alt="{{ port.logo.alt }}" loading="lazy" class="port-logo" />
          {% endif %}
          <div>
            <h3>{{ port.name }}{% if port.release_year %} <small>({{ port.release_year }})</small>{% endif %}</h3>
            <p>{{ port.overview }}</p>
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <!-- Bundled Games -->
  <section class="play-section cv-auto" id="bundled">
    <div class="section-heading">
      <p class="eyebrow">Ready on first boot</p>
      <h2>Bundled games</h2>
      <p>{{ bundled.hero.lede }}</p>
    </div>
    <div class="bundled-grid">
      {% for game in bundled_games %}
        <article class="card bundled-card">
          {% if game.image %}
            <img src="{{ game.image | relative_url }}" alt="{{ game.name }}" loading="lazy" class="bundled-image" />
          {% endif %}
          <div>
            <h3>{{ game.name }}</h3>
            <p class="bundled-meta">{{ game.platform }} &middot; {{ game.genre }} &middot; {{ game.developer }}</p>
            <p>{{ game.description }}</p>
          </div>
        </article>
      {% endfor %}
    </div>
    <p class="small muted" style="margin-top: 1rem;">{{ bundled.legal }}</p>
  </section>
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free and community supported.</p>
</footer>
