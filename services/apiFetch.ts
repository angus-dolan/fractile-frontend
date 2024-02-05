import { $Fetch, FetchOptions } from "ofetch";

class FetchFactory<T> {
  protected defaultContentType: string = "application/json";
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call(
    method: string,
    url: string,
    options: {
      data?: object;
      headers?: Record<string, string>;
      fetchOptions?: FetchOptions<"json">;
    } = {},
  ): Promise<T> {
    const defaultHeaders: Record<string, string> = {
      "Content-Type": this.defaultContentType,
      Accept: "application/json",
      ...options.headers,
    };

    const accessToken = localStorage.getItem("fractile.access_token");
    if (accessToken) {
      defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

    // Perform try catch here and log errors to pinia
    return this.$fetch<T>(url, {
      method,
      body: options.data,
      headers: defaultHeaders,
      ...options.fetchOptions,
    });
  }
}

export default FetchFactory;
