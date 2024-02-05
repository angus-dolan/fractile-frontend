import { useAuthStore } from "~/stores/auth";

// Checks if the given path is an auth page
function isAuthPage(path: string): boolean {
  return path.startsWith("/auth");
}

// Checks if the current user is a guest trying to access an auth page
function isGuestOnAuthPage(path: string, authenticated: boolean): boolean {
  return isAuthPage(path) && !authenticated;
}

// Checks if the current user is authenticated trying to access an auth page
function isUserOnAuthPage(path: string, authenticated: boolean): boolean {
  return isAuthPage(path) && authenticated;
}

export default defineNuxtRouteMiddleware((to) => {
  const store = useAuthStore();
  const { authenticated } = store;
  const { path } = to;

  // Trigger refresh token
  if (!store.validAccessToken() && store.validRefreshToken()) {
    (async () => {
      await store.refresh();

      return isAuthPage(to.path) ? navigateTo("/chat") : undefined;
    })();
  }

  // Allow unauthenticated users to access auth pages
  if (isGuestOnAuthPage(path, authenticated)) return;

  // Redirect authenticated users trying to access auth pages to the home page
  if (isUserOnAuthPage(path, authenticated)) return navigateTo("/chat");

  // Allow authenticated users to access other pages
  if (authenticated) return;

  // If we reach this point, redirect unauthenticated users to the login page
  // TODO: manage callback URL
  return navigateTo("/auth/login");
});
