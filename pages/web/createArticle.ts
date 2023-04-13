import { Page } from '@playwright/test';
import { buttonByText, byPlaceholder, inputByAttributeValue } from '../../helpers/selectors'

const CreateArticlePage = (page: Page) => {
    const elements = {
        titleTxt: inputByAttributeValue("formcontrolname", "title"),
        aboutTxt: inputByAttributeValue("formcontrolname", "description"),
        bodyTxt: 'textarea[formcontrolname=body]',
        tagTxt: byPlaceholder("Enter tags"),
        submitBtn: buttonByText("Publish Article"),
    };


    async function createNewArticle(title: string, description: string, body: string, tag: string): Promise<void> {
        await inputArticleTitle(title)
        await inputArticleAbout(description)
        await inputArticleBody(body)
        await inputArticleTag(tag)
        await clickSubmitButton()
    }

    async function inputArticleTitle(title: string): Promise<void> {
        await page.click(elements.titleTxt)
        await page.fill(elements.titleTxt, title)
    }

    async function inputArticleAbout(description: string): Promise<void> {
        await page.click(elements.aboutTxt)
        await page.fill(elements.aboutTxt, description)
    }

    async function inputArticleBody(body: string): Promise<void> {
        await page.click(elements.bodyTxt)
        await page.fill(elements.bodyTxt, body)
    }

    async function inputArticleTag(tag: string): Promise<void> {
        await page.click(elements.tagTxt)
        await page.fill(elements.tagTxt, tag)
        await page.keyboard.press('Enter')
    }

    async function clickSubmitButton(): Promise<void> {
        await page.click(elements.submitBtn)
    }

    async function editNewArticle(title: string, description: string, body: string, tag: string): Promise<void> {
        await inputArticleTitle(title)
        await inputArticleAbout(description)
        await inputArticleBody(body)
        await inputArticleTag(tag)
        await clickSubmitButton()
    }

    async function generateNewTitle(text: string): Promise<string> {
        let randomText = (Math.random() + 1).toString(36).substring(5);
        const newTitle = text + randomText
        return newTitle
    }

    return {
        createNewArticle,
        inputArticleTitle,
        inputArticleAbout,
        inputArticleBody,
        inputArticleTag,
        clickSubmitButton,
        editNewArticle,
        generateNewTitle,
    }
}


export default CreateArticlePage;