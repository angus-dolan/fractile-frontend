import { onMounted, onUnmounted } from "vue";

export default function () {
  const scrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollHeight > windowHeight) {
      window.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResize = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: scrollHeight, behavior: "smooth" });
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { scrollToBottom, scrollToTop };
}
