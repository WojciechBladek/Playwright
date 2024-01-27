import { test as setup } from '@_playwright/fixtures/merge.fixture';

setup('authenticate', async ({ registerNewUser }) => {
  // Act
  registerNewUser;
});
