import { Page } from '@playwright/test';
import { byText } from '../../helpers/selectors';

const ProfilePage = (page: Page) => {
    const elements = {
        profileNameOnBanner: "//div[@class='banner']//div[@class='article-meta']/a",
        articleTitleOnProfilePage: (param: string) => `//div[@class='article-preview']//h1[contains(text(),'${param}')]`,
        loadingArticles: byText('Loading articles...'),
        loadingArticlesYet: byText('No articles are here'),
        desriptionOftheLatestArticle: (param: string) => `//app-article-preview[1]/div/a/p[contains(text(),'${param}')]`,
        tagOfTheLatestArticle: (param: string) => `//app-article-preview[1]//ul/li[contains(text(),'${param}')]`,
    };

    async function isTheArticleDisplayOnProfilePage(title: string) {
        await page.locator(elements.loadingArticles).waitFor({ state: 'visible' });
        await page.locator(elements.loadingArticles).waitFor({ state: 'hidden' });
        const listTitle = await page.$$(elements.articleTitleOnProfilePage(title));
        return listTitle.length;
    }

    async function checkTheDescription(content: string): Promise<Boolean> {
        await page.locator(elements.loadingArticles).waitFor({ state: 'visible' });
        await page.locator(elements.loadingArticles).waitFor({ state: 'hidden' });
        return await page.locator(elements.desriptionOftheLatestArticle(content)).isVisible();
    }

    async function checkTheTags(content: string): Promise<Boolean> {
        await page.locator(elements.loadingArticles).waitFor({ state: 'hidden' });
        return await page.locator(elements.tagOfTheLatestArticle(content)).isVisible();
    }

    return {
        elements,
        isTheArticleDisplayOnProfilePage,
        checkTheDescription,
        checkTheTags,
    }
}


export default ProfilePage;