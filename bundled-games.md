---
layout: default
title: Bundled Games
permalink: /bundled-games/
body_class: games
description: Play the legally licensed indie and open-source titles that ship with REG Linux out of the box.
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
    <a href="{{ '/bundled-games/' | relative_url }}" aria-current="page">Bundled games</a>
    <a href="{{ '/download/' | relative_url }}">Download</a>
  </nav>
  <a class="btn ghost" href="{{ '/download/' | relative_url }}">Get REG Linux</a>
</header>

<main>
  <section class="hero games-hero">
    <div class="hero-text">
      <p class="eyebrow">Curated legal content</p>
      <h1>Bundled games with REG Linux</h1>
      <p class="lede">
        REG Linux ships with a hand-picked pack of indie and open-source games whose authors have explicitly granted us
        permission to redistribute their work. Every title below includes proper credits so you know who to thank.
      </p>
      <ul class="hero-highlights">
        <li>Playable out of the box on first boot</li>
        <li>Verified licenses / permissions from original creators</li>
        <li>Great demos for showcasing REG to friends</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/games/amoeba-jump-atari2600.png' | relative_url }}" alt="Bundled game mosaic" loading="lazy" />
        <figcaption>Sample gameplay art from the bundled collection.</figcaption>
      </figure>
    </div>
  </section>

  <section class="games-legal">
    <p>Every bundled ROM or game asset is provided either under an open-source license or through written permission from the creators. We keep proof of these grants on file and can provide them to users upon request.</p>
  </section>

  {% assign grouped = site.data.bundled_games | group_by: 'platform' | sort: 'name' %}
  {% for group in grouped %}
    {% assign title_count = group.items | size %}
    <section class="games-platform" id="platform-{{ group.name | slugify }}">
      <div class="brand-heading">
        <h2>{{ group.name }}</h2>
        <p>{{ title_count }} title{% if title_count != 1 %}s{% endif %}</p>
      </div>
      <div class="games-grid">
        {% for game in group.items %}
          <article class="game-card">
            {% if game.image %}
              <img src="{{ game.image | relative_url }}" alt="{{ game.name }} screenshot" loading="lazy" />
            {% endif %}
            <div class="game-body">
              <div class="game-meta">
                <span class="chip">{{ game.genre | default: 'Indie' }}</span>
                {% if game.players %}<span class="chip">{{ game.players }} players</span>{% endif %}
              </div>
              <h3>{{ game.name }}</h3>
              <p>{{ game.description }}</p>
              <dl>
                {% if game.developer %}
                  <dt>Developer</dt>
                  <dd>{{ game.developer }}</dd>
                {% endif %}
                {% if game.publisher %}
                  <dt>Publisher</dt>
                  <dd>
                    {% if game.publisher contains 'http' %}
                      <a href="{{ game.publisher }}" target="_blank" rel="noreferrer">{{ game.publisher }}</a>
                    {% else %}
                      {{ game.publisher }}
                    {% endif %}
                  </dd>
                {% endif %}
                {% if game.release_year %}
                  <dt>Year</dt>
                  <dd>{{ game.release_year }}</dd>
                {% endif %}
                {% if game.language %}
                  <dt>Language</dt>
                  <dd>{{ game.language | upcase }}</dd>
                {% endif %}
              </dl>
            </div>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</main>

<footer class="site-footer">
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.</p>
  <p class="small">Bundled titles are included with explicit permission from their respective creators or via approved open-source licenses.</p>
</footer>
