import { RegisterUserModel } from '@_playwright/models/user.model';
import { BasePage } from '@_playwright/pages/base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/my-account';

  userEmailInput = this.page.locator('#reg_email');
  userPasswordInput = this.page.locator('#reg_password');
  registerButton = this.page.getByRole('button', { name: 'Register' });

  welcomeText = this.page.locator('[class="woocommerce-MyAccount-content"]');
  emailErrorText = this.page.locator('[class="woocommerce-error"]');

  constructor(page: Page) {
    super(page);
  }

  async registerNewUser(registerUserData: RegisterUserModel): Promise<void> {
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.pressSequentially(
      registerUserData.userPassword,
      {
        delay: 50,
      },
    );
    await this.registerButton.click();
  }

  expectedWelcomeText(userName: string): string {
    return `Hello ${userName} (not ${userName}? Log out)`;
  }
}
