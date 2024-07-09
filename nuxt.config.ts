// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt"
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      API: { baseURL: process.env.API_BASE_URL },
    }
  },
})
