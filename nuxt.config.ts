// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],

  imports: {
    dirs: ['./stores'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
});
