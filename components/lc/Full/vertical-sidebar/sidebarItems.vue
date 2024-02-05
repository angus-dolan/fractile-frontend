<script setup lang="ts">
import { IconMessage2, IconMessagePlus, IconDatabase } from "@tabler/icons-vue";
import { useI18n } from "#imports";
import { useConversationsStore } from "~/stores/conversations";
import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";

const { t } = useI18n();
const conversationsStore = useConversationsStore();
const { width, height } = useWindowSize();
const router = useRouter();

const chatHeight = computed(() => height.value - 200);
const activeRoute = computed(() => router.currentRoute.value.name);
const active = ref("");

const { capitalize } = useTextTransform();

const navItems = computed(() => [
  {
    id: "sidebar-new-chat",
    title: capitalize(t("chat")),
    icon: IconMessagePlus,
    route: "chat",
    to: "/chat",
  },
  {
    id: "sidebar-corpus",
    title: capitalize(t("corpura")),
    icon: IconDatabase,
    route: "corpus",
    to: "/corpus",
  },
]);

const setActiveNavItem = () => {
  const activeNavItem = navItems.value.find((item) => item.route === activeRoute.value);
  active.value = activeNavItem ? activeNavItem.id : "";
};

onBeforeMount(setActiveNavItem);
</script>

<template>
  <v-list class="fractileSidebar__nav mt-5" nav>
    <template v-for="item in navItems" :key="item.id">
      <NuxtLink :to="item.to">
        <v-list-item
          @click="active = item.id"
          :class="{
            'v-list-item--active text-primary font-weight-black': active === item.id,
          }"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </NuxtLink>
    </template>
  </v-list>

  <perfect-scrollbar :style="{ height: `${chatHeight}px` }" class="mt-4">
    <v-list class="fractileSidebar__nav" style="margin-bottom: 100px" nav>
      <template v-for="conv in conversationsStore.all()" :key="conv.id">
        <NuxtLink :to="{ name: 'chat-id', params: { id: conv.id } }">
          <v-list-item
            @click="active = `conv-${conv.id}`"
            :class="{
              'v-list-item--active text-primary font-weight-black':
                active === `conv-${conv.id}`,
            }"
            :prepend-icon="IconMessage2"
            :title="conv.title"
          />
        </NuxtLink>
      </template>
    </v-list>
  </perfect-scrollbar>
</template>

<style scoped>
.ps {
  margin-bottom: 74px;
}
</style>
