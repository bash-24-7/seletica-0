import { test, expect } from '@playwright/test';

test('verify admin login page renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/login');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'verification/screenshots/admin_login.png' });

  const heading = page.locator('h1', { hasText: /Admin Portal/i });
  await expect(heading).toBeVisible();
});
