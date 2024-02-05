<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from "vue-tabler-icons";
import { useAuthStore } from "~/stores/auth";
import { Form } from "vee-validate";
import { ref, watch } from "vue";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const valid = ref(true);
const apiError = ref("");
const showPassword = ref(false);

const emailRules = ref([
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const passwordRules = ref([
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length <= 10) || "Password must be less than 10 characters",
]);

async function validate() {
  email.value = email.value.trim();
  password.value = password.value.trim();

  if (valid.value) {
    const successfulLogin = await authStore.login(email.value, password.value);

    if (successfulLogin) {
      location.reload();
    } else {
      apiError.value =
        "We couldn't find an account with that email and password combination. Please try again.";
    }
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

watch([email, password], () => {
  valid.value =
    emailRules.value.every((rule) => rule(email.value)) &&
    passwordRules.value.every((rule) => rule(password.value));
});
</script>

<template>
  <div v-if="apiError.length > 0" class="mt-3">
    <v-alert density="compact" color="error" variant="tonal">{{ apiError }}</v-alert>
  </div>

  <Form @submit="validate()" v-slot="{ errors, isSubmitting }" class="mt-3">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Email</v-label
    >
    <VTextField
      :rules="emailRules"
      hide-details="auto"
      v-model="email"
      autocomplete="username"
      class="mb-6"
      required
    ></VTextField>
    <div class="d-flex items-center pb-2">
      <v-label class="text-subtitle-1 font-weight-semibold pb-1 text-lightText"
        >Password</v-label
      >
      <VBtn variant="plain" density="compact" :ripple="false" @click="togglePassword">
        <EyeIcon width="20px" height="20px" v-if="showPassword" />
        <EyeOffIcon width="20px" height="20px" v-else />
      </VBtn>
    </div>
    <VTextField
      name="password"
      :rules="passwordRules"
      hide-details="auto"
      v-model="password"
      class="pwdInput"
      :type="showPassword ? 'text' : 'password'"
      autocomplete="current-password"
      required
    >
    </VTextField>
    <div class="d-flex mt-6">
      <v-btn
        :loading="isSubmitting"
        :disabled="!password"
        color="primary"
        type="submit"
        size="large"
        block
        flat
        >Sign In</v-btn
      >
    </div>
    <div v-if="errors.apiError" class="mt-3">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>

<style scoped lang="scss">
:deep(.v-input__details) {
  padding: 0.75rem 0 0 0;
  font-weight: 600;
}
</style>
