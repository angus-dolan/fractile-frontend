import { defineStore } from "pinia";
import { Conversation, Message } from "~/types/conversation";
import { useChatStore } from "./chat";
import { useAuthStore } from "./auth";

export const useConversationsStore = defineStore("conversations", () => {
  const { $fractile } = useNuxtApp();
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const items = ref<Conversation[]>([]);

  function all(): Conversation[] {
    return items.value;
  }

  function get(id: number): Conversation | undefined {
    return items.value.find((item) => item.id == id);
  }

  function create(payload: Conversation) {
    items.value.push(payload);
  }

  async function fetchAll() {
    items.value = [];
    const { data, error } = await $fractile.chat.conversations();

    if (!error.value && data.value) {
      const parsed = parseCreatedAtDates(data.value) as Conversation[];
      const sorted = parsed.sort((a, b) => b.id - a.id);
      items.value = sorted;
    } else {
      throw new Error(`There was a problem fetching conversations`);
    }
  }

  async function fetchOne(id: number): Promise<Message[]> {
    const { data, error } = await $fractile.chat.conversation(id);

    return new Promise((resolve, reject) => {
      if (!error.value && data.value) {
        const messages = parseCreatedAtDates(data.value) as Message[];
        resolve(messages);
      } else {
        reject(`There was a problem fetching conversation id:${id}`);
      }
    });
  }

  async function restore(id: number) {
    const conversation = get(id);

    if (conversation) {
      conversation.messages = await fetchOne(id);
    } else {
      throw new Error(`Conversation with id ${id} not found.`);
    }
  }

  function updateAll(payload: Conversation[]) {
    items.value = payload;
  }

  function update(id: number, payload: Conversation) {
    const index = findIndex(id);
    if (index !== -1) {
      items.value[index] = payload;
    } else {
      throw new Error(`Can't update conversation with id ${id}, not found.`);
    }
  }

  function addMessage(id: number, payload: Message) {
    const index = findIndex(id);
    const convId = chatStore.convId;

    if (index == -1 && convId) {
      create({
        id: convId,
        user_id: authStore.user?.id,
        title: payload.text,
        created_at: new Date(),
        messages: [payload],
      } as Conversation);
    } else if (index !== -1) {
      items.value[index].messages.push(payload);
    } else {
      throw new Error("There was a problem adding a message");
    }
  }

  function removeAll() {
    items.value = [];
  }

  function remove(id: number) {
    const index = findIndex(id);
    if (index !== -1) {
      items.value.splice(index, 1);
    } else {
      throw new Error(`Can't remove conversation with id ${id}, not found.`);
    }
  }

  const findIndex = (id: number) => items.value.findIndex((item) => item.id == id);

  const parseCreatedAtDates = (data: any) => {
    return data.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at),
    }));
  };

  return {
    all,
    get,
    create,
    fetchAll,
    fetchOne,
    restore,
    updateAll,
    update,
    addMessage,
    removeAll,
    remove,
  };
});
