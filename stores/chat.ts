import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { IQueryPayload } from "~/types/chat";
import { Message, Conversation } from "~/types/conversation";
import { useConversationsStore } from "./conversations";
import { useCorporaStore } from "./corpora";
import useScroll from "~/composables/useScroll";
const { scrollToBottom } = useScroll();

const CONV_UNDEFINED = undefined;
const CORPUS_UNDEFINED = undefined;

export const useChatStore = defineStore("chat", () => {
  const { $fractile } = useNuxtApp();
  const conversations = useConversationsStore();
  const corpora = useCorporaStore();

  const convId = ref<number | undefined>(CONV_UNDEFINED);
  const conversation = computed(() => conversations.get(convId.value));

  const corpusId = ref<number | undefined>(CORPUS_UNDEFINED);
  const corpus = computed(() => corpora.get(corpusId.value));

  const pending = ref(false);
  const failure = ref(false);
  const draft = ref(false);
  const pendingPrompt = ref("");

  function draftConversation() {
    draft.value = true;
  }

  async function restoreConversation(id: number) {
    try {
      conversations.restore(id);
      convId.value = id;
      draft.value = false;
    } catch (error: any) {
      failure.value = true;
      throwError(error.message);
    }
  }

  function unsetCorpus() {
    corpusId.value = CORPUS_UNDEFINED;
  }

  function setCorpus(id: number) {
    corpusId.value = id;
  }

  async function query(prompt: string, k: number = 3, mask: boolean = false) {
    pending.value = true;
    const payload = buildQueryPayload(prompt, k, mask);

    try {
      if (draft) {
        pendingPrompt.value = prompt;
        const agentResponse = await queryApi(payload);
        convId.value = agentResponse.conversation_id;
        pending.value = false;
        draft.value = false;
        pendingPrompt.value = "";
        humanMessage({ text: prompt } as Message);
        agentMessage({
          text: agentResponse.resp,
          reasoning: agentResponse.reasoning,
        } as Message);
        await nextTick();
        scrollToBottom();
      } else {
        pendingPrompt.value = prompt;

        const agentResponse = await queryApi(payload);
        humanMessage({ text: prompt } as Message);
        agentMessage({
          text: agentResponse.resp,
          reasoning: agentResponse.reasoning,
        } as Message);

        pending.value = false;
        pendingPrompt.value = "";

        await nextTick();
        scrollToBottom();
      }
    } catch (error: any) {
      throwError(error.message);
    }
  }

  async function queryApi(payload: IQueryPayload) {
    const { data, error } = await $fractile.chat.query(JSON.stringify(payload));

    if (!error.value && data.value) {
      return data.value;
    } else {
      throwError(error.value);
    }
  }

  function buildMessage(is_human: boolean, message: Message): Message {
    return {
      id: uuidv4(),
      is_human,
      created_at: new Date(),
      text: message.text,
      reasoning: message.reasoning ?? "",
    } as Message;
  }

  function humanMessage(msg: Message): void {
    const message = buildMessage(true, msg);
    conversations.addMessage(
      convId.value ?? throwError("Conversation ID is undefined"),
      message,
    );
  }

  function agentMessage(msg: Message): void {
    const message = buildMessage(false, msg);
    conversations.addMessage(
      convId.value ?? throwError("Conversation ID is undefined"),
      message,
    );
  }

  const parseCreatedAtDates = (data: any) => {
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at),
      }));
    }

    return { ...data, created_at: new Date(data.created_at) };
  };

  const buildQueryPayload = (prompt: string, k: number, mask: boolean): IQueryPayload => {
    if (draft.value) {
      return draftQueryPayload(prompt, k, mask);
    } else {
      return convQueryPayload(prompt, k, mask);
    }
  };

  const draftQueryPayload = (prompt: string, k: number, mask: boolean): IQueryPayload => {
    const payload: IQueryPayload = {
      msg: prompt,
      k: k.toString(),
      mask: mask.toString(),
    };

    if (corpusId.value) {
      payload.corpus_id = corpusId.value?.toString();
    }

    return payload;
  };

  const convQueryPayload = (prompt: string, k: number, mask: boolean): IQueryPayload => {
    const payload: IQueryPayload = {
      msg: prompt,
      k: k.toString(),
      mask: mask.toString(),
    };

    if (corpusId.value) {
      payload.corpus_id = corpusId.value?.toString();
    }

    if (convId.value) {
      payload.conversation_id = convId.value?.toString();
    }

    return payload;
  };

  const throwError = (message: string) => {
    throw new Error(message);
  };

  return {
    corpusId,
    corpus,
    convId,
    conversation,
    pending,
    failure,
    draft,
    pendingPrompt,
    setCorpus,
    unsetCorpus,
    restoreConversation,
    draftConversation,
    query,
    queryApi,
    buildMessage,
    humanMessage,
    agentMessage,
  };
});
