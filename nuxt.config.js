module.exports = {
  mode: 'spa',
  router: {
    middleware: 'auth'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/css/main.css'
  ],
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/axios'
  ],
  // buildModules: [
  //   '@nuxtjs/eslint-module'
  // ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}
