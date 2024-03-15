// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'href="https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
        { rel: "shortcut icon", href: "/favicon.png", type: "image/x-icon" }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        // { src: 'https://yastatic.net/share2/share.js' }
      ]
    },

  },
  css: [
    '@/assets/libs/bootstrap.min.css',
    '@/assets/scss/common.scss',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  runtimeConfig: {
    public: {
      api: process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL_PROD : process.env.API_BASE_URL,
      defaultLang: process.env.DEFAULT_LANG,
      ruSiteUrl: process.env.RU_SITE_URL || '',
      enSiteUrl: process.env.EN_SITE_URL || '',
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    ['@artmizu/yandex-metrika-nuxt', { id: process.env.YM_COUNTER }]
  ],
  i18n: {
    locales: [
      {
        code: 'ru',
        name: 'RU',
        file: 'ru-RU.json',
        domain: 'https://aronovlaw.ru',

      },
      {
        code: 'en',
        name: 'EN',
        file: 'en-US.json',
        domain: 'https://aronov.law',
      },
    ],
    langDir: 'lang',
    defaultLocale: process.env.DEFAULT_LANG,
    detectBrowserLanguage: false,
    differentDomains: false,
    strategy: 'no_prefix'
  },



})
