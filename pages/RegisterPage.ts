import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  readonly registerBtn: Locator;
  readonly registerLink: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly ssnError: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;

  readonly registrationSuccessMessage: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.registerLink = page.getByRole("link", { name: "Register" });

    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');

    this.registerBtn = page.locator('input[value="Register"]');

    this.firstNameError = page.locator('[id="customer.firstName.errors"]');
    this.lastNameError = page.locator('[id="customer.lastName.errors"]');
    this.addressError = page.locator('[id="customer.address.street.errors"]');
    this.cityError = page.locator('[id="customer.address.city.errors"]');
    this.stateError = page.locator('[id="customer.address.state.errors"]');
    this.zipCodeError = page.locator('[id="customer.address.zipCode.errors"]');
    this.ssnError = page.locator('[id="customer.ssn.errors"]');
    this.usernameError = page.locator('[id="customer.username.errors"]');
    this.passwordError = page.locator('[id="customer.password.errors"]');
    this.confirmPasswordError = page.locator('[id="repeatedPassword.errors"]');

    this.registrationSuccessMessage = page.getByText(
      "Your account was created successfully",
    );

    this.welcomeMessage = page.locator("h1.title");
  }

  async goToRegisterPage() {
    await this.page.goto("/");
    await this.registerLink.click();
  }

  async register(user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.confirmPassword);

    await this.registerBtn.click();
  }

  async clickRegisterButton() {
    await this.registerBtn.click();
  }

  async expectRegisterPageVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.registerBtn).toBeVisible();
  }

  async expectRegistrationSuccessful(username: string) {
    await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
    await expect(this.registrationSuccessMessage).toBeVisible();
  }

  async expectRequiredFieldErrorsVisible() {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.addressError).toBeVisible();
    await expect(this.cityError).toBeVisible();
    await expect(this.stateError).toBeVisible();
    await expect(this.zipCodeError).toBeVisible();
    await expect(this.ssnError).toBeVisible();
    await expect(this.usernameError).toBeVisible();
    await expect(this.passwordError).toBeVisible();
    await expect(this.confirmPasswordError).toBeVisible();
  }

  async printVisibleErrors() {
    const errors = await this.page.locator(".error").allTextContents();
  }

  async expectPasswordMismatchErrorVisible() {
    await expect(this.confirmPasswordError).toBeVisible();
  }

  async expectUsernameErrorVisible() {
    await expect(this.usernameError).toBeVisible();
  }

  async expectRegistrationNotSuccessful() {
    await expect(this.registrationSuccessMessage).not.toBeVisible();
  }
}
