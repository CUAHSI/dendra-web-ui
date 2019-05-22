const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  /**
   * Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /**
     * You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        // SEE: https://github.com/nuxt/nuxt.js/pull/3480#issuecomment-404150387
        config.output.globalObject = 'this'
      }

      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/, // this will pick up all .js files that ends with ".worker.js"
          loader: 'worker-loader',
          exclude: /(node_modules)/
          // options: { inline: true }
        })
      }
    },

    vendor: ['chroma-js', 'highcharts', 'lodash', 'moment']
  },

  /**
   * Global CSS
   */
  css: ['~/assets/style/app.styl'],

  env: {
    // apiPath: process.env.API_PATH || '',
    // apiUri: process.env.API_URI || 'http://localhost:3030',
    apiPath: process.env.API_PATH || '/v2',
    apiUri: process.env.API_URI || 'https://api.dendra.science',

    googleMapsAPIKey: 'AIzaSyC8zfohXmxg5VzAg9G2rCypfKmU-KpOv6k'
  },

  /**
   * Headers of the page
   */
  head: {
    title: 'Dendra',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Dendra is a cyberinfrastructure project for real-time sensor data storage, retrieval, management, and curation.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },

  mode: 'spa',

  /**
   * Nuxt.js modules
   */
  modules: [],

  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/logger', ssr: false },
    { src: '~/plugins/vuetify', ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/ability', ssr: false },
    { src: '~/plugins/global-filters', ssr: false },
    { src: '~/plugins/global-mixin', ssr: false },
    { src: '~/plugins/web-workers', ssr: false }
  ],

  router: {
    middleware: ['auth', 'ability']
  },

  srcDir: 'src'
}
