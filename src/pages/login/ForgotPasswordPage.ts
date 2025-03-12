import { Page, Locator } from '@playwright/test';
import { PropertiesReader } from '../../utils/PropertiesReader';

export class ForgotPasswordPage {
    private page: Page;
    private emailInput: Locator;
    private resetPasswordButton: Locator;
    private loginToEverySetLink: Locator;
    private instructionsMessage: Locator;
    private emailRequiredMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator(PropertiesReader.getLocator("emailForgotPasswordInput"));
        this.resetPasswordButton = page.locator(PropertiesReader.getLocator("sendLinkToResetMyPwdBtn"));
        this.loginToEverySetLink = page.locator(PropertiesReader.getLocator("logInToEverySetLink"));
        this.instructionsMessage = page.locator(PropertiesReader.getLocator("instructionsAfterSendLinkToResetPassword"));
        this.emailRequiredMessage = page.locator(PropertiesReader.getLocator("emailIsRequiredText"));
    }

    async navigate() {
        await this.page.goto(PropertiesReader.getUrl("forgotPasswordURL"));
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
  
    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async clearEmailField() {
        await this.emailInput.clear();
    }

    async clickResetPasswordButton() {
        await this.resetPasswordButton.click();
    }

    async clickLoginToEverySet() {
        await this.loginToEverySetLink.click();
    }

    async getInstructionsMessage(): Promise<string> {
        return await this.instructionsMessage.textContent() || '';
    }

    async getEmailRequiredMessage(): Promise<string> {
        return await this.emailRequiredMessage.textContent() || '';
    }

    async isResetPasswordButtonVisible(): Promise<boolean> {
        return await this.resetPasswordButton.isVisible();
    }
}
