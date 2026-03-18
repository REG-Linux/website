---
layout: default
title: Community
permalink: /community/
body_class: community
description: Engage with Discord, GitHub, and the wiki to collaborate on REG Linux.
---
{% assign community_channels = site.data.community.channels %}
{% include site-header.html nav_current="community" %}

<main>
  <section class="hero community-hero">
    <div class="hero-text">
      <p class="eyebrow">Community</p>
      <h1>Community</h1>
      <p class="lede">
        REG Linux is built by volunteers. Get help, report bugs, contribute code, or just hang out.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://discord.gg/a9HH4ZpVqp" target="_blank" rel="noreferrer">
          <img class="btn-icon" src="{{ '/assets/images/discord-logo.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy" />
          Join Discord
        </a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">
          <img class="btn-icon is-invert" src="{{ '/assets/images/github-mark.png' | relative_url }}" alt="" aria-hidden="true" loading="lazy" />
          Contribute on GitHub
        </a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-regstation.webp' | relative_url }}" alt="REG-Station logo" loading="lazy" />
        <figcaption>REG-Station</figcaption>
      </figure>
    </div>
  </section>

  <section class="community-grid">
    {% for channel in community_channels %}
      <article class="community-card">
        <div class="community-icon">
          <img src="{{ channel.icon | relative_url }}" alt="{{ channel.icon_alt }}" loading="lazy" />
        </div>
        <h3>{{ channel.title }}</h3>
        <p>{{ channel.description }}</p>
        <a class="btn secondary" href="{{ channel.url }}" target="_blank" rel="noreferrer">{{ channel.cta_label }}</a>
      </article>
    {% endfor %}
  </section>
</main>
