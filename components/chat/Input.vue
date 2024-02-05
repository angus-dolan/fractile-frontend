<script setup lang="ts">
import { IconMessageCog, IconSend, IconPlus } from "@tabler/icons-vue";
import CorpusDialog from "./CorpusDialog.vue";
import { useChatStore } from "~/stores/chat";
const chatStore = useChatStore();

const corpusDialog = ref(false);

const { inputActive, rows, prompt, handleKeydown, submit } = useChatInput();
const { capitalize } = useTextTransform();
const { t } = useI18n();
const inputLocale = computed(() => capitalize(t("enterYourQuery")));

watch(prompt, (newValue) => {
  const newLineCount = (newValue.match(/\n/g) || []).length;
  const estimatedRowCount = Math.ceil(newValue.length / 75); // estimated number of lines based on character count
  rows.value = Math.max(estimatedRowCount, newLineCount + 1); // use the larger of the two values

  if (rows.value > 5) rows.value = 5;
});

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div class="w-100">
    <CorpusDialog :visible="corpusDialog" @update:visible="corpusDialog = $event" />

    <transition-slide :duration="200" :delay="50" easing="ease-in-out" :offset="[0, 50]">
      <div v-if="mounted">
        <form :class="{ 'expanded-input-padding': rows > 1 }">
          <v-row
            class="d-flex pa-4"
            :class="{ 'align-center': rows === 1, 'align-end': rows > 1 }"
          >
            <v-col cols="2" class="d-flex justify-end">
              <NuxtLink to="/chat">
                <v-btn
                  :prepend-icon="IconPlus"
                  color="primary"
                  class="font-weight-bold"
                  variant="text"
                  :class="{ 'expanded-input-new-chat-margin': rows > 1 }"
                  >{{ $t("newChat") }}</v-btn
                >
              </NuxtLink>
            </v-col>
            <v-col auto>
              <v-textarea
                ref="promptTextarea"
                :autofocus="true"
                variant="solo"
                hide-details
                v-model="prompt"
                no-resize
                :rows="rows"
                max-rows="5"
                color="primary"
                class="shadow-none"
                rounded="md"
                :placeholder="inputLocale"
                @focus="inputActive = true"
                @blur="inputActive = false"
                @keydown="handleKeydown"
              >
                <template v-slot:prepend-inner>
                  <div
                    class="h-100 d-flex text-center"
                    :class="{ 'align-center': rows === 1, 'mb-4': rows > 1 }"
                  >
                    <v-btn
                      @click="corpusDialog = !corpusDialog"
                      class="mr-2"
                      size="36"
                      icon
                      color="primary"
                    >
                      <IconMessageCog :size="20" />
                    </v-btn>
                    <div
                      v-if="chatStore.corpus"
                      class="text-center bg-purple-lighten-5 text-purple-darken-4 rounded-md px-2 mr-2"
                      style="white-space: nowrap; max-height: 24px"
                    >
                      {{ useTextTransform().truncate(chatStore.corpus.name, 8) }}
                    </div>
                  </div>
                </template>
              </v-textarea>
            </v-col>

            <v-col cols="2">
              <v-btn
                @click="submit"
                :loading="chatStore.pending"
                color="primary"
                rounded="md"
                icon
                ><IconSend :size="20"
              /></v-btn>
            </v-col>
          </v-row>
        </form>
      </div>
    </transition-slide>
  </div>
</template>

<style lang="scss" scoped>
:deep(.v-field__input) {
  padding-top: 13px !important;
}
.expanded-input-padding {
  :deep(.v-field__input) {
    padding-top: 20px;
  }
  :deep(.expanded-input-new-chat-margin) {
    margin-bottom: 6px;
  }
}
</style>
