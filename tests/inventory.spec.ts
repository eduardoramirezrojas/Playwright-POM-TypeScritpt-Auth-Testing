import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';

test.describe('Inventory', () => {

    // test.beforeEach(async ({ page }) => {

    //     const loginPage = new LoginPage(page);

    //     await loginPage.goto();

    //     await loginPage.login(
    //         'standard_user',
    //         'secret_sauce'
    //     );

    //     await expect(page).toHaveURL(/inventory/);
    // });

    test.beforeEach(async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.goto();
    });


    test('can add one product', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpack();

        await expect(inventoryPage.cartBadge).toHaveText('1');
    });


    test('can add multiple products and have 2 products on cart badge', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpack();
        await inventoryPage.addBikeLight();

        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

    test('can add and remove a product and the badge show the removed item', async ({page}) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpack()

        await expect(inventoryPage.cartBadge).toHaveText('1')

        await inventoryPage.removeBackpack()

        await expect(inventoryPage.cartBadge).toBeHidden()


    })

    test('can sort low to high', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByLowToHigh()

        const prices = await inventoryPage.getProductPrices()

        const sortedPrices = [...prices].sort((a,b) => a - b)

        expect(prices).toEqual(sortedPrices)

    })

    test('can sort high to low', async ({page}) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByHighToLow();

        const prices = await inventoryPage.getProductPrices();

        const sortedPrices = [...prices].sort((a,b) => b - a);

        expect(prices).toEqual(sortedPrices)

    })

    test('can sort A to Z', async ({page}) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByAtoZ();

        const names = await inventoryPage.getItemNames();

        const sortedNames = [...names].sort((a,b) => a.localeCompare(b));

        expect(names).toEqual(sortedNames)

    })

    test('can sort Z to A', async ({page}) => {

        const inventoryPage = new InventoryPage(page);

        await inventoryPage.sortByZtoA();

        const names = await inventoryPage.getItemNames();

        const sortedNames = [...names].sort((a,b) => b.localeCompare(a));

        expect(names).toEqual(sortedNames)

    })


});