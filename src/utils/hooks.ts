import { test } from '@playwright/test';
import { PropertiesReader } from '../utils/PropertiesReader';

test.beforeEach(async ({ page }) => {
    await page.goto(PropertiesReader.getConfig("baseUrl"));
});

test.afterEach(async ({ page }) => {
    await page.close();
});
