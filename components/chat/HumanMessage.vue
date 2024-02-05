<script setup lang="ts">
import type { Message } from "~/types/conversation";
import { useAuthStore } from "~/stores/auth";

const props = defineProps<{
  message: Message;
}>();

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
              <small
                class="text-medium-emphasis text-subtitle-2"
                v-if="props.message.created_at"
              >
                {{ authStore.user?.name }}, {{ useTimeAgo(props.message.created_at) }}
              </small>
              <p class="pt-1 text-body-1">{{ props.message.text }}&nbsp;</p>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>
