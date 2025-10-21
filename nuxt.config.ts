
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vesp/nuxt-fontawesome'],
  
  // IMPORTANT: Tell Nuxt to use the app/ directory as source
  srcDir: 'app/'
})