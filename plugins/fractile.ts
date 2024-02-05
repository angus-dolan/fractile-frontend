import { $fetch, FetchOptions } from "ofetch";

import AuthModule from "~/services/fractile/authentication";
import ChatModule from "~/services/fractile/chat";
import CorpusModule from "~/services/fractile/corpus";

interface IApiInstance {
  authentication: AuthModule;
  chat: ChatModule;
  corpus: CorpusModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: (config.public.apiBaseUrl as string) || undefined,
  };

  // Create a new instance of $fetcher with custom option
  const apiFetcher = $fetch.create(fetchOptions);

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    authentication: new AuthModule(apiFetcher),
    chat: new ChatModule(apiFetcher),
    corpus: new CorpusModule(apiFetcher),
  };

  return {
    provide: {
      fractile: modules,
    },
  };
});
