<template>
  <div class="home-page">
    <div class="container">
      <div class="hero">
        <h1>Game Collector - Nuxt SSR</h1>
        <p class="subtitle">Server-Side Rendered Game Details</p>
        <p class="description">
          This Nuxt project demonstrates SSR capabilities with the RAWG API.
          Navigate to a game detail page to see server-side rendering in action.
        </p>
        
        <div class="example-links">
          <h3>Try these examples:</h3>
          <div class="links-grid">
            <NuxtLink to="/item/3498" class="btn btn-primary">
              🎮 Grand Theft Auto V
            </NuxtLink>
            <NuxtLink to="/item/4200" class="btn btn-primary">
              🎮 Portal 2
            </NuxtLink>
            <NuxtLink to="/item/5286" class="btn btn-primary">
              🎮 Tomb Raider
            </NuxtLink>
            <NuxtLink to="/item/28" class="btn btn-primary">
              🎮 Red Dead Redemption 2
            </NuxtLink>
          </div>
        </div>
        
        <div class="features">
          <div class="feature card">
            <h3>⚡ SSR</h3>
            <p>Server-side rendering for better SEO and initial load performance</p>
          </div>
          <div class="feature card">
            <h3>🔍 SEO Optimized</h3>
            <p>Dynamic meta tags for each game page</p>
          </div>
          <div class="feature card">
            <h3>🚀 Fast</h3>
            <p>Optimized with Nuxt 3 and Vue 3 Composition API</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Game Collector - Nuxt SSR Demo',
  meta: [
    { name: 'description', content: 'Server-side rendered game collector application using Nuxt 3 and RAWG API' }
  ]
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
}

.hero {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  margin-bottom: var(--spacing-md);
}

.subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.description {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xl);
  line-height: 1.8;
}

.example-links {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-lg);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.example-links h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-sm);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.feature {
  padding: var(--spacing-lg);
  text-align: center;
}

.feature h3 {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.feature p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
