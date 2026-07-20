import { APIRequestContext } from "@playwright/test";

export class BillPayApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async payBill(
    accountId: number,
    amount: number,
    payee: {
      name: string;

      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
      };

      phoneNumber: string;
      accountNumber: number;
    },
  ) {
    return await this.request.post(
      "/parabank/services/bank/billpay",
      {
        params: {
          accountId,
          amount,
        },

        data: payee,

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
  }
}