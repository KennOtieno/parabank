import { Page, Locator, expect } from "@playwright/test";

export class ForgotPasswordPage {
  readonly page: Page;

  readonly forgotLoginInfoLink: Locator;

  readonly forgotPasswordTitle: Locator;
  readonly forgotPasswordDesc: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly ssnInput: Locator;

  readonly findMyLoginInfoBtn: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly ssnError: Locator;

  readonly rightPanel: Locator;
  readonly customerLookupTitle: Locator;
  readonly forgotPasswordSuccessfulMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.forgotLoginInfoLink = page.getByRole("link", {
      name: "Forgot login info?",
    });

    this.forgotPasswordTitle = page.getByRole("heading", {
      name: "Customer Lookup",
    });

    this.forgotPasswordDesc = page.getByText(
      "Please fill out the following information in order to validate your account.",
    );

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.addressInput = page.locator('input[name="address.street"]');
    this.cityInput = page.locator('input[name="address.city"]');
    this.stateInput = page.locator('input[name="address.state"]');
    this.zipCodeInput = page.locator('input[name="address.zipCode"]');
    this.ssnInput = page.locator('input[name="ssn"]');

    this.findMyLoginInfoBtn = page.locator('input[value="Find My Login Info"]');

    this.firstNameError = page.locator('[id="firstName.errors"]');
    this.lastNameError = page.locator('[id="lastName.errors"]');
    this.addressError = page.locator('[id="address.street.errors"]');
    this.cityError = page.locator('[id="address.city.errors"]');
    this.stateError = page.locator('[id="address.state.errors"]');
    this.zipCodeError = page.locator('[id="address.zipCode.errors"]');
    this.ssnError = page.locator('[id="ssn.errors"]');

    this.rightPanel = page.locator("#rightPanel");

    this.customerLookupTitle = page.getByRole("heading", {
      name: "Customer Lookup",
    });

    this.forgotPasswordSuccessfulMessage = page.getByText(
      "Your login information was located successfully.",
    );
  }

  async goToLoginPage() {
    await this.page.goto("/");
  }

  async goToForgotPasswordPage() {
    await this.forgotLoginInfoLink.click();
  }

  async expectForgotPasswordPageVisible() {
    await expect(this.forgotPasswordTitle).toBeVisible();
    await expect(this.forgotPasswordDesc).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.stateInput).toBeVisible();
    await expect(this.zipCodeInput).toBeVisible();
    await expect(this.ssnInput).toBeVisible();
    await expect(this.findMyLoginInfoBtn).toBeVisible();
  }

  async findLoginInfo(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    ssn: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.ssnInput.fill(data.ssn);

    await this.findMyLoginInfoBtn.click();
  }

  async clickFindMyLoginInfoButton() {
    await this.findMyLoginInfoBtn.click();
  }

  async expectForgotPasswordSuccessful() {
    await expect(this.rightPanel).toContainText(
      "Your login information was located successfully. You are now logged in.",
    );
    await expect(this.rightPanel).toContainText("Username:");
    await expect(this.rightPanel).toContainText("Password:");
  }
  async expectPartialRequiredFieldErrorsVisible() {
    await expect(this.lastNameError).toBeVisible();
    await expect(this.cityError).toBeVisible();
    await expect(this.zipCodeError).toBeVisible();
  }
  
  async expectRequiredFieldErrorsVisible() {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.addressError).toBeVisible();
    await expect(this.cityError).toBeVisible();
    await expect(this.stateError).toBeVisible();
    await expect(this.zipCodeError).toBeVisible();
    await expect(this.ssnError).toBeVisible();
  }

  async expectCustomerNotFoundMessageVisible() {
    await expect(this.rightPanel).toContainText(
      "The customer information provided could not be found.",
    );
  }

  async expectForgotPasswordHandledSafely() {
    await expect(this.forgotPasswordSuccessfulMessage).not.toBeVisible();
  }
}
