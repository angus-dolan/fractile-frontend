import { useChatStore } from "~/stores/chat";
import { ref, nextTick } from "vue";

export default function () {
  const chatStore = useChatStore();
  const inputActive = ref(false);
  const prompt = ref("");
  const rows = ref(1);

  const isDeleteOrBackspace = (key: string) => ["Delete", "Backspace"].includes(key);
  const isNewline = (char: string) => char === "\n";

  const decreaseRows = () => {
    if (rows.value > 1) {
      rows.value--;
    }
  };

  const increaseRows = () => {
    if (rows.value < 5) {
      rows.value++;
    }
  };

  const handleDeleteOrBackspace = (
    event: any,
    start: number,
    end: number,
    inputElem: any,
  ) => {
    if (start !== end) {
      const selectedText = inputElem.value.substring(start, end);
      if (selectedText.includes("\n")) {
        rows.value = 1;
      }
    } else {
      if (event.key === "Delete" && isNewline(inputElem.value[start])) {
        decreaseRows();
      } else if (event.key === "Backspace" && isNewline(inputElem.value[start - 1])) {
        decreaseRows();
      }
    }
  };

  const handleEnterKey = (event: any, start: number, end: number, inputElem: any) => {
    event.preventDefault();

    if (event.shiftKey) {
      increaseRows();
      const before = prompt.value.substring(0, start);
      const after = prompt.value.substring(end);
      prompt.value = `${before}\n${after}`;

      nextTick(() => {
        inputElem.setSelectionRange(start + 1, start + 1);
      });
    } else {
      submit();
    }
  };

  const handleKeydown = (event: any) => {
    if (!inputActive.value) return;

    const inputElem = event.target;
    const start = inputElem.selectionStart;
    const end = inputElem.selectionEnd;

    if (isDeleteOrBackspace(event.key)) {
      handleDeleteOrBackspace(event, start, end, inputElem);
    } else if (event.key === "Enter") {
      handleEnterKey(event, start, end, inputElem);
    }
  };

  const submit = () => {
    if (chatStore.pending) return;

    chatStore.query(prompt.value);
    prompt.value = "";
    rows.value = 1;
  };

  return {
    inputActive,
    rows,
    prompt,
    handleKeydown,
    submit,
  };
}
