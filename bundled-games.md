---
layout: default
title: Bundled Games
permalink: /bundled-games/
body_class: games
description: Play the legally licensed indie and open-source titles that ship with REG Linux out of the box.
---
{% include site-header.html nav_current="bundled-games" ghost_label="Get REG Linux" %}

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

  {% assign all_games = site.data.bundled_games | sort: 'name' %}
  <section class="games-grid-two">
    {% for game in all_games %}
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
          <dl class="game-details">
            {% if game.platform %}
              <dt>System</dt>
              <dd>{{ game.platform }}</dd>
            {% endif %}
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
  </section>
</main>

<footer class="site-footer">
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.</p>
  <p class="small">Bundled titles are included with explicit permission from their respective creators or via approved open-source licenses.</p>
</footer>
