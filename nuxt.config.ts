
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      solid: [
        "bolt-lightning",
        "play",
        "plus",
        "star",
        "chevron-up",
        "chevron-right",
        "chevron-down",
        "chevron-left",
        "bookmark",
        "circle-check",
        "grip",
        "grip-lines",
        "grip-vertical",
      ]
    },
  },
  srcDir: 'app/'
})