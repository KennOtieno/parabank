import { Page, Locator, expect } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;

  readonly updateContactInfoLink: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;

  readonly updateProfileBtn: Locator;

  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;

  readonly profileUpdatedTitle: Locator;
  readonly profileUpdatedMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.updateContactInfoLink = page.getByRole("link", {
      name: "Update Contact Info",
    });

    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[name="customer.phoneNumber"]');

    this.updateProfileBtn = page.locator('input[value="Update Profile"]');

    this.firstNameError = page.locator('[id="customer.firstName.errors"]');
    this.lastNameError = page.locator('[id="customer.lastName.errors"]');
    this.addressError = page.locator('[id="customer.address.street.errors"]');
    this.cityError = page.locator('[id="customer.address.city.errors"]');
    this.stateError = page.locator('[id="customer.address.state.errors"]');
    this.zipCodeError = page.locator('[id="customer.address.zipCode.errors"]');

    this.profileUpdatedTitle = page.getByRole("heading", {
      name: "Profile Updated",
    });

    this.profileUpdatedMessage = page.getByText(
      "Your updated address and phone number have been added to the system.",
    );
  }

  async goToUpdateContactInfoPage() {
    await this.updateContactInfoLink.click();
  }

  async expectUpdateContactInfoPageVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.stateInput).toBeVisible();
    await expect(this.updateProfileBtn).toBeVisible();
  }

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.phoneInput.fill(data.phone);

    await this.updateProfileBtn.click();
  }

  async expectProfileUpdatedSuccessfully() {
    await expect(this.profileUpdatedTitle).toBeVisible();
    await expect(this.profileUpdatedMessage).toBeVisible();
  }

  async expectRequiredFieldErrorsVisible() {
  await expect(this.addressError).toBeVisible();
  await expect(this.cityError).toBeVisible();
  await expect(this.stateError).toBeVisible();
  await expect(this.zipCodeError).toBeVisible();
}

  async expectProfileUpdateHandledSafely() {
    await expect(this.profileUpdatedTitle).not.toBeVisible();
  }
}