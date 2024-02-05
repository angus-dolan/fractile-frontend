<script setup lang="ts">
import { useCorporaStore } from "~/stores/corpora";
import { useChatStore } from "~/stores/chat";
const corporaStore = useCorporaStore();
const chatStore = useChatStore();
const router = useRouter();

function select(id: number) {
  chatStore.setCorpus(id);
  router.push({ name: "index" });
}
</script>

<template>
  <v-container class="w-75">
    <v-row>
      <v-col v-for="corpus in corporaStore.all()" :key="corpus.id" cols="4">
        <CorpusCard @click="select(corpus.id)" :corpus="corpus" />
      </v-col>
    </v-row>
  </v-container>
</template>
