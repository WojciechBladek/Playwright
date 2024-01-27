import { pageObjectTest } from '@_playwright/fixtures/page-object.fixture';
import { registerUserTest } from '@_playwright/fixtures/register.fixture';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(pageObjectTest, registerUserTest);
