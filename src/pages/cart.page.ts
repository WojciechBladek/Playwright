import { BasePage } from '@_playwright/pages/base.page';
import { CheckoutPage } from '@_playwright/pages/checkout.page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  url = '/cart/';

  incrementProductValue = this.page.locator('[class="arrow-up incrementor"]');
  updateCartButton = this.page.getByRole('button', { name: 'Update cart' });
  quantityValueLocator = this.page.getByLabel('Quantity');

  cartUpdatedText = this.page.locator('[class="woocommerce-message"]');
  proceedToCheckoutButton = this.page.locator(
    '[class="wc-proceed-to-checkout"]',
  );
  cartIsEmpty = this.page.locator('[class="cart-empty"]');

  constructor(page: Page) {
    super(page);
  }

  async increaseProductValue(): Promise<void> {
    await this.incrementProductValue.first().click();
    await this.updateCartButton.click();
  }

  productLocator(productName: string): Locator {
    return this.page.getByRole('link', {
      name: `${productName.replace('–', '-')}`,
    });
  }

  async clickButtonProceedToCheckout(): Promise<CheckoutPage> {
    await this.proceedToCheckoutButton.click({ delay: 200 });
    return new CheckoutPage(this.page);
  }
}
