import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { PropertiesReader } from '../../utils/PropertiesReader';

test.describe('Login Page Validation', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Login with valid credentials', async () => {
        await loginPage.enterUsername(PropertiesReader.getCredentials("existingUsernames"));
        await loginPage.enterPassword(PropertiesReader.getCredentials("password"));
        await loginPage.clickLogin();

        await expect(loginPage.page).toHaveURL(PropertiesReader.getConfig("baseUrl"));
    }); 

    test('Login with invalid credentials', async () => {
        await loginPage.enterUsername(PropertiesReader.getCredentials("invalidUsername"));
        await loginPage.enterPassword(PropertiesReader.getCredentials("invalidPassword"));
        await loginPage.clickLogin();

        await expect(await loginPage.getInvalidLoginToast()).toBeVisible({ timeout: 5000 });
   
    });

    test('Access Forgot password flow', async () => {
        await loginPage.clickForgotPassword();
        await expect(loginPage.page).toHaveURL(PropertiesReader.getUrl("forgotPasswordURL"));
    });

    test('Access create an Everyset account page', async () => {
        await loginPage.clickCreateAnEverySetAccountLink();

        await expect(loginPage.page).toHaveURL(PropertiesReader.getUrl("signUpURL"));
    });

    test('Access Background Actor Portal page', async () => {
        await loginPage.clickBackgroundActorPortalLink();
        
        await expect(loginPage.page).toHaveURL(PropertiesReader.getUrl("backgroundActorPortalLink"));
    }); 
});
