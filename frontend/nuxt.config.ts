// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-04',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'NIRD - Plateforme Communautaire',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Plateforme pour faire croître la communauté NIRD - Numérique Inclusif, Responsable et Durable' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
