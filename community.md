---
layout: default
title: Community
permalink: /community/
body_class: community
description: Engage with Discord, GitHub, and the wiki to collaborate on REG Linux.
---
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
        <a class="btn primary" href="https://discord.gg/reglinux" target="_blank" rel="noreferrer">Join Discord</a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Contribute on GitHub</a>
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
    <article class="community-card">
      <div class="community-icon">
        <img src="{{ '/assets/images/discord-logo.svg' | relative_url }}" alt="Discord logo" loading="lazy" />
      </div>
      <h3>Discord</h3>
      <p>Real-time chat for support, hardware mods, and show-and-tell builds. There are dedicated channels for device flashes, wiki whispers, and preview releases.</p>
      <a class="btn secondary" href="https://discord.gg/reglinux" target="_blank" rel="noreferrer">Open Discord</a>
    </article>
    <article class="community-card">
      <div class="community-icon">
        <img src="{{ '/assets/images/github-mark.png' | relative_url }}" alt="GitHub logo" loading="lazy" />
      </div>
      <h3>GitHub</h3>
      <p>Host your PRs, report issues, and explore the Buildroot configs that power REG Linux. Repo-driven releases, CI builds, and packaging live here.</p>
      <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Visit GitHub</a>
    </article>
    <article class="community-card">
      <div class="community-icon">
        <img src="{{ '/assets/images/docs-icon.svg' | relative_url }}" alt="Documentation" loading="lazy" />
      </div>
      <h3>Wiki & docs</h3>
      <p>Installation guides, device-specific notes, emulated systems, engines, and ports live on the MkDocs wiki. Bookmark it for flashing, debugging, or developer references.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/" target="_blank" rel="noreferrer">Open the wiki</a>
    </article>
  </section>
</main>
