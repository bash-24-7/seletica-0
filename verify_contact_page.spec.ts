import { test, expect } from '@playwright/test';

test('verify contact page includes social links', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  await page.waitForTimeout(1000);
  
  // Take screenshot of contact page
  await page.screenshot({ path: 'verification/screenshots/contact_page.png' });

  // Verify social links exist and have correct hrefs
  const instagramLink = page.locator('a[href="https://www.instagram.com/seletica.official"]');
  await expect(instagramLink.first()).toBeVisible();

  const facebookLink = page.locator('a[href="https://www.facebook.com/seletica"]');
  await expect(facebookLink.first()).toBeVisible();
});
