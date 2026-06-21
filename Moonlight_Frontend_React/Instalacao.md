# 📦 Configuração do Projeto

Este guia descreve os passos necessários para configurar o ambiente do projeto após clonar o repositório.

---

# 1️⃣ Requisitos Iniciais

Certifique-se de que o **Node.js** esteja instalado em sua máquina.

Após clonar o repositório, instale as dependências base do projeto:

```bash
npm install
```

---

# 2️⃣ Bibliotecas de Roteamento

Para gerenciamento de rotas na aplicação web, utilizamos o **React Router**.

Instalação:

```bash
npm install react-router-dom
```

**Versão utilizada no projeto:**

```
^7.13.1
```

---

# 3️⃣ Configuração do Tailwind CSS (v4)

O projeto utiliza **Tailwind CSS v4**, que simplifica bastante o processo de configuração.

## Instalação dos pacotes de desenvolvimento

```bash
npm install -D tailwindcss @tailwindcss/vite postcss autoprefixer
```

---

## Configuração no Vite

Diferente das versões anteriores, na **versão 4 o Tailwind é integrado como plugin do Vite**.

Edite o arquivo:

```
vite.config.ts
```

Adicione o seguinte código:

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

---

## Ativação das diretivas do Tailwind

No arquivo global de estilos:

```
src/styles/global.css
```

Adicione:

```css
@import "tailwindcss";
```

---

✅ Com isso, o **Tailwind CSS estará corretamente configurado no projeto**.
