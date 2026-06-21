import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('sucesso: credenciais válidas redirecionam para home', async ({ page }) => {
    await page.fill('input#log-email', 'dominic@familia.com');
    await page.fill('input#log-password', 'Familia123');
    await page.click('button:has-text("Fazer Login")');

    await expect(page).toHaveURL('/');
  });

  test('falha: email com formato inválido exibe erro de validação', async ({ page }) => {
    await page.fill('input#log-email', 'emailinvalido');
    await page.fill('input#log-password', 'Familia123');
    await page.click('button:has-text("Fazer Login")');

    await expect(page.locator('text=O email não é válido')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('falha: senha em branco exibe erro de validação', async ({ page }) => {
    await page.fill('input#log-email', 'dominic@familia.com');
    await page.click('button:has-text("Fazer Login")');

    await expect(page.locator('text=Preencha a senha')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('falha: credenciais incorretas mantém na página de login', async ({ page }) => {
    await page.fill('input#log-email', 'dominic@familia.com');
    await page.fill('input#log-password', 'SenhaErrada1');
    await page.click('button:has-text("Fazer Login")');

    await expect(page).toHaveURL('/login');
  });
});
