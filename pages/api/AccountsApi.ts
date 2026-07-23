import { APIRequestContext } from "@playwright/test";

export class AccountsApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getCustomerAccounts(customerId: number) {
    return await this.request.get(
      `/parabank/services/bank/customers/${customerId}/accounts`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
  }
   async getAccount(accountId: number) {
    return await this.request.get(
      `/parabank/services/bank/accounts/${accountId}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
  }
}