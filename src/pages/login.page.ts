import { UserLoginModel } from '@_playwright/models/user.model';
import { BasePage } from '@_playwright/pages/base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/my-account';

  userEmailInput = this.page.locator('#username');
  userPasswordInput = this.page.locator('#password');
  loginButton = this.page.getByRole('button', { name: 'Login' });
  welcomeText = this.page.locator('[class="woocommerce-MyAccount-content"]');
  loginError = this.page.locator('[class="woocommerce-error"]');

  constructor(page: Page) {
    super(page);
  }
  async login(userLoginData: UserLoginModel): Promise<void> {
    await this.userEmailInput.fill(userLoginData.userEmail);
    await this.userPasswordInput.fill(userLoginData.userPassword);
    await this.loginButton.click();
  }
}
