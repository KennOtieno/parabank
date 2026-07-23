import { test } from "@playwright/test";
import { LoginPage } from "../../../pages/ui/LoginPage";
import { loginTestCases } from "../../../test-data/ui/loginData";

test.describe("Authentication - Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
  });

  for (const loginCase of loginTestCases) {
    test(`Scenario - ${loginCase.scenario}`, async () => {
      await test.step("Submit login form", async () => {
        await loginPage.login(loginCase.username, loginCase.password);
      });

      await test.step(`Verify result - ${loginCase.expectedResult}`, async () => {
        if (loginCase.type === "success") {
          await loginPage.expectDashboardVisible();
        } else if (loginCase.type === "invalidCredentials") {
          await loginPage.expectErrorMessageVisible();
        } else if (loginCase.type === "security") {
          await loginPage.expectLoginFailedSafely();
        }
      });
    });
  }
});