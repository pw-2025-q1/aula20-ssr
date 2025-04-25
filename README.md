# Handlebars Tutorial

Este projeto é um tutorial prático para aprender a usar o Handlebars, um mecanismo de template para Node.js. Ele demonstra como criar e renderizar templates dinâmicos com layouts, partials e helpers personalizados.

## Estrutura do Projeto

- **src/**: Contém o código do servidor em TypeScript.
  - `server.ts`: Configuração do servidor Express e rotas.
- **static/**: Arquivos estáticos como CSS.
  - `styles.css`: Estilos principais.
  - `alternate-styles.css`: Estilos alternativos.
- **views/**: Templates Handlebars.
  - `layouts/`: Layouts principais para as páginas.
  - `partials/`: Partials reutilizáveis, como cabeçalhos e rodapés.
  - Outros arquivos `.handlebars`: Templates para páginas específicas.

## Pré-requisitos

- Node.js e npm instalados.
- TypeScript configurado no ambiente.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor em modo de desenvolvimento:
   ```bash
    npm run dev
   ```

4. Acesse o servidor no navegador em `http://localhost:3000`.

## Funcionalidades

- **Layouts**: Uso de layouts para estruturar páginas.
- **Partials**: Componentes reutilizáveis como cabeçalhos e rodapés.
- **Helpers Personalizados**: Inclui um helper para formatar valores monetários em Reais (BRL).
- **Rotas Dinâmicas**: Exemplos de rotas que renderizam templates com dados dinâmicos.

## Rotas disponíveis

Consulte `server.ts` para ver as rotas disponíveis e como elas estão configuradas. Cada rota possui comentários explicativos sobre o que ela faz e quais dados são passados para os templates.