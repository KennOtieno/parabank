import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { TransferFundsPage } from "../../pages/TransferFundsPage";
import { existingUser } from "../../test-data/loginData";
import { transferFundsTestCases } from "../../test-data/transferFundsData";

test.describe("Transfer Funds Tests", () => {
  let loginPage: LoginPage;
  let transferFundsPage: TransferFundsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    transferFundsPage = new TransferFundsPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(existingUser.username, existingUser.password);
    await loginPage.expectDashboardVisible();

    await transferFundsPage.goToTransferFundsPage();
    await transferFundsPage.expectTransferPageVisible();
  });

  for (const transferCase of transferFundsTestCases) {
    test(`Scenario - ${transferCase.scenario}`, async () => {
      await test.step("Submit transfer funds form", async () => {
        await transferFundsPage.transferFunds(
          transferCase.data.amount,
          transferCase.data.fromAccountIndex,
          transferCase.data.toAccountIndex,
        );
      });

      await test.step(`Verify result - ${transferCase.expectedResult}`, async () => {
        if (transferCase.type === "success") {
          await transferFundsPage.expectTransferCompletedSuccessfully();
        } else if (transferCase.type === "validation") {
          await transferFundsPage.expectEmptyAmountErrorVisible();
        } else if (transferCase.type === "invalidData") {
          await transferFundsPage.expectTransferHandledSafely();
        }
      });
    });
  }
});
