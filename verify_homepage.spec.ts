import { test, expect } from '@playwright/test';

test('verify homepage and reserve yours layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // Mobile
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  // Scroll down a bit to see the limited edition section
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'verification/screenshots/homepage_mobile_reserve.png' });
  
  await page.setViewportSize({ width: 1440, height: 900 }); // Desktop
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'verification/screenshots/homepage_desktop_reserve.png' });
});

test('verify shop urls do not 404', async ({ request }) => {
  const urls = [
    '/shop/women/summer',
    '/shop/women/evening',
    '/shop/women/all',
    '/shop/men/winter'
  ];

  for (const url of urls) {
    const res = await request.get(`http://localhost:3000${url}`);
    expect(res.status()).toBe(200);
  }
});
