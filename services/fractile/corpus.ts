import FetchFactory from "../apiFetch";

class CorpusModule extends FetchFactory<any> {
  private RESOURCE = "/corpus";

  async list() {
    return useAsyncData(() => {
      return this.call("GET", `${this.RESOURCE}/list`, {});
    });
  }
}

export default CorpusModule;
