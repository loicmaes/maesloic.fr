// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  i18n: {
    locales: [
      {

      }
    ],
    defaultLocale: "",
    strategy: "prefix_except_default",
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  googleFonts: {
    families: {
      Montserrat: {
        ital: "100..900",
        wght: "100..900",
      }
    }
  },
  colorMode: {
    preference: "system",
    fallback: "dark"
    classPrefix: "",
    classSuffix: "",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
