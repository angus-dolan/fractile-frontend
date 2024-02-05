export default function () {
  const uppercase = (text: string) => text.toUpperCase();
  const lowercase = (text: string) => text.toLowerCase();
  const truncate = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + "..." : text;
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return {
    capitalize,
    uppercase,
    lowercase,
    truncate,
  };
}
