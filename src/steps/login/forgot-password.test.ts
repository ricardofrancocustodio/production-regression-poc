import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/login/ForgotPasswordPage';
import { PropertiesReader } from '../../utils/PropertiesReader';

test.describe('Forgot Password Page Validation', () => {
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.navigate();
    });

    /* test('Reach Forgot Password Page', async () => {
        await expect(forgotPasswordPage.page).toHaveURL(PropertiesReader.getConfig("forgotPasswordURL"));
    }); */

    test('Send link to reset password using valid email', async () => {
        await forgotPasswordPage.enterEmail(PropertiesReader.getCredentials("dynamicUsername"));
        await forgotPasswordPage.clickResetPasswordButton();

        await expect(await forgotPasswordPage.getInstructionsMessage()).toContain("An email has been sent to");
    });

    test('Try to reset password without filling email field', async () => {
        await forgotPasswordPage.clearEmailField();
        await forgotPasswordPage.clickResetPasswordButton();

        await expect(await forgotPasswordPage.getEmailRequiredMessage()).toBe("Email is required!");
    });

   /*  test('Log in to Everyset platform', async () => {
        await forgotPasswordPage.clickLoginToEverySet();
        await expect(forgotPasswordPage.page).toHaveURL(PropertiesReader.getUrl("loginURL"));
    }); */
});
