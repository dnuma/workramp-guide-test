import { LoginPage } from "@pages/login.page";
import { test, expect } from "@playwright/test";
import { USER_INFO } from "@fixtures/config";
import { GUIDE_CONTENT, TABS, URL_TEST } from "@fixtures/constants";
import { BasePage } from "@pages/base.page";
import { GuidePage } from "@pages/guide.page";

// Slow down the test for better visualization
test.use({ launchOptions: { slowMo: 300 } });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Login
  await page.goto("/");
  await loginPage.fillLoginForm(USER_INFO.EMAIL, USER_INFO.PASSWORD);

  await expect(loginPage.logo).toBeVisible();
});

test.describe("WorkRamp Staging website", () => {
  test("Navigation test", async ({ page, context }) => {
    const basePage = new BasePage(page);

    await test.step("Reporting", async () => {
      await basePage.clickLink(TABS.REPORTING);
      await expect.soft(page).toHaveURL(URL_TEST.REPORTING);
    });

    await test.step("My team test", async () => {
      await basePage.clickLink(TABS.MY_TEAM);
      await expect.soft(page).toHaveURL(URL_TEST.MY_TEAM);
    });

    await test.step("Academies test", async () => {
      await basePage.clickLink(TABS.ACADEMIES);
      await expect.soft(page).toHaveURL(URL_TEST.ACADEMIES);
    });

    await test.step("Marketplace test", async () => {
      const pagePromise = context.waitForEvent("page");

      // Clicking in Marketplace tab opens a new page.
      await basePage.clickLink(TABS.MARKETPLACE);
      const marketplacePage = await pagePromise;
      await marketplacePage.waitForLoadState();
      await expect.soft(marketplacePage).toHaveURL(URL_TEST.MARKETPLACE);

      // Close the Marketplace page to return to staging
      await marketplacePage.close();
    });

    await test.step("Settings test", async () => {
      await basePage.clickLink(TABS.SETTINGS);
      await expect.soft(page).toHaveURL(URL_TEST.SETTINGS);
    });
  });

  test("Create new guide", async ({ page }) => {
    const guidePage = new GuidePage(page);
    const createNewTxt = "Create New";
    const guideTxt = "Guide";
    const publishBtnTxt = "Publish";
    const timestamp = +new Date();
    const newGuideName = USER_INFO.NAME + `${timestamp}`;

    // Create new guide and assert that the button to publish is visible
    await test.step("Create a new guide", async () => {
      await guidePage.clickButton(createNewTxt);
      await guidePage.clickLink(guideTxt);
      await guidePage.nameThisForm(newGuideName);

      await expect(guidePage.getButtonLocator(publishBtnTxt)).toBeVisible();
    });

    // Rename task and asssert that it was renamed
    await test.step("Rename Task", async () => {
      const newTaskName = USER_INFO.NAME + " TASK NAME";
      await guidePage.renameTask(newTaskName);
      expect.soft(await guidePage.isTaskRenamed(newTaskName)).toBeTruthy();
    });

    // Add info in the content and assert that it was published
    await test.step("Add info and publish", async () => {
      const assignGuideTxt = "Assign this Guide";
      await guidePage.enterGuideContent(GUIDE_CONTENT);
      await guidePage.clickButton(publishBtnTxt);
      await guidePage.clickConfirmPublish();

      await expect
        .soft(guidePage.getButtonLocator(assignGuideTxt))
        .toBeVisible();
    });

    // Delete guide and assert that is NOT visible
    await test.step("Delete guide", async () => {
      await guidePage.deleteGuide(newGuideName);
      await expect(guidePage.getTextLocator(newGuideName)).not.toBeVisible();
    });
  });
});
