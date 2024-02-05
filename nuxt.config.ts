import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    "/chat/query": { proxy: `${process.env.API_BASE_URL}/query` },
    // "/chat/**": {
    //   proxy: `${process.env.API_BASE_URL}/**`,
    // },
  },

  typescript: {
    shim: false,
  },

  modules: ["@pinia/nuxt", "@morev/vue-transitions/nuxt", "@nuxtjs/i18n"],

  app: {
    head: {
      title: "Fractile",
    },
  },

  // nitro: {
  //   preset: "aws-lambda",
  // },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },

  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  hooks: {
    "vite:extendConfig": (config: any) => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve("/assets/scss/variables.scss") },
        }),
      );
    },
  },
});
