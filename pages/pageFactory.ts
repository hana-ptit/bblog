import { Page } from '@playwright/test';
import LogInPage from './web/logInPage';
import HomePage from './web/homePage';
import CreateArticlePage from './web/createArticle';
import ArticleDetailPage from './web/articleDetailPage';
import ProfilePage from './web/profilePage'

export default (page: Page) => ({
    homePage: HomePage(page),
    logInPage: LogInPage(page),
    createArticlePage: CreateArticlePage(page),
    articleDetailPage: ArticleDetailPage(page),
    profilePage: ProfilePage(page),
});
