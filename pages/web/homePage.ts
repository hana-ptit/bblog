import { Page } from '@playwright/test';
import { linkByText, containsClass } from '../../helpers/selectors';
import ProfilePage from './profilePage';

const HomePage = (page: Page) => {

    const elements = {
        signInBtn: linkByText("Sign in"),
        newArticleBtn: containsClass("ion-compose"),
        globalFeedTab: linkByText(" Global Feed "),
        articleTitleOnGlobalFeedTab: (param: string) => `//div[@class='article-preview']//h1[contains(text(),'${param}')]`,
        listPreviewPostsOnGlobalFeed: "//div[@class='article-preview']",
        nextPagingButton: "//li[@class='page-item active']/following-sibling::li",
        theFirstArticleOnGlobalFeed: "(//a[@class='preview-link']/h1)[1]",
        profileBtn: "app-layout-header > nav > div > ul > li:nth-child(4) > a",
    };

    const profilePage = ProfilePage(page);

    async function open(url: string) {
        await page.goto(url);
        await page.waitForLoadState();
    };

    async function clickSignInButton(): Promise<void> {
        await page.click(elements.signInBtn)
    };

    async function clickNewArticleButton(): Promise<void> {
        await page.click(elements.newArticleBtn)
    };

    async function clickGlobalFeedTab(): Promise<void> {
        await page.click(elements.globalFeedTab)
    };

    async function isTheArticleDisplayOnGlobalFeedTabPage(title: string): Promise<number> {
        await page.locator(profilePage.elements.loadingArticles).waitFor({ state: 'hidden' });
        await page.locator(profilePage.elements.loadingArticlesYet).waitFor({ state: 'hidden' });
        const listTitle = await page.$$(elements.articleTitleOnGlobalFeedTab(title));
        return listTitle.length;
    };

    async function isThePageDisplayTheNumberPosts(): Promise<number> {
        await page.locator(profilePage.elements.loadingArticles).waitFor({ state: 'hidden' });
        await page.locator(profilePage.elements.loadingArticlesYet).waitFor({ state: 'hidden' });
        const listPost = await page.$$(elements.listPreviewPostsOnGlobalFeed);
        return listPost.length;
    }

    async function clickOnNextPagingButton(): Promise<void> {
        let nextPagingButton = await page.$$(elements.nextPagingButton);
        await nextPagingButton[0]!.evaluate((node: HTMLElement) => {
            node.click();
        })
    }

    async function clickOnTheFirstArticleOnGlobalFeed(): Promise<void> {
        await page.waitForSelector(elements.theFirstArticleOnGlobalFeed);
        await page.locator(elements.theFirstArticleOnGlobalFeed).click();
    }

    async function clickOnProfile(): Promise<void> {
        await page.waitForSelector(elements.profileBtn);
        await page.click(elements.profileBtn);
    }

    return {
        clickSignInButton,
        clickNewArticleButton,
        open,
        clickGlobalFeedTab,
        isTheArticleDisplayOnGlobalFeedTabPage,
        isThePageDisplayTheNumberPosts,
        clickOnNextPagingButton,
        clickOnTheFirstArticleOnGlobalFeed,
        clickOnProfile,
    }
}


export default HomePage;