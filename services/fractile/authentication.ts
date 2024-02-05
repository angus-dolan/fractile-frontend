import { FetchOptions } from "ofetch";

import FetchFactory from "../apiFetch";

type IAuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

class AuthModule extends FetchFactory<IAuthResponse> {
  protected defaultContentType = "application/x-www-form-urlencoded";
  private RESOURCE = "/auth";

  async login(username: string, password: string) {
    return useAsyncData(() => {
      return this.call("POST", `${this.RESOURCE}/login`, {
        data: new URLSearchParams({ username, password }),
      });
    });
  }

  async refresh() {
    return useAsyncData(() => {
      const refreshToken = localStorage.getItem("fractile.refresh_token");

      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };

      return this.call("POST", `${this.RESOURCE}/refresh`, {
        fetchOptions,
      });
    });
  }
}

export default AuthModule;
