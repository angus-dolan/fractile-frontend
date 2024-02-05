import { ref } from "vue";

export default function (key: string) {
  const tokenValue = ref(localStorage.getItem(key) || "");

  function get() {
    return tokenValue.value;
  }

  function set(newValue: string) {
    tokenValue.value = newValue;
    localStorage.setItem(key, newValue);
  }

  function erase() {
    tokenValue.value = "";
    localStorage.removeItem(key);
  }

  function reload() {
    tokenValue.value = localStorage.getItem(key) || "";
  }

  return {
    get,
    set,
    erase,
    reload,
    tokenValue,
  };
}
