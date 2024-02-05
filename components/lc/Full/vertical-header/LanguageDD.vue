<script setup lang="ts">
import type { languageType } from "@/types/header";

import en from "/images/flag/icon-flag-en.svg";
import pl from "/images/flag/icon-flag-pl.svg";

const languages: languageType[] = [
  { title: "English", subtext: "UK", value: "en", avatar: en },
  { title: "Polski", subtext: "Polska", value: "pl", avatar: pl },
];
</script>
<template>
  <v-menu :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon variant="text" color="primary" v-bind="props">
        <v-avatar size="22">
          <img
            v-if="$i18n.locale === 'en'"
            :src="en"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
          <img
            v-if="$i18n.locale === 'pl'"
            :src="pl"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list class="theme-list">
        <v-list-item
          v-for="(item, index) in languages"
          :key="index"
          color="primary"
          :active="$i18n.locale == item.value"
          class="d-flex align-center"
          @click="() => ($i18n.locale = item.value)"
        >
          <template v-slot:prepend>
            <v-avatar size="22">
              <img
                :src="item.avatar"
                :alt="item.avatar"
                width="22"
                height="22"
                class="obj-cover"
              />
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-regular">
            {{ item.title }}
            <span class="text-disabled text-subtitle-1 pl-2">({{ item.subtext }})</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
