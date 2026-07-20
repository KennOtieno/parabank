import { test, expect } from "@playwright/test";

import { AuthApi } from "../../pages/api/AuthApi";
import { AccountsApi } from "../../pages/api/AccountsApi";
import { BillPayApi } from "../../pages/api/BillPayApi";

import { billPayApiData } from "../../test-data/api/billPayApiData";
import { existingUser } from "../../test-data/ui/loginData";

test.describe("Bill Payment API Tests", () => {
  test("TC_API_BILL_PAY_001 - Pay bill successfully", async ({ request }) => {
    const authApi = new AuthApi(request);
    const accountsApi = new AccountsApi(request);
    const billPayApi = new BillPayApi(request);

    let customerId: number;
    let accountId: number;

    const amount = 100;

    let balanceBefore: number;
    let balanceAfter: number;

    await test.step("Login user through API", async () => {
      const loginResponse = await authApi.login(
        existingUser.username,
        existingUser.password,
      );

      console.log("LOGIN STATUS:", loginResponse.status());

      expect(loginResponse.status()).toBe(200);

      const customer = await loginResponse.json();

      expect(customer.id).toBeDefined();

      customerId = customer.id;

      console.log("CUSTOMER ID:", customerId);
    });

    await test.step("Get customer accounts", async () => {
      const accountsResponse =
        await accountsApi.getCustomerAccounts(customerId);

      console.log("ACCOUNTS STATUS:", accountsResponse.status());

      expect(accountsResponse.status()).toBe(200);

      const accounts = await accountsResponse.json();

      expect(Array.isArray(accounts)).toBeTruthy();
      expect(accounts.length).toBeGreaterThan(0);

      accountId = accounts[0].id;

      console.log("ACCOUNT ID USED:", accountId);

      expect(accountId).toBeDefined();
    });

    await test.step("Get account balance before payment", async () => {
      const accountResponse = await accountsApi.getAccount(accountId);

      expect(accountResponse.status()).toBe(200);

      const account = await accountResponse.json();

      balanceBefore = account.balance;

      expect(typeof balanceBefore).toBe("number");

      console.log("BALANCE BEFORE PAYMENT:", balanceBefore);
    });

    await test.step("Submit bill payment", async () => {
      const response = await billPayApi.payBill(
        accountId,
        amount,
        billPayApiData.validPayee,
      );

      console.log("BILL PAY STATUS:", response.status());

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();

      const responseBody = await response.json();

      console.log("BILL PAY RESPONSE:", responseBody);

      expect(responseBody.payeeName).toBe(
        billPayApiData.validPayee.name,
      );

      expect(responseBody.amount).toBe(amount);

      expect(responseBody.accountId).toBe(accountId);
    });

    await test.step("Verify account balance was debited", async () => {
      const accountResponse = await accountsApi.getAccount(accountId);

      expect(accountResponse.status()).toBe(200);

      const account = await accountResponse.json();

      balanceAfter = account.balance;

      expect(typeof balanceAfter).toBe("number");

      console.log("BALANCE AFTER PAYMENT:", balanceAfter);

      expect(balanceAfter).toBeCloseTo(
        balanceBefore - amount,
        2,
      );
    });
  });
});