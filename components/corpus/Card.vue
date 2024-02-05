<script setup lang="ts">
import type { Corpus } from "~/types/corpora";
import { IconSend } from "@tabler/icons-vue";

const { capitalize } = useTextTransform();
const { t } = useI18n();

const chatLocale = computed(() => capitalize(t("chat")));

defineProps<{
  corpus: Corpus;
}>();
</script>

<template>
  <v-sheet class="d-flex px-4 align-center m-0" rounded="md" height="150">
    <div class="w-100">
      <h4 class="font-weight-black pb-6 rounded-md text-center">
        {{ corpus.name }}
      </h4>

      <v-btn block elevation="0" :prepend-icon="IconSend" color="primary">{{
        chatLocale
      }}</v-btn>
    </div>
  </v-sheet>
</template>
