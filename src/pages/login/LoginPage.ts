import { Page, Locator, expect } from '@playwright/test';
import { PropertiesReader } from '../../utils/PropertiesReader';

export class LoginPage {
    public page: Page;
    private emailField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private createAnEverySetAccountLink: Locator;
    private forgotPasswordLink: Locator;
    private backgroundActorPortalLink: Locator;
    private invalidLoginToast: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator(PropertiesReader.getLocator("signIn_email"));
        this.passwordField = page.locator(PropertiesReader.getLocator("signIn_password"));
        this.loginButton = page.locator(PropertiesReader.getLocator("loginButton"));
        this.createAnEverySetAccountLink = page.locator(PropertiesReader.getLocator("creatAnEverySetAccountLink"));
        this.forgotPasswordLink = page.locator(PropertiesReader.getLocator("forgotYourPasswordLink"));
        this.backgroundActorPortalLink = page.locator(PropertiesReader.getLocator("backgroundActorPortalLink"));
        this.invalidLoginToast = page.locator(PropertiesReader.getLocator("invalidLoginToast"));
    }

    async navigate() {
        await this.page.goto(PropertiesReader.getConfig("baseUrl"));
    }

    async enterUsername(username: string) {
        await this.emailField.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async clickCreateAnEverySetAccountLink() {
        await this.createAnEverySetAccountLink.click();
    }

    async clickBackgroundActorPortalLink() {
        await this.backgroundActorPortalLink.click();
    }

    async isInvalidLoginToastVisible(): Promise<boolean> {
        const toast = this.invalidLoginToast;
        await toast.waitFor({ state: "visible", timeout: 3000 }); 
        return toast.isVisible();
    }
    
    async getInvalidLoginToast(): Promise<Locator> {
        return this.invalidLoginToast;
    }
    
    
}
