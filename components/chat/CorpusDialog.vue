<script setup lang="ts">
import { CorpusCard } from "#build/components";
import { XIcon } from "vue-tabler-icons";
import { useChatStore } from "~/stores/chat";
import { useCorporaStore } from "~/stores/corpora";
const chatStore = useChatStore();
const corporaStore = useCorporaStore();
const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);

const selected = computed(() => chatStore.corpus?.id);
function select(id: number) {
  chatStore.setCorpus(id);
  close();
}

function handleBackropClick(event: any) {
  if (event.target.classList.value == "v-overlay__scrim") {
    close();
  }
}

function reset() {
  chatStore.unsetCorpus();
  selected;
  close();
}

function close() {
  emit("update:visible", false);
}

onBeforeMount(() => {
  corporaStore.fetchAll();
});
</script>

<template>
  <v-row justify="center">
    <v-dialog @click="handleBackropClick" :model-value="visible" scrollable width="auto">
      <v-card>
        <div class="pl-6 pr-4 py-6 d-flex justify-space-between align-center">
          <h4>Select</h4>
          <div class="cursor-pointer" @click="close"><XIcon /></div>
        </div>
        <v-card-text :style="'height: 300px; min-width: 350px'">
          <v-radio-group v-model="selected" column>
            <v-radio
              class="font-weight-semibold border pa-4 rounded-md mb-2 text-black"
              v-for="corpus in corporaStore.all()"
              :label="corpus.name"
              :value="corpus.id"
              @click="select(corpus.id)"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" variant="text" @click="reset">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
