import { expect, test } from "@playwright/test";
import { CartPage } from "../pages/cart.page.js";
import { InventoryPage } from "../pages/inventory.page.js";

test.describe('Cart Page - Comprehensive Tests', () => {

    test('should show empty cart state when no products are added', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();

        // Validar que no hay items en el carrito usando la clase genérica del producto
        await expect(page.locator('.cart_item')).not.toBeVisible();
        // Validar que el badge del carrito no existe
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    });

    test('should reflect correct count when adding multiple products', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.goto();
        await inventoryPage.addBackpack();
        await inventoryPage.addBikeLight();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

        await inventoryPage.goToCart();
        // Aquí puedes validar que existan exactamente 2 elementos en la lista del carrito
        await expect(page.locator('.cart_item')).toHaveCount(2);
    });

    test('can add products, go to cart, remove a product, and update cart badge count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.goto(); // Añadido para asegurar que arranca en inventario
        await inventoryPage.addBackpack();
        await inventoryPage.addBikeLight();

        await expect(inventoryPage.cartBadge).toHaveText('2');

        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/cart/);

        // Usamos el click directo sobre el locator que ya tienes bien definido
        await cartPage.removeBackpack.click();

        await expect(cartPage.removeBackpack).not.toBeVisible();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('should remove the cart badge completely when all products are removed', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.goto(); // Añadido para asegurar contexto
        await inventoryPage.addBackpack();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.goToCart();
        await cartPage.removeBackpack.click();

        await expect(cartPage.removeBackpack).not.toBeVisible();
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

});