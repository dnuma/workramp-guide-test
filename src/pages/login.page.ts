import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly logInTxt = "Log In";

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emailInput = this.page.locator(`input[name="email"]`);
    this.passwordInput = this.page.locator(`input[name="password"]`);
    this.loginBtn = this.page.locator("button", { hasText: this.logInTxt });
  }

  /**
   * Fills the login form with the provided email and password (if available).
   * @param {string|undefined} email - The email to be entered in the login form.
   * @param {string|undefined} password - The password to be entered in the login form.
   */
  async fillLoginForm(email: string | undefined, password: string | undefined) {
    if (email != undefined) {
      await this.emailInput.type(email);
      if (password != undefined) {
        await this.passwordInput.type(password);
        await this.loginBtn.click();
      }
    }
  }
}
