import { Page } from '@playwright/test';
import { byPlaceholder, buttonByText } from '../../helpers/selectors';

const ArticleDetailPage = (page: Page) => {
    const elements = {
        titleArticleOnbanner: (param: string) => `//div[@class='container']/h1[contains(text(),'${param}')]`,
        contentArticleDisplay: (param: string) => `//div[@class='row article-content']//p[contains(text(),'${param}')]`,
        profileNameOnBanner: "//div[@class='banner']//div[@class='article-meta']/a",
        commentField: byPlaceholder('Write a comment...'),
        postCmtBtn: buttonByText(' Post Comment '),
        commentCard: (param: string) => `//app-article-comment//p[contains(text(),'${param}')]`,
        deleteIconOfCommentCardByText: (param: string) =>
            `//app-article-comment//p[contains(text(),'${param}')]/../following-sibling::div//span[@class='mod-options' and i[@class='ion-trash-a']]`,
        editArticleBtn: "//div[@class='article-actions']//a[contains(text(),'Edit Article')]",
        deleteArticleBtn: "//div[@class='article-actions']//button[contains(text(),'Delete Article')]"
    };

    async function clickProfileNameOnBanner(): Promise<void> {
        await page.click(elements.profileNameOnBanner)
    }

    async function inputTheCommentToTheTextfield(text: string): Promise<void> {
        await page.waitForSelector(elements.commentField);
        await page.fill(elements.commentField, text);
    }

    async function clickPostCommentBtn(): Promise<void> {
        await page.waitForSelector(elements.postCmtBtn);
        await page.click(elements.postCmtBtn);
    }

    async function commentThePost(text: string): Promise<void> {
        await inputTheCommentToTheTextfield(text);
        await clickPostCommentBtn();
    }

    async function deleteTheComment(text: string): Promise<void> {
        await page.waitForSelector(elements.commentCard(text));
        await page.click(elements.deleteIconOfCommentCardByText(text));
    }

    async function clickEditArticleButton(): Promise<void> {
        await page.waitForSelector(elements.editArticleBtn);
        await page.click(elements.editArticleBtn);
    }

    async function checkTheTitle(title: string): Promise<Boolean> {
        await page.waitForSelector(elements.editArticleBtn);
        return await page.locator(elements.titleArticleOnbanner(title)).isVisible();
    }

    async function checkTheContent(content: string): Promise<Boolean> {
        await page.waitForSelector(elements.editArticleBtn);
        return await page.locator(elements.contentArticleDisplay(content)).isVisible();
    }

    async function clickDeleteArticleBtn(): Promise<void> {
        await page.waitForSelector(elements.deleteArticleBtn);
        await page.click(elements.deleteArticleBtn)
    }

    return {
        clickProfileNameOnBanner,
        inputTheCommentToTheTextfield,
        clickPostCommentBtn,
        commentThePost,
        deleteTheComment,
        clickEditArticleButton,
        checkTheTitle,
        checkTheContent,
        clickDeleteArticleBtn,
    }
}


export default ArticleDetailPage;