<script setup lang="ts">
import { IconLogout } from "@tabler/icons-vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <v-card elevation="0" variant="outlined" rounded="md" class="px-6 pr-2 py-3">
    <div class="d-flex align-center hide-menu">
      <div>
        <h6
          class="text-subtitle-1 font-weight-black textPrimary d-inline-block text-truncate"
          style="max-width: 135px"
        >
          {{ authStore.user?.name }}
        </h6>
        <div class="text-subtitle-2 textSecondary">{{ authStore.user?.orgName }}</div>
      </div>
      <div class="ml-auto">
        <v-btn
          @click="authStore.logout()"
          variant="text"
          icon
          rounded="md"
          color="primary"
        >
          <IconLogout size="22" />
          <v-tooltip activator="parent" location="top">Logout</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
