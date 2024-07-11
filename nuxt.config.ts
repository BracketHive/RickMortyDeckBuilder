import { Static } from "vue";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: false,
  modules: [
    // Workaround for electron bug found at: https://github.com/caoxiemeihao/nuxt-electron/issues/74
    (options, nuxt) => {
      if (!nuxt.options.dev) {
        nuxt.options.nitro.runtimeConfig ??= {}
        nuxt.options.nitro.runtimeConfig.app ??= {}
        nuxt.options.nitro.runtimeConfig.app.baseURL = './'
      }
    },
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-electron"
  ],
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
    disableDefaultOptions: true,
  },
  ssr: false,
  runtimeConfig: {
    public: {
      API: { baseURL: process.env.API_BASE_URL },
    }
  },
})
