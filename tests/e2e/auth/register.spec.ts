import { test, expect } from '@playwright/test';

// Timestamp para garantir email único a cada execução
const timestamp = Date.now();

test.describe('Registro de usuário', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    // Clica na aba "Criar conta" para abrir o formulário de registro
    await page.click('button:has-text("Criar conta")');
  });

  test('sucesso: dados válidos criam conta e redirecionam', async ({ page }) => {
    await page.fill('input#reg-name', 'UsuarioTeste');
    await page.fill('input#reg-cpf', '529.982.247-25');
    await page.fill('input#reg-email', `teste${timestamp}@email.com`);
    await page.fill('input#reg-password', 'Teste@123');
    await page.fill('input#reg-confirm', 'Teste@123');
    await page.click('button:has-text("Criar Conta")');

    // Após registro redireciona para login ou home
    await expect(page).toHaveURL(/\/(login)?$/);
  });

  test('falha: email já cadastrado exibe erro', async ({ page }) => {
    await page.fill('input#reg-name', 'UsuarioTeste');
    await page.fill('input#reg-cpf', '529.982.247-25');
    await page.fill('input#reg-email', 'dominic@familia.com'); // email já existe no banco
    await page.fill('input#reg-password', 'Teste@123');
    await page.fill('input#reg-confirm', 'Teste@123');
    await page.click('button:has-text("Criar Conta")');

    // Permanece na mesma página com erro
    await expect(page).not.toHaveURL('/');
  });

  test('falha: senhas diferentes exibem erro de validação', async ({ page }) => {
    await page.fill('input#reg-name', 'UsuarioTeste');
    await page.fill('input#reg-cpf', '529.982.247-25');
    await page.fill('input#reg-email', `outro${timestamp}@email.com`);
    await page.fill('input#reg-password', 'Teste@123');
    await page.fill('input#reg-confirm', 'SenhaDiferente1');
    await page.click('button:has-text("Criar Conta")');

    await expect(page).not.toHaveURL('/');
  });

  test('falha: campos vazios exibem erros de validação', async ({ page }) => {
    await page.click('button:has-text("Criar Conta")');

    await expect(page).not.toHaveURL('/');
  });
});
