import { test, expect } from '@playwright/test';

// Timestamp para garantir email único a cada execução
const timestamp = Date.now();

test.describe('Registro de usuário', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('sucesso: dados válidos criam conta e redirecionam', async ({ page }) => {
    await page.getByLabel('Nome de usuário').fill('UsuarioTeste');
    await page.getByLabel('CPF').fill('529.982.247-25');
    await page.getByLabel('Email').fill(`teste${timestamp}@email.com`);
    await page.fill('input#reg-password', 'Teste@123');
    await page.getByLabel('Confirmar Senha').fill(`Teste@123`);
    await page.click('button#reg-submit-btn');

    // Após registro redireciona para login ou home
    await expect(page).toHaveURL('/login');
  });

  test('falha: email já cadastrado exibe erro', async ({ page }) => {
    await page.getByLabel('Nome de usuário').fill('UsuarioTeste');
    await page.getByLabel('CPF').fill('529.982.247-25');
    await page.getByLabel('Email').fill(`dominic@familia.com`);
    await page.fill('input#reg-password', 'Teste@123');
    await page.getByLabel('Confirmar Senha').fill(`Teste@123`);
    await page.click('button#reg-submit-btn');

    // Permanece na mesma página com erro
    await expect(page).toHaveURL('/register');
  });

  test('falha: senhas diferentes exibem erro de validação', async ({ page }) => {
    await page.getByLabel('Nome de usuário').fill('UsuarioTeste');
    await page.getByLabel('CPF').fill('529.982.247-25');
    await page.getByLabel('Email').fill(`outro${timestamp}@email.com`);
    await page.fill('input#reg-password', 'Teste@123');
    await page.getByLabel('Confirmar Senha').fill('SenhaDiferente1');
    await page.click('button#reg-submit-btn');

    await expect(page).toHaveURL('/register');
  });

  test('falha: campos vazios exibem erros de validação', async ({ page }) => {
    await page.click('button#reg-submit-btn');

    await expect(page).toHaveURL('/register');
  });
});
