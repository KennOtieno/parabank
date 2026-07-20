import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly accountsOverviewTitle: Locator;
  readonly logoutLink: Locator;
  readonly loginPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('input[value="Log In"]');
    this.errorMsg = page.locator(".error");

    this.accountsOverviewTitle = page.getByRole("heading", {
      name: "Accounts Overview",
    });

    this.logoutLink = page.getByRole("link", { name: "Log Out" });
    this.loginPanel = page.locator("#loginPanel");
  }

  async goToLoginPage() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async expectLoginPageVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
  }

  async expectDashboardVisible() {
    await expect(this.accountsOverviewTitle).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMsg).toBeVisible();
  }

  async expectLoginFailedSafely() {
    await expect(this.logoutLink).not.toBeVisible();
    await expect(this.accountsOverviewTitle).not.toBeVisible();

    const currentUrl = this.page.url();
    expect(currentUrl).not.toContain("overview.htm");
  }

  async expectRequiredValidationMessages() {
    await expect(this.errorMsg).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
