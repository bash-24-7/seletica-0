import { test, expect } from '@playwright/test';

test('verify larger logo', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2000); // Wait for fonts and logo
  await page.screenshot({ path: 'verification/screenshots/extra_large_logo.png' });
});
