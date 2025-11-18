---
layout: default
title: Bundled Games
permalink: /bundled-games/
body_class: games
description: Play the legally licensed indie and open-source titles that ship with REG Linux out of the box.
---
{% assign bundled = site.data.bundled %}
{% include site-header.html nav_current="bundled-games" ghost_label="Get REG Linux" %}

<main>
  <section class="hero games-hero">
    <div class="hero-text">
      <p class="eyebrow">{{ bundled.hero.eyebrow }}</p>
      <h1>{{ bundled.hero.title }}</h1>
      <p class="lede">{{ bundled.hero.lede }}</p>
      <ul class="hero-highlights">
        {% for item in bundled.hero.highlights %}
          <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ bundled.hero.media.image | relative_url }}" alt="{{ bundled.hero.media.alt }}" loading="lazy" />
        <figcaption>{{ bundled.hero.media.caption }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="games-legal">
    <p>{{ bundled.legal }}</p>
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
  <p>{{ bundled.footer.text }}</p>
  <p class="small">{{ bundled.footer.note }}</p>
</footer>
