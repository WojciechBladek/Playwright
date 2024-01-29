import { getRandomValue } from '@_playwright/helpers/randomValue.helper';
import { BasePage } from '@_playwright/pages/base.page';
import { CartPage } from '@_playwright/pages/cart.page';
import { Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop/';
  cartPage = new CartPage(this.page);

  myCartButton = this.page.locator('[class="top-cart"]');
  productsList = this.page
    .getByRole('listitem')
    .locator('[class="woocommerce-loop-product__title"]');

  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(productName: string): Promise<void> {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: `${productName}` })
      .getByRole('link')
      .nth(1)
      .click();
  }

  async getRandomProductName(): Promise<string> {
    const productNames = await this.productsList.allInnerTexts();
    return await getRandomValue(productNames);
  }

  async clickMyCartButton(): Promise<CartPage> {
    await this.myCartButton.click();
    if (this.cartPage.cartIsEmpty) {
      await this.myCartButton.click();
    }
    return new CartPage(this.page);
  }
}
