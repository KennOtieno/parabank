import { test } from "@playwright/test";
import { LoginPage } from "../../../pages/ui/LoginPage";
import { ProfilePage } from "../../../pages/ui/ProfilePage";
import { existingUser } from "../../../test-data/ui/loginData";
import { profileUpdateTestCases } from "../../../test-data/ui/profileData";

test.describe("Profile Update Tests", () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    // to login in
    await loginPage.goToLoginPage();
    await loginPage.login(existingUser.username, existingUser.password);
    await loginPage.expectDashboardVisible();
    // to go to profile page
    await profilePage.goToUpdateContactInfoPage();
    await profilePage.expectUpdateContactInfoPageVisible();
  });

  for (const profileCase of profileUpdateTestCases) {
    test(`Scenario - ${profileCase.scenario}`, async () => {
      await test.step("Update profile information", async () => {
        await profilePage.updateProfile(profileCase.data);
      });

      await test.step(`Verify result - ${profileCase.expectedResult}`, async () => {
        if (profileCase.type === "success") {
          await profilePage.expectProfileUpdatedSuccessfully();
        } else if (profileCase.type === "validation") {
          await profilePage.expectRequiredFieldErrorsVisible();
        } else if (profileCase.type === "invalidData") {
          await profilePage.expectProfileUpdateHandledSafely();
        }
      });
    });
  }
});
