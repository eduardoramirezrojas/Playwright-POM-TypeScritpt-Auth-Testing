import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page.js'; // O como se llame tu page del inventario
import { CartPage } from '../pages/cart.page.js';           // Tu page del carrito
import { CheckoutPage } from '../pages/checkout.page.js';   // Tu page de checkout

test('Happy Path completo de compra con auth automática', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Como usas storageState, al ir directo al inventario ya estás logueado
    await inventoryPage.goto(); // O el método .goto() de tu InventoryPage
    await page.waitForURL('**/inventory.html');

    // 2. Agregas un producto al carrito y vas a él
    await inventoryPage.addBackpack();
    await inventoryPage.goToCart();

    // 3. Del carrito pasas al checkout
    await cartPage.goto()
    await cartPage.goToCheckOut();

    // 4. Llenas el formulario de checkout que ya hiciste
    await checkoutPage.fillCheckoutForm('Eduardo', 'Ramírez', '68000');
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // 5. Finalizas la compra
    await checkoutPage.finishButton.click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    // 6. Regresas al inicio
    await checkoutPage.backHomeButton.click();
    await expect(page).toHaveURL(/.*inventory.html/);
});