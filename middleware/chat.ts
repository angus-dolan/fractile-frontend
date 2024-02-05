import { useChatStore } from "~/stores/chat";

export default defineNuxtRouteMiddleware((to, from) => {
  const chat = useChatStore();

  if (to.name === "index" || to.name === "chat") {
    chat.draftConversation();
  } else if (to.name === "chat-id" && typeof to.params.id === "string") {
    chat.restoreConversation(to.params.id);
  }
});
