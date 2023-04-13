import test from '../fixtures/customTest'
import urls from '../configs/urls';
import { testUser1, testArticleData } from '../configs/data'
import { expect } from '@playwright/test';

const { describe, step } = test;

test.beforeEach(async ({ pageObjects: { homePage, logInPage } }) => {
    await step('Go to homepage', async () => {
        await homePage.open(urls.baseUrl);
    });

    await step('Navigate to log in page', async () => {
        await homePage.clickSignInButton();
    });

    await step('Log in to the system', async () => {
        await logInPage.logIn(testUser1.username, testUser1.password);
    });
});
describe('Paginated lists of articles', () => {
    test('Verify that list posts on Global Feed are paginated correctly', async ({
        pageObjects: { homePage },
    }) => {
        await step('1. Click on the Global Feed tab', async () => {
            await homePage.clickGlobalFeedTab();
        });
        await step('2. Check Posts are paginated correctly: 10 posts on a page', async () => {
            const numberOfPosts = await homePage.isThePageDisplayTheNumberPosts();
            expect(numberOfPosts).toEqual(10);
        });
        await step('3. User click next page', async () => {
            await homePage.clickOnNextPagingButton();
        });
        await step('4. Check Posts are paginated correctly: display next 10 posts on next page', async () => {
            const numberOfPosts = await homePage.isThePageDisplayTheNumberPosts();
            expect(numberOfPosts).toEqual(10);
        });
    })
})