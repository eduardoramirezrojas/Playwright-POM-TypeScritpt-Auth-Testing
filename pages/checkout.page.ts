import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipPostalCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;
    readonly finishButton: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.zipPostalCode = this.page.getByPlaceholder('Zip/Postal Code');
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.errorMessage = this.page.getByTestId('error');
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
        this.backHomeButton = this.page.getByRole('button', { name: 'Back Home' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }

    async fillCheckoutForm(firstName: string, lastName: string, zip: string) {

        await this.firstNameInput.clear();
        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.clear();
        await this.lastNameInput.fill(lastName);

        await this.zipPostalCode.clear();
        await this.zipPostalCode.fill(zip);

        await this.continueButton.click();
    }

}