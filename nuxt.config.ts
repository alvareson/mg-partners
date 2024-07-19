// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // modules: ["@nuxtjs/i18n", "nuxt-directus", "@nuxtjs/robots"],
  modules: ["nuxt-directus", "@nuxtjs/robots"],

  plugins: [
    // "~/plugins/i18n.ts",
    "~/plugins/img/index.ts",
    "~/plugins/vue-tel-input.client.ts",
    "~/plugins/thtml-directive.ts"
  ],

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },

  // routeRules: {
  //   "/": { redirect: "/en" },
  // },

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ["https://*"],
    },
  },

  robots: {
    rules: {
      UserAgent: '*',
      Disallow: ''
    }
  },

  // i18n: {
  //   locales: [
  //     { code: "en", iso: "en-US", name: "English", file: "en-US.ts", dir: "ltr" },
  //     { code: "fr", iso: "fr-FR", name: "Français", file: "fr-FR.ts", dir: "ltr" },
  //     { code: "ar", iso: "ar-EG", name: "العربية (Arabic)", file: "ar-EG.ts", dir: "rtl" },
  //   ],
  //   defaultLocale: "en",
  //   strategy: "prefix",
  //   langDir: "i18n/lang",
  //   lazy: false,
  // },

  directus: {
    url: process.env.NUXT_CMS_API_URL || "http://0.0.0.0:8055",
  },

  runtimeConfig: {
    public: {
      cmsAssetsUrl: process.env.NUXT_PUBLIC_CMS_ASSETS_URL || "http://0.0.0.0:8055/assets/",
      mindallApiFetchPropertiesUrl: process.env.NUXT_PUBLIC_MINDALL_API_FETCH,
      mapboxAccessToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
    },
  },

  ssr: true,
  compatibilityDate: "2024-07-09"
})