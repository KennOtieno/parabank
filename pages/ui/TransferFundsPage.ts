import { Page, Locator, expect } from "@playwright/test";

export class TransferFundsPage {
  readonly page: Page;

  readonly transferPageLink: Locator;
  readonly transferFundTitle: Locator;

  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferBtn: Locator;

  readonly emptyAmountError: Locator;
  readonly invalidAmountError: Locator;

  readonly transferCompleteTitle: Locator;
  readonly transferMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.transferPageLink = page.getByRole("link", {
      name: "Transfer Funds",
    });

    this.transferFundTitle = page.getByRole("heading", {
      name: "Transfer Funds",
    });

    this.amountInput = page.locator("#amount");
    this.fromAccountDropdown = page.locator("#fromAccountId");
    this.toAccountDropdown = page.locator("#toAccountId");

    this.transferBtn = page.locator('input[value="Transfer"]');

    this.emptyAmountError = page.getByText("The amount cannot be empty.");
    this.invalidAmountError = page.getByText("Please enter a valid amount.");

    this.transferCompleteTitle = page.getByRole("heading", {
      name: "Transfer Complete!",
    });

    this.transferMessage = page.locator("#rightPanel");
  }

  async goToTransferFundsPage() {
    await this.transferPageLink.click();
  }

  async expectTransferPageVisible() {
    await expect(this.transferFundTitle).toBeVisible();
    await expect(this.amountInput).toBeVisible();
    await expect(this.fromAccountDropdown).toBeVisible();
    await expect(this.toAccountDropdown).toBeVisible();
    await expect(this.transferBtn).toBeVisible();
  }

  async transferFunds(
    amount: string,
    fromAccountIndex = 0,
    toAccountIndex = 0,
  ) {
    await this.amountInput.fill(amount);
    await this.fromAccountDropdown.selectOption({ index: fromAccountIndex });
    await this.toAccountDropdown.selectOption({ index: toAccountIndex });

    await this.transferBtn.click();
  }

  async expectTransferCompletedSuccessfully() {
    await expect(this.transferCompleteTitle).toBeVisible();
    await expect(this.transferMessage).toContainText(
      "has been transferred from account",
    );
  }


  async expectInvalidAmountErrorVisible() {
    await expect(this.invalidAmountError).toBeVisible();
  }

  async expectEmptyAmountErrorVisible() {
  await expect(this.page.locator("#rightPanel")).toContainText(
    "The amount cannot be empty",
  );
}

  async expectTransferHandledSafely() {
    await expect(this.transferCompleteTitle).not.toBeVisible();
  }
}
