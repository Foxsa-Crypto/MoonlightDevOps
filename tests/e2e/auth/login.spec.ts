import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('sucesso: credenciais válidas redirecionam para home', async ({ page }) => {
    await page.getByLabel('Email').fill('dominic@familia.com');
    await page.getByLabel('Senha').fill('Familia123');
    await page.getByRole('button', { name: 'Fazer Login' }).click();

    await expect(page).toHaveURL('/');
  });

  test('falha: email com formato inválido exibe erro de validação', async ({ page }) => {
    await page.getByLabel('Email').fill('emailinvalido');
    await page.getByLabel('Senha').fill('Familia123');
    await page.getByRole('button', { name: 'Fazer Login' }).click();

    await expect(page.getByText('O email não é válido')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('falha: senha em branco exibe erro de validação', async ({ page }) => {
    await page.getByLabel('Email').fill('dominic@familia.com');
    await page.getByRole('button', { name: 'Fazer Login' }).click();

    await expect(page.getByText('Preencha a senha')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('falha: credenciais incorretas mantém na página de login e exibem erro de credenciais', async ({ page }) => {
    await page.getByLabel('Email').fill('dominic@familia.com');
    await page.getByLabel('Senha').fill('SenhaErrada1');
    await page.getByRole('button', { name: 'Fazer Login' }).click();

    await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
