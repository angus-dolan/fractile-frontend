import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface IAuthUser {
  id: number;
  name: string;
  orgId: number;
  orgName: string;
  email: string;
  getInitials: () => string;
}

export const useAuthStore = defineStore("auth", () => {
  const { $fractile } = useNuxtApp();

  const accessToken = ref(useToken("fractile.access_token"));
  const refreshToken = ref(useToken("fractile.refresh_token"));
  const accessTokenData = ref(useJwtDecoder(accessToken.value.get() || ""));
  const authenticated = computed(() => accessTokenData.value.isValid);

  const user = ref(transformJwtToUser(useJwtDecoder(accessToken.value.get()).payload)); // TODO: tidy this up a bit

  async function login(username: string, password: string) {
    const { data, error } = await $fractile.authentication.login(username, password);

    if (error.value || !data.value) {
      return false;
    }

    const { access_token, refresh_token } = data.value;
    accessToken.value.set(access_token);
    refreshToken.value.set(refresh_token);

    return true;
  }

  function logout() {
    accessToken.value.erase();
    refreshToken.value.erase();
    user.value = null;
    location.reload();
  }

  async function refresh() {
    const { data, error } = await $fractile.authentication.refresh();

    if (!error.value && data.value) {
      accessToken.value.set(data.value.access_token);
    }
  }

  function transformJwtToUser(decoded: any): IAuthUser | null {
    if (!decoded) return null;

    return {
      id: decoded.id,
      name: decoded.name,
      orgId: decoded.org_id,
      orgName: decoded.org,
      email: decoded.sub,
      getInitials: function () {
        return this.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase();
      },
    };
  }

  function validRefreshToken() {
    refreshToken.value.reload();

    return useJwtDecoder(refreshToken.value.get() || "").isValid;
  }

  function validAccessToken() {
    accessToken.value.reload();

    return useJwtDecoder(accessToken.value.get() || "").isValid;
  }

  return {
    accessToken,
    refreshToken,
    authenticated,
    login,
    logout,
    refresh,
    validRefreshToken,
    validAccessToken,
    user,
  };
});
