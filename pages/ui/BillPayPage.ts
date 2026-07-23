import { Page, Locator, expect } from "@playwright/test";

export class BillPayPage {
  readonly page: Page;

  readonly billPayPageLink: Locator;
  readonly billPayTitle: Locator;

  readonly payeeNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly accountInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;

  readonly sendPaymentBtn: Locator;

  readonly payeeNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly phoneError: Locator;
  readonly accountError: Locator;
  readonly verifyAccountError: Locator;
  readonly amountError: Locator;

  readonly billPayCompleteTitle: Locator;
  readonly billPayMessage: Locator;
  readonly rightPanel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.billPayPageLink = page.getByRole("link", {
      name: "Bill Pay",
    });

    this.billPayTitle = page.getByRole("heading", {
      name: "Bill Payment Service",
    });

    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountDropdown = page.locator('select[name="fromAccountId"]');

    this.sendPaymentBtn = page.locator('input[value="Send Payment"]');

    this.payeeNameError = page.locator('[id="validationModel-name"]');
    this.addressError = page.locator('[id="validationModel-address"]');
    this.cityError = page.locator('[id="validationModel-city"]');
    this.stateError = page.locator('[id="validationModel-state"]');
    this.zipCodeError = page.locator('[id="validationModel-zipCode"]');
    this.phoneError = page.locator('[id="validationModel-phoneNumber"]');
    this.accountError = page.locator('[id="validationModel-account-empty"]');
    this.verifyAccountError = page.locator(
      '[id="validationModel-verifyAccount-empty"]',
    );
    this.amountError = page.locator('[id="validationModel-amount-empty"]');

    this.billPayCompleteTitle = page.getByRole("heading", {
      name: "Bill Payment Complete",
    });

    this.billPayMessage = page.locator("#billpayResult");
    this.rightPanel = page.locator("#rightPanel");
  }

  async goToBillPayPage() {
    await this.billPayPageLink.click();
  }

  async expectBillPayPageVisible() {
    await expect(this.billPayTitle).toBeVisible();
    await expect(this.payeeNameInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.stateInput).toBeVisible();
    await expect(this.zipCodeInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.accountInput).toBeVisible();
    await expect(this.verifyAccountInput).toBeVisible();
    await expect(this.amountInput).toBeVisible();
    await expect(this.fromAccountDropdown).toBeVisible();
    await expect(this.sendPaymentBtn).toBeVisible();
  }

  async payBill(data: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
    verifyAccountNumber: string;
    amount: string;
    fromAccountIndex: number;
  }) {
    await this.payeeNameInput.fill(data.payeeName);
    await this.addressInput.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipCodeInput.fill(data.zipCode);
    await this.phoneInput.fill(data.phone);
    await this.accountInput.fill(data.accountNumber);
    await this.verifyAccountInput.fill(data.verifyAccountNumber);
    await this.amountInput.fill(data.amount);

    await this.fromAccountDropdown.selectOption({
      index: data.fromAccountIndex,
    });

    await this.sendPaymentBtn.click();
  }

  async clickSendPaymentButton() {
    await this.sendPaymentBtn.click();
  }

  async expectBillPayCompletedSuccessfully() {
    await expect(this.billPayCompleteTitle).toBeVisible();
    await expect(this.billPayMessage).toContainText("Bill Payment to");
    await expect(this.billPayMessage).toContainText("was successful");
  }

  async expectRequiredFieldErrorsVisible() {
    await expect(this.payeeNameError).toBeVisible();
    await expect(this.addressError).toBeVisible();
    await expect(this.cityError).toBeVisible();
    await expect(this.stateError).toBeVisible();
    await expect(this.zipCodeError).toBeVisible();
    await expect(this.phoneError).toBeVisible();
    await expect(this.accountError).toBeVisible();
    await expect(this.verifyAccountError).toBeVisible();
    await expect(this.amountError).toBeVisible();
  }

  async expectAccountMismatchErrorVisible() {
    await expect(this.rightPanel).toContainText(
      "The account numbers do not match",
    );
  }

  async expectBillPayHandledSafely() {
    await expect(this.billPayCompleteTitle).not.toBeVisible();
  }
}