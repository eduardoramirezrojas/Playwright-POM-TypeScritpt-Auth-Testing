import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../data/loginData';

test.describe('Login', () => {

    for (const data of loginData) {

        test(data.name, async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.goto();

            await loginPage.login(
                data.username,
                data.password
            );

            if (data.shouldLogin) {

                await expect(page).toHaveURL(/inventory/);

            } else {

                await expect(loginPage.errorMessage).toBeVisible();

            }
        
        });
    }
});