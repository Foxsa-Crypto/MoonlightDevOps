O fluxo atual de e2e tem um risco:

Criar → gera dado dinâmico ✓
Editar → pega #row-0 que é o Elden Ring, não o dado criado pelo teste ✗
Excluir → mesmo problema, destrói um dado fixo do banco ✗

Isso significa que os testes não são idempotentes — rodar duas vezes deixa o banco em estado diferente, e eventualmente algum dado fixo importante some.

O Que é preciso fazer (TO DO) no frontend: barra de pesquisa e filtragem pros 2 cruds.

aí quando a feature de barra de pesquisa estiver pronta pros 2 cruds:

// Criar
await page.click('button#game-submit-btn');
await expect(page).toHaveURL('/admin/games');

// Pesquisar o dado que acabou de criar
await page.fill('input#search', nomeGame);
await expect(page.locator(`text=${nomeGame}`)).toBeVisible();

// Editar esse registro específico
await page.click('button#game-edit-btn-0');

// Excluir esse registro específico
await page.click('button#game-delete-btn-0');
await page.click('button#modal-confirm-btn');
await expect(page.locator(`text=${nomeGame}`)).not.toBeVisible();


Dessa forma, o problema é resolvido. 
O teste cria, encontra, edita e deleta sempre o mesmo registro gerado por ele — sem tocar nos dados fixos.
