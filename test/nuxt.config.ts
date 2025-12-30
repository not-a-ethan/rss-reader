export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    strategies: {
      github: {
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret
      },
    }
  }
});