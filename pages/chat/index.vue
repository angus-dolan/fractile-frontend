<script setup lang="ts">
definePageMeta({
  middleware: ["prefetch-async-data", "chat"],
});
</script>

<template>
  <div>
    <ChatInterface />
  </div>
</template>
