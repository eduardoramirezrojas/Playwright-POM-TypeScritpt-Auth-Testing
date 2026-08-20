import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page.js';
import checkoutData from '../data/checkout-data.json' with { type: 'json' };

test.describe('Checkout - Form Validations and Success Flow', () => {

    // 1. El ciclo para validar los errores usando tu JSON
    for (const data of checkoutData) {
        test(`should fail when missing data -> First: "${data.firstName}", Last: "${data.lastName}", Zip: "${data.zip}"`, async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.goto();

            await checkoutPage.fillCheckoutForm(data.firstName, data.lastName, data.zip);

            // Validamos que aparezca el error y nos quedemos en la misma página
            await expect(checkoutPage.errorMessage).toBeVisible();
            await expect(checkoutPage.errorMessage).toContainText(data.expectedError);
        });
    }

    // 2. Un test separado puramente para el éxito (Happy Path de esta pantalla)
    test('should successfully complete checkout when all data is valid', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.goto();

        // Llenamos con datos válidos
        await checkoutPage.fillCheckoutForm('Eduardo', 'Ramírez', '68000');

        // Aquí sí validamos que brinca al paso 2
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

        // Hacemos clic en Finish usando la propiedad de tu Page Object
        await checkoutPage.finishButton.click();

        // Validamos la página de completado
        await expect(page).toHaveURL(/.*checkout-complete.html/);

        // Damos clic en Back Home
        await checkoutPage.backHomeButton.click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});