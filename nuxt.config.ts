// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    originEnvKey: "NUXT_AUTH_ORIGIN",
  }
});