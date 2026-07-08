import { test } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { registerTestCases } from "../../test-data/registerData";

test.describe("Authentication - Registration Tests", () => {
  test.describe.configure({ mode: "serial" });

  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goToRegisterPage();
  });

  for (const registerCase of registerTestCases) {
    test(`Scenario - ${registerCase.scenario}`, async () => {
      const user = registerCase.userFactory();

      await test.step("Fill and submit registration form", async () => {
        if (registerCase.type === "required") {
          await registerPage.clickRegisterButton();
        } else {
          await registerPage.register(user);
        }
      });

      await test.step(`Verify result - ${registerCase.expectedResult}`, async () => {
        if (registerCase.type === "success") {
          await registerPage.printVisibleErrors();
          await registerPage.expectRegistrationSuccessful(user.username);
        } else if (registerCase.type === "required") {
          await registerPage.expectRequiredFieldErrorsVisible();
        } else if (registerCase.type === "passwordMismatch") {
          await registerPage.expectPasswordMismatchErrorVisible();
        } else if (registerCase.type === "duplicateUsername") {
          await registerPage.expectUsernameErrorVisible();
        } else if (registerCase.type === "invalidData") {
          await registerPage.expectRegistrationNotSuccessful();
        }
      });
    });
  }
});
