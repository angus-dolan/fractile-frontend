<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
import sidebarItems from "./sidebarItems";
const customizer = useCustomizerStore();
</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    mobile-breakpoint="960"
    app
    :rail="customizer.mini_sidebar"
    class="fractileSidebar pa-5 pt-4"
    expand-on-hover
    width="270"
  >
    <!-- Logo -->
    <template v-slot:prepend>
      <NuxtLink to="/">
        <v-img
          class="bg-primary rounded-circle pa-2"
          :height="45"
          :width="45"
          src="/images/logos/fractile-icon-light.png"
        />
      </NuxtLink>
    </template>

    <!-- Navigation-->
    <sidebarItems />

    <!--- Profile -->
    <template v-slot:append>
      <LcFullVerticalSidebarProfile />
    </template>
  </v-navigation-drawer>
</template>
