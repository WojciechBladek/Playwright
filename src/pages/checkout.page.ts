import { UserCheckoutDataModel } from '@_playwright/models/user-checkout.model';
import { BasePage } from '@_playwright/pages/base.page';
import { OrderReceivedPage } from '@_playwright/pages/order-received.page';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  url = '/checkout/';

  userFirstName = this.page.locator('#billing_first_name');
  userLastName = this.page.locator('#billing_last_name');
  userStreetAddress = this.page.locator('#billing_address_1');
  userPostCode = this.page.locator('#billing_postcode');
  userTownCity = this.page.locator('#billing_city');
  userPhone = this.page.locator('#billing_phone');
  userCountry = this.page.locator('#select2-billing_country-container');
  userCountryState = this.page
    .locator('#billing_state_field')
    .getByRole('combobox');

  placeOrderButton = this.page.locator('#place_order');
  errorMessage = this.page.locator('.woocommerce-error');

  constructor(page: Page) {
    super(page);
  }

  async fillOutTheForm(userFormData: UserCheckoutDataModel): Promise<void> {
    await this.userFirstName.pressSequentially(userFormData.userFirstName, {
      delay: 50,
    });
    await this.userLastName.pressSequentially(userFormData.userLastName, {
      delay: 50,
    });
    await this.userCountry.click();
    await this.page
      .getByRole('option', { name: 'United States (US)', exact: true })
      .click();
    await this.userPostCode.pressSequentially(userFormData.userPostCode, {
      delay: 50,
    });
    await this.userTownCity.pressSequentially(userFormData.userTownCity, {
      delay: 50,
    });
    await this.userCountryState.click();
    await this.page.getByRole('option', { name: 'Washington' }).click();
    await this.userStreetAddress.pressSequentially(
      userFormData.userStreetAddress,
      {
        delay: 50,
      },
    );
    await this.userPhone.pressSequentially(userFormData.userPhone, {
      delay: 100,
    });
    await this.userPhone.blur();
  }

  async clickPlaceOrderButton(): Promise<OrderReceivedPage> {
    await this.placeOrderButton.click({ delay: 2000 });
    return new OrderReceivedPage(this.page);
  }
}
