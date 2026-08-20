import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly backpack : Locator;
    readonly bikeLight : Locator;
    readonly removeBackPackButton : Locator;
    readonly cart : Locator
    readonly cartBadge : Locator;
    readonly sortDropdown: Locator;
    readonly priceList : Locator;
    readonly itemNameList : Locator;

    constructor(page: Page) {
        this.page = page;
        // Usando selectores CSS explícitos para data-test
        this.backpack = this.page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.bikeLight = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.removeBackPackButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.cart = this.page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = this.page.getByTestId('shopping-cart-badge');
        this.sortDropdown = this.page.getByTestId('product-sort-container');
        this.priceList = page.locator('.inventory_item_price');
        this.itemNameList = page.locator('.inventory_item_name ')
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async addBackpack() {
        await this.backpack.click();
    }

    async addBikeLight() {
        await this.bikeLight.click();
    }

    async removeBackpack() {
        await this.removeBackPackButton.click()
    }

    async goToCart() {
        await this.cart.click();
    }

    async sortByLowToHigh() {
        await this.sortDropdown.selectOption('lohi'); 
    }

    async sortByHighToLow() {
        await this.sortDropdown.selectOption('hilo')
    }

    async getProductPrices() : Promise<number[]> {

        const priceText = await this.priceList.allTextContents()

        return priceText.map(price => parseFloat(price.replace('$', '')))

    }

    async sortByAtoZ(){
        await this.sortDropdown.selectOption('az')
    }

    async sortByZtoA(){
        await this.sortDropdown.selectOption('za')
    }

    async getItemNames() {
        return await this.itemNameList.allTextContents()
    }

}