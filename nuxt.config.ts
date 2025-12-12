export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      rawgApiKey: process.env.NUXT_PUBLIC_RAWG_API_KEY || 'your-api-key-here'
    }
  },

  app: {
    head: {
      title: 'Game Collector - Nuxt SSR',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover and collect your favorite video games' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
