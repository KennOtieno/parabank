import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { existingUser } from "../../test-data/loginData";

test.describe("Authentication - Logout Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(existingUser.username, existingUser.password);
    await loginPage.expectDashboardVisible();
  });

  test("TC_AUTH_LOGOUT_001 - User should logout successfully", async () => {
    await test.step("Click logout link", async () => {
      await loginPage.logout();
    });

    await test.step("Verify login page is displayed", async () => {
      await loginPage.expectLoginPageVisible();
    });
  });

  //   test("TC_AUTH_SESSION_001 - User should not access dashboard after logout using browser back button", async ({
  //     page,
  //   }) => {
  //     await test.step("Logout from application", async () => {
  //       await loginPage.logout();
  //     });

  //     await test.step("Click browser back button", async () => {
  //       await page.goBack();
  //     });

  //     await test.step("Verify dashboard is not accessible", async () => {
  //       await loginPage.expectLoginFailedSafely();
  //     });
  //   });
});
