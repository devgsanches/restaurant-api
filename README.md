# 🍽️ Restaurant API

API RESTful para gerenciamento de pedidos e mesas de restaurante, desenvolvida com Node.js, Express e TypeScript.

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Knex.js (Query Builder)
- Zod (Validação de dados)
- SQLite (Banco de dados)

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/restaurant_api.git
cd restaurant_api
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure o banco de dados:

```bash
npm run knex:migrate
# ou
yarn knex:migrate
```

4. Inicie o servidor:

```bash
npm run dev
# ou
yarn dev
```

## 📚 Endpoints da API

### Mesas (Tables)

#### Listar todas as mesas

- **GET** `/tables`

#### Buscar mesa específica

- **GET** `/tables/:id`

#### Criar nova mesa

- **POST** `/tables`
- **Body:**
  ```json
  {
    "table_number": 1
  }
  ```

#### Atualizar mesa

- **PUT** `/tables/:id`
- **Body:**
  ```json
  {
    "table_number": 2
  }
  ```

#### Deletar mesa

- **DELETE** `/tables/:id`

### Sessões de Mesa (Table Sessions)

#### Listar todas as sessões

- **GET** `/tables-sessions`

#### Criar nova sessão

- **POST** `/tables-sessions`
- **Body:**
  ```json
  {
    "table_id": 1
  }
  ```

#### Fechar sessão

- **PATCH** `/tables-sessions/:id`

### Produtos (Products)

#### Listar todos os produtos

- **GET** `/products`
- **Query Params:**
  - `name`: Buscar produtos por nome

#### Criar novo produto

- **POST** `/products`
- **Body:**
  ```json
  {
    "name": "Nome do Produto",
    "price": 29.9
  }
  ```

#### Atualizar produto

- **PUT** `/products/:id`
- **Body:**
  ```json
  {
    "name": "Novo Nome",
    "price": 39.9
  }
  ```

#### Deletar produto

- **DELETE** `/products/:id`

### Pedidos (Orders)

#### Criar um pedido

- **POST** `/orders`
- **Body:**
  ```json
  {
    "table_session_id": 1,
    "product_id": 1,
    "quantity": 2
  }
  ```

#### Listar pedidos de uma sessão

- **GET** `/orders/table-session/:table_session_id`

#### Obter total de uma sessão

- **GET** `/orders/:table_session_id/total`

#### Deletar um pedido

- **DELETE** `/orders/:id`

## 🤔 Funcionalidades

### Gerenciamento de Mesas

- Listagem de todas as mesas
- Criação de novas mesas
- Atualização de informações das mesas
- Remoção de mesas

### Gerenciamento de Sessões

- Abertura de nova sessão de mesa
- Fechamento de sessão de mesa
- Listagem de todas as sessões
- Controle de status da sessão (aberta/fechada)

### Gerenciamento de Produtos

- Cadastro de produtos com nome e preço
- Listagem de produtos
- Busca de produtos por nome
- Atualização de produtos
- Remoção de produtos

### Gerenciamento de Pedidos

- Criação de pedidos vinculados a uma sessão
- Listagem de pedidos por sessão
- Cálculo do total da sessão (valor e quantidade de itens)
- Remoção de pedidos
- Validações automáticas de:
  - Existência da sessão
  - Status da sessão (aberta/fechada)
  - Existência do produto
  - Quantidade do pedido

### Recursos Técnicos

- Validação de dados com Zod
- Tratamento de erros personalizado
- Queries otimizadas com Knex.js
- Banco de dados SQLite
- API RESTful
- TypeScript para tipagem estática

## 📝 Estrutura do Projeto

```
src/
  ├── controllers/    # Controladores da aplicação
  ├── database/      # Configurações do banco de dados
  ├── migrations/    # Migrações do banco de dados
  ├── routes/        # Rotas da API
  └── utils/         # Utilitários e helpers
```

## ✨ Autor

Guilherme Sanches - [@devgsanches](https://github.com/devgsanches)

---

Feito com ❤️ por devgsanches (https://github.com/devgsanches)
