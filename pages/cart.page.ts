import { Locator, Page } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly checkoutButton : Locator;
    readonly removeBackpack : Locator;
    readonly continueShopping : Locator;



    constructor(page: Page){
        this.page = page;
        this.checkoutButton = this.page.getByRole('button', {name: 'Checkout'});
        this.removeBackpack = this.page.getByTestId('remove-sauce-labs-backpack');
        this.continueShopping = this.page.getByTestId('continue-shopping');
        
    } 

    async goto(){
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    // pueda remover
    async remove(){
        await this.removeBackpack.click()
    }

    // ir a checkout
    async goToCheckOut(){
        await this.checkoutButton.click()
    }

}