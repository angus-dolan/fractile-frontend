<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";

// Icon Imports
import { IconGridDots, IconMenu2, IconInfoCircleFilled } from "@tabler/icons-vue";
const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="70" class="">
    <!-- <v-btn
      class="hidden-md-and-down custom-hover-primary"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn> -->
    <v-btn
      class="ms-3 mr-3"
      icon
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <IconMenu2 size="20" stroke-width="2.5" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <v-spacer />

    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <LcFullVerticalHeaderLanguageDD />

    <!-- right sidebar -->
    <v-btn variant="text" color="primary" class="custom-hover-primary ml-3" icon>
      <IconGridDots size="20" stroke-width="2.5" />
    </v-btn>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <LcFullVerticalHeaderRightMobileSidebar />
  </v-navigation-drawer>
</template>
