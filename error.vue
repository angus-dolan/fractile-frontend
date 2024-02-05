<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>

<template>
    <div class="d-flex justify-center align-center text-center h-100">
        <div>
            <img src="/images/backgrounds/errorimg.svg" width="500" alt="404" />
            <h1 class="text-h1 pt-3">Oops!</h1>
            <h4 class="text-h4 my-8">The page you're looking for could not be found.</h4>
            <v-btn flat color="primary" class="mb-4" to="/">Take me home</v-btn>
        </div>    
    </div>
</template>
