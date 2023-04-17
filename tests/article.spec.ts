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
describe('CRUD Article', () => {
    test('Create - Verify user can create new article @CURD', async ({
        pageObjects: { homePage, createArticlePage, articleDetailPage, profilePage }, page
    }) => {

        await step('1. Click new article button', async () => {
            await homePage.clickNewArticleButton()
        });

        await step('2. Create new article', async () => {
            await createArticlePage.createNewArticle(testArticleData.title, testArticleData.description, testArticleData.body, testArticleData.tag)
        });
        await step('3. Check My Post tab', async () => {
            await articleDetailPage.clickProfileNameOnBanner();
            const result = await profilePage.isTheArticleDisplayOnProfilePage(testArticleData.title);
            expect(result).toBeGreaterThan(0);
        });
        await step('4. Check Global tab', async () => {
            await homePage.open(urls.baseUrl);
            await homePage.clickGlobalFeedTab();
            const result = await homePage.isTheArticleDisplayOnGlobalFeedTabPage(testArticleData.title);
            expect(result).toBeGreaterThan(0);
        })
    });

    test('Edit - Verify user can edit the article @CURD', async ({
        pageObjects: { homePage, createArticlePage, articleDetailPage, profilePage },
    }) => {

        let genTitle: string;

        await step('1. Click new article button', async () => {
            await homePage.clickNewArticleButton()
        });

        await step('2. Generate New Title', async () => {
            genTitle = await createArticlePage.generateNewTitle(testArticleData.title);
        });

        await step('3. Create new article', async () => {
            await createArticlePage.createNewArticle(genTitle, testArticleData.description, testArticleData.body, testArticleData.tag)
        });

        await step('4. Click edit article button', async () => {
            await articleDetailPage.clickEditArticleButton()
        });

        await step('5. Edit the article', async () => {
            await createArticlePage.editNewArticle(testArticleData.titleUpdated, testArticleData.descriptionUpdated, testArticleData.bodyUpdated, testArticleData.tagUpdated)
        });

        await step('6. Verify the article updated the title and the content successfully', async () => {
            const isTitleVisible = await articleDetailPage.checkTheTitle(testArticleData.titleUpdated);
            expect(isTitleVisible).toEqual(true);
            const isContentVisible = await articleDetailPage.checkTheContent(testArticleData.bodyUpdated);
            expect(isContentVisible).toEqual(true);
        });

        await step('7. Click the profiel on the banner', async () => {
            await articleDetailPage.clickProfileNameOnBanner();
        });

        await step('8. Verify the article updated the description and the tag successfully', async () => {
            const isTitleVisible = await profilePage.checkTheDescription(testArticleData.descriptionUpdated);
            expect(isTitleVisible).toEqual(true);
            const isContentVisible = await profilePage.checkTheTags(testArticleData.tagUpdated);
            expect(isContentVisible).toEqual(true);
        });

    });


    test('Delete - Verify user can delete the new article @CURD', async ({
        pageObjects: { homePage, createArticlePage, articleDetailPage, profilePage }, page
    }) => {

        let genTitle: string;

        await step('1. Click new article button', async () => {
            await homePage.clickNewArticleButton()
        });

        await step('2. Generate New Title', async () => {
            genTitle = await createArticlePage.generateNewTitle(testArticleData.title);
        });

        await step('2. Create new article', async () => {
            await createArticlePage.createNewArticle(genTitle, testArticleData.description, testArticleData.body, testArticleData.tag)
        });

        await step('3. Delete the new article', async () => {
            await articleDetailPage.clickDeleteArticleBtn();
        });

        await step('4. Check My Post tab', async () => {
            await homePage.clickOnProfile();
            const result = await profilePage.isTheArticleDisplayOnProfilePage(genTitle);
            expect(result).toEqual(0);
        });

    });

    test('Verify user can delete comment successfully @CURD', async ({
        pageObjects: { homePage, articleDetailPage },
    }) => {

        await step('1. User clicks an article on the Global Feed tab', async () => {
            await homePage.clickGlobalFeedTab();
        });

        await step('2. User clicks on the first article on the Global Feed tab', async () => {
            await homePage.clickOnTheFirstArticleOnGlobalFeed();
        });

        await step('3. User comment on the post', async () => {
            await articleDetailPage.commentThePost(testArticleData.comment);
        });

        await step('4. User delete the comment just added', async () => {
            await articleDetailPage.deleteTheComment(testArticleData.comment);
        });

    });
});