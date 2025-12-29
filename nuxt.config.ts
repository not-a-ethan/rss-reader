// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    originEnvKey: "NUXT_AUTH_ORIGIN",
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    authOrigin: process.env.NUXT_AUTH_ORIGIN
  }
});