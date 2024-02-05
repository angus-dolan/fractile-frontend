<script setup lang="ts">
import { IconExclamationCircle } from "@tabler/icons-vue";
import HumanMessage from "./HumanMessage.vue";
import AgentMessage from "./AgentMessage.vue";
import PendingMessage from "./PendingMessage.vue";

import { useChatStore } from "~/stores/chat";
const chatStore = useChatStore();
</script>

<template>
  <div class="d-flex">
    <div
      v-if="chatStore.draft && chatStore.pendingPrompt.length > 0"
      :style="'width: 60%'"
      class="mx-auto pa-5"
    >
      <PendingMessage />
    </div>
    <div v-if="!chatStore.draft" :style="'width: 60%'" class="mx-auto">
      <div v-for="message in chatStore.conversation?.messages" class="pa-5">
        <HumanMessage v-if="message.is_human" :message="message" />
        <AgentMessage v-else :message="message" />
      </div>
      <PendingMessage v-if="chatStore.pendingPrompt.length > 0" />
    </div>
  </div>
  <div v-if="chatStore.failure" class="d-flex justify-center">
    <v-alert
      max-width="50%"
      :icon="IconExclamationCircle"
      density="compact"
      text="Oops! Something went wrong with the chat."
      variant="outlined"
      color="error"
    ></v-alert>
  </div>

  <v-footer class="bg-grey100" app>
    <ChatInput />
  </v-footer>
</template>
