import { test } from "@playwright/test";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";
import { forgotPasswordTestCases } from "../../test-data/forgotPasswordData";

test.describe("Authentication - Forgot Login Info Tests", () => {
  let forgetPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgetPasswordPage = new ForgotPasswordPage(page);
    await forgetPasswordPage.goToLoginPage();
    await forgetPasswordPage.goToForgotPasswordPage();
  });

  for (const forgotPasswordCase of forgotPasswordTestCases) {
    test(`Scenario - ${forgotPasswordCase.scenario}`, async () => {
      await test.step("Submit forgot password form", async () => {
        await forgetPasswordPage.findLoginInfo(forgotPasswordCase.data);
      });

      await test.step(`Verify result - ${forgotPasswordCase.expectedResult}`, async () => {
        if (forgotPasswordCase.type === "success") {
          await forgetPasswordPage.expectForgotPasswordSuccessful();
        } else if (forgotPasswordCase.type === "validation") {
          await forgetPasswordPage.expectRequiredFieldErrorsVisible();
        } else if (forgotPasswordCase.type === "partialValidation") {
          await forgetPasswordPage.expectPartialRequiredFieldErrorsVisible();
        } else if (forgotPasswordCase.type === "notFound") {
          await forgetPasswordPage.expectCustomerNotFoundMessageVisible();
        } else if (
          forgotPasswordCase.type === "invalidData" ||
          forgotPasswordCase.type === "security"
        ) {
          await forgetPasswordPage.expectForgotPasswordHandledSafely();
        }
      });
    });
  }
});
