import { Browser, BrowserContext, Page, test as base } from '@playwright/test';
import pageFactory from '../pages/pageFactory';

type PlaywrightParams = {
  page: Page;
  context?: BrowserContext;
  browser?: Browser;
};

type CustomTest = {
  page: Page;
  pageObjects: ReturnType<typeof pageFactory>;
};

const customTest = base.extend<CustomTest>({
  pageObjects: async ({ page }, use: any) => {
    //page.setDefaultTimeout(TEST_TIMEOUT);
    await use(pageFactory(page));
  },
});

export default customTest;
