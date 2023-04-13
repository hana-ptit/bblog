import { Page } from '@playwright/test';
import { buttonByText, byPlaceholder } from '../../helpers/selectors'

const LogInPage = (page: Page) => {
    const elements = {
        emailTxt: byPlaceholder("Email"),
        passwordTxt: byPlaceholder("Password"),
        logInBtn: buttonByText("Sign in")
    };

    async function logIn(email: string, password: string): Promise<void> {
        await inputEmail(email);
        await inputPassword(password)
        await clickLogInButton();
    }

    async function clickLogInButton(): Promise<void> {
        await page.click(elements.logInBtn)
    }

    async function inputEmail(email: string): Promise<void> {
        await page.click(elements.emailTxt)
        await page.fill(elements.emailTxt, email)
    }

    async function inputPassword(password: string): Promise<void> {
        await page.click(elements.passwordTxt)
        await page.fill(elements.passwordTxt, password)
    }
    return {
        logIn,
    }
}


export default LogInPage;