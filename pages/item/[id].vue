<template>
  <div class="game-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="pending" class="loading-container">
        <div class="spinner"></div>
        <p>Loading game details...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Failed to load game details</h3>
        <p>{{ error.message }}</p>
        <NuxtLink to="/" class="btn btn-primary">
          Back to Home
        </NuxtLink>
      </div>
      
      <!-- Game Details (SSR) -->
      <div v-else-if="game" class="game-detail fade-in">
        <!-- Hero Section -->
        <div class="game-hero">
          <img 
            :src="game.background_image" 
            :alt="game.name"
            class="hero-image"
          />
          <div class="hero-overlay"></div>
        </div>
        
        <!-- Content -->
        <div class="game-content">
          <div class="game-header">
            <div>
              <h1>{{ game.name }}</h1>
              <div class="game-meta">
                <div class="rating-large" v-if="game.rating">
                  <span class="rating-icon">⭐</span>
                  <span class="rating-value">{{ game.rating.toFixed(1) }}</span>
                  <span class="rating-count">({{ game.ratings_count }} ratings)</span>
                </div>
                <div class="release-date" v-if="game.released">
                  📅 Released: {{ formatDate(game.released) }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Info Grid -->
          <div class="info-grid">
            <div class="info-card card" v-if="game.platforms">
              <h3>🎮 Platforms</h3>
              <div class="platforms-list">
                <span 
                  v-for="platform in game.platforms" 
                  :key="platform.platform.id"
                  class="platform-tag"
                >
                  {{ platform.platform.name }}
                </span>
              </div>
            </div>
            
            <div class="info-card card" v-if="game.genres && game.genres.length">
              <h3>🎯 Genres</h3>
              <div class="genres-list">
                <span 
                  v-for="genre in game.genres" 
                  :key="genre.id"
                  class="genre-tag"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>
            
            <div class="info-card card" v-if="game.developers && game.developers.length">
              <h3>👨‍💻 Developers</h3>
              <p>{{ game.developers.map(d => d.name).join(', ') }}</p>
            </div>
            
            <div class="info-card card" v-if="game.publishers && game.publishers.length">
              <h3>🏢 Publishers</h3>
              <p>{{ game.publishers.map(p => p.name).join(', ') }}</p>
            </div>
          </div>
          
          <!-- Description -->
          <div class="description-section card" v-if="game.description_raw">
            <h2>📖 About</h2>
            <p class="description-text">{{ game.description_raw }}</p>
          </div>
          
          <!-- Additional Info -->
          <div class="additional-info">
            <div class="info-card card" v-if="game.metacritic">
              <h3>📊 Metacritic Score</h3>
              <div class="metacritic-score" :class="getMetacriticClass(game.metacritic)">
                {{ game.metacritic }}
              </div>
            </div>
            
            <div class="info-card card" v-if="game.playtime">
              <h3>⏱️ Average Playtime</h3>
              <p class="playtime">{{ game.playtime }} hours</p>
            </div>
            
            <div class="info-card card" v-if="game.esrb_rating">
              <h3>🔞 ESRB Rating</h3>
              <p>{{ game.esrb_rating.name }}</p>
            </div>
          </div>
          
          <!-- Website Link -->
          <div class="actions-section" v-if="game.website">
            <a :href="game.website" target="_blank" rel="noopener" class="btn btn-primary">
              🌐 Visit Official Website
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const api = useApi()

// SSR Data Fetching with useFetch
const { data: game, pending, error } = await useFetch(`/games/${route.params.id}`, {
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: useRuntimeConfig().public.rawgApiKey
  },
  server: true, // Enable SSR
  lazy: false
})

// SEO Meta Tags
useHead({
  title: game.value ? `${game.value.name} - Game Details` : 'Game Details',
  meta: [
    { name: 'description', content: game.value?.description_raw?.substring(0, 160) || 'Game details' }
  ]
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getMetacriticClass = (score: number) => {
  if (score >= 75) return 'score-high'
  if (score >= 50) return 'score-medium'
  return 'score-low'
}
</script>

<style scoped>
.game-detail-page {
  padding-bottom: var(--spacing-xl);
  min-height: 100vh;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  text-align: center;
  min-height: 500px;
}

.error-icon {
  font-size: 5rem;
  margin-bottom: var(--spacing-md);
}

.game-hero {
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: var(--spacing-xl);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--bg-primary), transparent);
}

.game-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.game-header {
  margin-bottom: var(--spacing-xl);
}

.game-header h1 {
  margin-bottom: var(--spacing-sm);
}

.game-meta {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: center;
}

.rating-large {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.rating-icon {
  font-size: 1.5rem;
}

.rating-value {
  color: #f59e0b;
}

.rating-count {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 400;
}

.release-date {
  color: var(--text-secondary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.info-card {
  padding: var(--spacing-lg);
}

.info-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: 1.125rem;
}

.platforms-list,
.genres-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.platform-tag,
.genre-tag {
  padding: 0.5rem 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.description-section {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.description-section h2 {
  margin-bottom: var(--spacing-md);
}

.description-text {
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-line;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.metacritic-score {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.score-high {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.score-medium {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.score-low {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.playtime {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-light);
  text-align: center;
}

.actions-section {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .game-hero {
    height: 300px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
