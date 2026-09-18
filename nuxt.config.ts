import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Pre-renders the site into static HTML/CSS/JS
  nitro: {
    preset: 'github-pages',
  },

  modules: ['@pinia/nuxt', 'motion-v/nuxt', '@vueuse/nuxt'],

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.NODE_ENV === 'production' ? '/nuxt-profile/' : '/'
    },
  },
})
