<script setup lang="ts">
import { defineProps } from "vue";
import { Message } from "~/types/conversation";

const props = defineProps<{
  message: Message;
}>();
</script>

<template>
  <v-row no-gutters class="pa-3">
    <v-col cols="1">
      <v-avatar color="primary">
        <v-img
          class="pa-2"
          src="/images/logos/fractile-icon-light.png"
          alt="Agent Logo"
        ></v-img>
      </v-avatar>
    </v-col>
    <v-col cols="11">
      <p class="text-body-1 py-2">{{ message.text }}&nbsp;</p>
    </v-col>
  </v-row>
</template>
