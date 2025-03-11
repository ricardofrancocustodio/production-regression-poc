import { Page, Locator } from '@playwright/test';
import { PropertiesReader } from '../utils/PropertiesReader';

export class FindWebElements {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async findElement(key: string): Promise<Locator> {
        const locator = PropertiesReader.getLocator(key);
        if (!locator) {
            throw new Error(`No locator found - ${key}`);
        }

        const [type, value] = locator.split('=', 2).map(s => s.trim());

        console.log(`Locator key: ${key}, Locator value: ${locator}`);
        console.log(`Type: ${type}, Value: ${value}`);

        switch (type) {
            case 'id':
                return this.page.locator(`#${value}`);
            case 'xpath':
                return this.page.locator(`xpath=${value}`);
            case 'cssSelector':
                return this.page.locator(value);
            case 'className':
                return this.page.locator(`.${value}`);
            case 'name':
                return this.page.locator(`[name="${value}"]`);
            case 'tagName':
                return this.page.locator(value);
            default:
                throw new Error(`Locator not supported: ${type}`);
        }
    }

    async findElements(key: string): Promise<Locator[]> {
        const locator = PropertiesReader.getLocator(key);
        if (!locator) {
            throw new Error(`No locator found - ${key}`);
        }

        const [type, value] = locator.split('=', 2).map(s => s.trim());

        switch (type) {
            case 'id':
                return this.page.locator(`#${value}`).all();
            case 'xpath':
                return this.page.locator(`xpath=${value}`).all();
            case 'cssSelector':
                return this.page.locator(value).all();
            case 'className':
                return this.page.locator(`.${value}`).all();
            case 'name':
                return this.page.locator(`[name="${value}"]`).all();
            case 'tagName':
                return this.page.locator(value).all();
            default:
                throw new Error(`Locator not supported: ${type}`);
        }
    }
}
