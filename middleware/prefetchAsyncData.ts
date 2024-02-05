import { useConversationsStore } from "~/stores/conversations";
import { useChatStore } from "~/stores/chat";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const conversationsStore = useConversationsStore();
  const chatStore = useChatStore();

  const conversationDataDependants = ["index", "chat", "chat-id"];

  if (conversationDataDependants.includes(to.name)) {
    await conversationsStore.fetchAll();
  }
});
