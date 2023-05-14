import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly listbox: Locator;

  readonly workRampTxt = "WorkRamp";
  readonly okTxt = "OK";

  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.getByRole("link", { name: this.workRampTxt });
    this.listbox = this.page.getByRole("listbox").getByRole("button");
  }

  /**
   * Clicks on a link with the specified text.
   * @param {string} linkText - The text of the link to click.
   */
  async clickLink(linkText: string) {
    const link = this.page.locator(`a`, { hasText: linkText });
    await link.click();
  }

  /**
   * Clicks on a button with the specified text.
   * @param {string} buttonText - The text of the button to click.
   */
  async clickButton(buttonText: string) {
    const button = this.getButtonLocator(buttonText);
    await button.click();
  }

  /**
   * Returns the locator for a button with the specified text.
   * @param {string} buttonText - The text of the button.
   * @returns {Locator} - The locator for the button.
   */
  getButtonLocator(buttonText: string) {
    return this.page.getByRole("button", { name: buttonText }).first();
  }

  /**
   * Deletes a guide with the specified name.
   * @param {string} guideName - The name of the guide to delete.
   */
  async deleteGuide(guideName: string) {
    const delButton = this.page
      .locator(`[data-type="guide"]`, { hasText: guideName })
      .locator(`.asset-picker-edit-option`)
      .first();
    await this.getTextLocator(guideName).hover();
    await delButton.click();
    await this.clickButton(this.okTxt);
  }

  /**
   * Returns the locator for an element with the specified text.
   * @param {string} text - The text to search for.
   * @returns {Locator} - The locator for the element.
   */
  getTextLocator(text: string) {
    return this.page.getByText(text).first();
  }
}
