import { APIRequestContext } from "@playwright/test";

export class AuthApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(username: string, password: string) {
    return await this.request.get(
      `/parabank/services/bank/login/${username}/${password}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
  }
}