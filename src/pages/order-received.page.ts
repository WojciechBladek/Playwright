import { BasePage } from '@_playwright/pages/base.page';
import { Page } from '@playwright/test';

export class OrderReceivedPage extends BasePage {
  url = 'checkout/order-received/';

  orderReceivedText = this.page.getByText(
    'Thank you. Your order has been received.',
  );
  constructor(page: Page) {
    super(page);
  }
}
