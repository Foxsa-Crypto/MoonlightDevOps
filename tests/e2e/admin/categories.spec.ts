import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/auth';

const timestamp = Date.now();
const nomeCategoria = `Categoria Teste ${timestamp}`;
const nomeCategoriaEditada = `Categoria Editada ${timestamp}`;

test.describe('CRUD de Categorias', () => {

  test('listar: página de categorias carrega com tabela', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    await expect(page.locator('.rdt_Table')).toBeVisible();
  });

  test('cadastrar: sucesso ao criar nova categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories/create');

    await page.fill('input#category-name', nomeCategoria);
    await page.fill(
      'textarea#category-description',
      'Descrição da categoria de teste'
    );
    await page.click('button#category-submit-btn');

    await expect(page).toHaveURL('/admin/categories');
  });

  test('cadastrar: falha com campos vazios', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories/create');

    await page.click('button#category-submit-btn');

    // Permanece na página de criação com erros
    await expect(page).toHaveURL('/admin/categories/create');
  });

  test('editar: sucesso ao editar categoria existente', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    // Clica no botão de editar da primeira linha
    await page.click('button#cat-edit-btn-0');

    // Aguarda navegar para página de edição
    await page.waitForURL('/admin/categories/edit/1');

    // Limpa e preenche o campo de nome
    const inputNome = page.locator('input#category-name');
    await inputNome.fill('');
    await inputNome.fill(nomeCategoriaEditada);

    await page.click('button#category-submit-btn');

    await expect(page).toHaveURL('/admin/categories');
  });

  test('excluir: cancelar não remove a categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    const primeiraLinha = page.locator('#row-0').first();
    const nomeAntes = await primeiraLinha.locator('.rdt_TableCell').first().innerText();

    // Clica no botão de deletar (segundo botão da linha)
    await page.click('button#cat-delete-btn-0');

    // Cancela o modal
    await page.click('button#modal-cancel-btn');

    await expect(page.locator(`text=${nomeAntes}`)).toBeVisible();
  });

  test('excluir: sucesso ao excluir categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    // Pega o texto da primeira linha antes de deletar
    const primeiraLinha = page.locator('#row-0').first();
    const nomeAntes = await primeiraLinha.locator('.rdt_TableCell').first().innerText();

    await page.click('button#cat-delete-btn-0');

    await page.click('button#modal-confirm-btn');

    await expect(page.locator(`text=${nomeAntes}`)).not.toBeVisible();
  });
});
