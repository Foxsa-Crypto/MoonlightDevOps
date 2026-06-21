import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/login');
  await page.fill('input#log-email', 'dominic@familia.com');
  await page.fill('input#log-password', 'Familia123');
  await page.click('button:has-text("Fazer Login")');
  await page.waitForURL('/');
}
