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
      <h1>Connect with the REG Linux crew</h1>
      <p class="lede">
        Discuss hardware, discover build tips, share improvements, and help keep the wiki and builds polished. Our Discord, GitHub, and documentation hubs stay in sync with every release.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://discord.gg/M38rd2kRNw" target="_blank" rel="noreferrer">
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
        <img src="{{ '/assets/images/logo-es.png' | relative_url }}" alt="Community" loading="lazy" />
        <figcaption>Community-sourced builds and docs.</figcaption>
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
