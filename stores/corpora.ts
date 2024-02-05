import { defineStore } from "pinia";
import { Corpus } from "~/types/corpora";

export const useCorporaStore = defineStore("corpora", () => {
  const { $fractile } = useNuxtApp();
  const items = ref<Corpus[]>([]);

  function all(): Corpus[] {
    return items.value;
  }

  function get(id: number | undefined): Corpus | undefined {
    if (!id) return;

    return items.value.find((item) => item.id === id);
  }

  function create(payload: Corpus) {
    items.value.push(payload);
  }

  async function fetchAll() {
    const { data, error } = await $fractile.corpus.list();

    if (!error.value && data.value) {
      const corpora = parseCreatedAtDates(data.value) as Corpus[];

      removeAll();
      items.value = corpora;
    } else {
      throw new Error(`There was a problem fetching corpora`);
    }
  }

  async function fetchOne(id: number) {} // TODO: Not implimented in backend yet

  function updateAll(payload: Corpus[]) {
    items.value = payload;
  }

  function update(id: number, payload: Corpus) {
    const index = findIndex(id);
    if (index !== -1) {
      items.value[index] = payload;
    } else {
      throw new Error(`Can't update corpora with id ${id}, not found.`);
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
      throw new Error(`Can't remove corpora with id ${id}, not found.`);
    }
  }

  const findIndex = (id: number) => items.value.findIndex((item) => item.id === id);

  const parseCreatedAtDates = (data: any) => {
    return data.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at),
    }));
  };

  onBeforeMount(() => {
    fetchAll();
  });

  return {
    items,
    all,
    get,
    create,
    fetchAll,
    fetchOne,
    updateAll,
    update,
    removeAll,
    remove,
  };
});
