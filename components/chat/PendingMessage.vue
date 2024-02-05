<script setup lang="ts">
import { useChatStore } from "~/stores/chat";
import { useAuthStore } from "~/stores/auth";
const chatStore = useChatStore();
const authStore = useAuthStore();
</script>

<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-sheet color="white" class="rounded-md">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="1">
              <v-avatar variant="tonal" color="primary">
                <span class="text-h5">{{ authStore.user?.getInitials() }}</span>
              </v-avatar>
            </v-col>

            <v-col cols="12" md="11">
              <small class="text-medium-emphasis text-subtitle-2">
                {{ authStore.user?.name }}, {{ useTimeAgo(new Date()) }}
              </small>
              <p class="pt-1 text-body-1">{{ chatStore.pendingPrompt }}&nbsp;</p>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>
