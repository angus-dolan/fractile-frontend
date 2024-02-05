import FetchFactory from "../apiFetch";

class ChatModule extends FetchFactory<any> {
  private RESOURCE = "/chat";

  async query(body: any) {
    return useAsyncData(() => {
      return this.call("POST", `${this.RESOURCE}/query`, {
        data: body,
      });
    });
  }

  async conversations() {
    return useAsyncData(() => {
      return this.call("GET", `${this.RESOURCE}/conversations`, {});
    });
  }

  async conversation(id: number) {
    const conv_id = id.toString();
    const queryString = new URLSearchParams({ conv_id }).toString();
    return useAsyncData(() => {
      return this.call("GET", `${this.RESOURCE}/conversation?${queryString}`);
    });
  }
}

export default ChatModule;
