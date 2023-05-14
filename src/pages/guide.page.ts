import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class GuidePage extends BasePage {
  readonly page: Page;
  readonly enterGuideName: Locator;
  readonly renameTaskBtn: Locator;
  readonly enterTaskName: Locator;
  readonly taskBody: Locator;
  readonly guideBody: Locator;

  readonly saveTxt: string = "Save";

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.enterGuideName = this.page.locator(
      `input[placeholder="Enter a name"]`
    );
    this.renameTaskBtn = this.page
      .locator(`div:right-of(:text('Untitled Task'))`)
      .first();
    this.enterTaskName = this.page.locator(
      `input[placeholder="Enter a title"]`
    );
    this.taskBody = this.page.locator(".task-assignment-body");
    this.guideBody = this.page.locator(
      `div[placeholder="Add text, create lists, paste links, or upload images..."]`
    );
  }

  /**
   * Names the form with the provided guide name, or a default name if not available, and saves it.
   * @param {string|undefined} guideName - The name to be given to the form.
   */
  async nameThisForm(guideName: string | undefined) {
    const defaultName = "No NAME value in your ENV file";

    if (guideName != undefined) await this.enterGuideName.fill(guideName);
    else await this.enterGuideName.fill(defaultName);

    await this.clickLink(this.saveTxt);
  }

  /**
   * Renames the task with the provided new name and saves it.
   * @param {string} newName - The new name for the task.
   */
  async renameTask(newName: string = "A not so cool hardcoded task name") {
    await this.renameTaskBtn.click();
    await this.enterTaskName.fill(newName);
    await this.clickLink(this.saveTxt);
  }

  /**
   * Checks if the task with the specified name is renamed.
   * @param {string} taskName - The name of the task to check.
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if the task is renamed and visible, false otherwise.
   */
  async isTaskRenamed(taskName: string) {
    return await this.taskBody
      .locator(`:has-text('${taskName}')`)
      .first()
      .isVisible();
  }

  /**
   * Enters the guide content into the guide body.
   * @param {string} guideContent - The content to be entered into the guide body.
   */
  async enterGuideContent(guideContent: string) {
    await this.guideBody.clear();
    await this.guideBody.fill(guideContent);
  }

  /**
   * Clicks the 'Publish' button to confirm the publish action.
   */
  async clickConfirmPublish() {
    const button = this.page.locator(
      `div[role="dialog"] button:has-text('Publish')`
    );
    await button.click();
  }
}
