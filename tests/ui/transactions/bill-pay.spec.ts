import { test } from "@playwright/test";
import { LoginPage } from "../../../pages/ui/LoginPage";
import { BillPayPage } from "../../../pages/ui/BillPayPage";
import { existingUser } from "../../../test-data/ui/loginData";
import { billPayTestCases } from "../../../test-data/ui/billPayData";

test.describe("Bill Payment Tests", () => {
  let loginPage: LoginPage;
  let billPayPage: BillPayPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    billPayPage = new BillPayPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(existingUser.username, existingUser.password);
    await loginPage.expectDashboardVisible();

    await billPayPage.goToBillPayPage();
    await billPayPage.expectBillPayPageVisible();
  });

  for (const billPayCase of billPayTestCases) {
    test(`Scenario - ${billPayCase.scenario}`, async () => {
      
      await test.step("Submit bill payment form", async () => {
        await billPayPage.payBill(billPayCase.data);
      });

      await test.step(`Verify result - ${billPayCase.expectedResult}`, async () => {
        if (billPayCase.type === "success") {
          await billPayPage.expectBillPayCompletedSuccessfully();
        } else if (billPayCase.type === "validation") {
          await billPayPage.expectRequiredFieldErrorsVisible();
        } else if (billPayCase.type === "accountMismatch") {
          await billPayPage.expectAccountMismatchErrorVisible();
        } else if (
          billPayCase.type === "invalidData" ||
          billPayCase.type === "security"
        ) {
          await billPayPage.expectBillPayHandledSafely();
        }
      });
    });
  }
});
