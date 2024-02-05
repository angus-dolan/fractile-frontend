export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      hide: "hide",
      show: "show",
      all: "all",
      chat: "chat",
      newChat: "new chat",
      enterYourQuery: "enter your query",
      corpus: "corpus",
      corpura: "datastore",
      lastUsed: "last used",
      created: "created",
      recentlyUsed: "recently used",
      files: "files", // mikrostyk
    },
    pl: {
      hide: "ukryj",
      show: "pokaż",
      all: "wszystkie",
      chat: "test",
      newChat: "nowy chat",
      enterYourQuery: "dodaj swoje zapytanie",
      corpus: "corpus",
      corpura: "datastore",
      lastUsed: "ostatnie odpytanie",
      created: "utworzony",
      recentlyUsed: "ostatnio używane",
      fileCount: "przebieg", // mikrostyk
    },
  },
}));
