import { test, expect } from '@playwright/test';

test('First homework test script', async ({ page }) => {
  await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');

  // fill login information
  await page.fill("input[name='username']", 'TinaNguyen');
  await page.waitForTimeout(2000);
  await page.fill("input[name='password']", 'Admin@1234');
  await page.waitForTimeout(2000);
  await page.click("button[type='submit']");

  // check header. Default is "Dashboard" screen.
  await page.waitForSelector(".oxd-topbar-header-title");
  await expect(page.locator(".oxd-topbar-header-title")).toHaveText(/Dashboard/i);
  await page.waitForTimeout(1000);
  await page.getByPlaceholder("Search").fill("time");
  await page.waitForTimeout(1000);
  await page.click(".oxd-main-menu-item-wrapper");
  await page.waitForTimeout(1000);
  await page.waitForSelector(".oxd-topbar-header-title");
  await expect(page.locator(".oxd-topbar-header-title")).toHaveText(/Time/i);
  await page.waitForTimeout(1000);
  // log-out
  await page.click(".oxd-userdropdown-name");
  await page.waitForTimeout(1000);
  await page.click("text=Logout");
  await page.waitForTimeout(1000);
  // Check log-out
  await expect(page).toHaveURL(/auth\/login/);
});