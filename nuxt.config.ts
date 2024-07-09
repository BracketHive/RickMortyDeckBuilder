// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    title: 'Rick & Morty Deck Builder',
    viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
    charset: 'utf-8',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt"
  ],
  ssr: false
})
