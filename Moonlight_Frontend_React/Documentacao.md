# 📘 Documentação do Projeto

Este documento descreve a organização e algumas diretrizes utilizadas no **Front-end do projeto**.

---

# ⚡ Front-end

Estamos utilizando o **Vite**, que funciona como:

* **Build Tool** (Ferramenta de build)
* **Development Server**

Ele é responsável por:

* Servir a aplicação rapidamente durante o desenvolvimento
* Compilar o projeto
* Traduzir módulos
* Empacotar a aplicação para produção

Para usar o vite:
npm create vite@latest

---

# 📂 Organização do Projeto

A estrutura principal do projeto segue a organização abaixo:

```id="structure-tree"
src/
├── @types/             # Interfaces globais (User, Product, etc.)
├── components/
│   ├── common/         # Botões, Inputs, Modal (Reutilizáveis)
│   └── layout/         # Header, Sidebar (Composição de tela)
├── hooks/              # useAuth, usePagination (Lógica de estado)
├── services/           # Classes que chamam a API (Axios instances)
├── utils/              # Regex (Email), Validador de CPF
├── contexts/           # AuthContext (Dados globais do usuário)
└── views/              # Telas da aplicação
    └── User/
        ├── UserList.tsx
        ├── UserCreate.tsx
        └── UserEdit.tsx
```

---

# 🎨 CSS e Tailwind

O projeto utiliza **Tailwind CSS** para estilização.

## 📦 Componentização

Para manter o requisito de **componentes genéricos e reutilizáveis**, devemos **evitar colocar muitas classes Tailwind diretamente nas telas**.

A abordagem recomendada é **extrair componentes reutilizáveis em React**, e não criar abstrações diretamente no CSS.

### Exemplo

Arquivo:

```
src/components/common/Button.tsx
```

```tsx id="button-example"
interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary';
}

export const Button = ({ label, variant = 'primary' }: ButtonProps) => {

    const baseStyle = "px-4 py-2 rounded font-medium transition-colors";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]}`}>
            {label}
        </button>
    );

};
```

Essa abordagem permite:

* reutilizar estilos
* manter o código organizado
* evitar repetição de classes Tailwind
* facilitar manutenção

---

# 🌍 Estilos Globais

Alguns estilos **não pertencem a um componente específico**, mas sim ao **site inteiro**, como:

* reset do navegador
* fontes globais
* cores padrão da aplicação
* estilos base do `body`

Esses estilos devem ficar em uma pasta dedicada à **estética global**.

## Estrutura

```
src/
├── styles/
│   ├── global.css
```

### Arquivo `global.css`

Esse arquivo pode conter:

* reset CSS
* estilos globais do `body`
* importação do Tailwind
* definição de fontes
* variáveis globais do projeto

Exemplo:

```css id="global-css"
@import "tailwindcss";

body {
    margin: 0;
    font-family: system-ui, sans-serif;
}
```

---

# ▶️ Rodar testes

* npx vitest
* npx vitest --watch
* npx vitest --coverage

# formas lendarias de adquirir imagens via url de API

https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_hero.jpg img de banner
https://shared.akamai.steamstatic.com//store_item_assets//steam//apps//1245620//hero_capsule.jpg?t=1767883716 imagem de card de produto

https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg imagem de categoria