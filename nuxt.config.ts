// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [],
  runtimeConfig: {
    pgHost: process.env.pgHost,
    pgPort: process.env.pgPort,
    pgName: process.env.pgName,
    pgUser: process.env.pgUser,
    pgPassword: process.env.pgPassword
  }
});