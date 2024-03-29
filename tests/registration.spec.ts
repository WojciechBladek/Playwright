import { randomUserData } from '@_playwright/factories/user.factory';
import { expect, test } from '@_playwright/fixtures/merge.fixture';
import { RegisterUserModel } from '@_playwright/models/user.model';
import { LoginPage } from '@_playwright/pages/login.page';

test.describe.configure({ mode: 'serial' });
test.describe('Verify register', () => {
  let registerUserData: RegisterUserModel;
  let userName: string;

  test('register with correct data and login @GEN-S2-01', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData = randomUserData();
    userName = registerUserData.userEmail.replace('@example.tet', '');

    // Act
    await registerPage.registerNewUser(registerUserData);

    // Assert
    await expect(
      registerPage.welcomeText,
      'Should be visible welcome text with userName',
    ).toContainText(registerPage.expectedWelcomeText(userName));
  });

  test('login with new account @GEN-S2-01', async ({ page, registerPage }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(registerUserData);

    // Assert
    await expect(
      registerPage.welcomeText,
      'Should be visible welcome text with userName',
    ).toContainText(registerPage.expectedWelcomeText(userName));
  });

  test('not register with incorrect data - email not provided @GEN-S2-02', async ({
    registerPage,
  }) => {
    // Act
    const registerUserData = randomUserData();

    await registerPage.registerNewUser({
      userEmail: '',
      userPassword: registerUserData.userPassword,
    });

    // Assert
    await expect(registerPage.userEmailInput).toHaveAttribute('type', 'email');
    await expect(registerPage.userPasswordInput).toHaveAttribute(
      'type',
      'password',
    );
    await expect(
      registerPage.emailErrorText,
      'Should be displayed invalid email text error',
    ).toBeVisible();
  });
});
