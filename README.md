# Flight API

## Visão Geral

O **Flight API** é uma aplicação backend desenvolvida em Node.js utilizando o framework [Hono](https://hono.dev/) e a biblioteca [Drizzle ORM](https://orm.drizzle.team/) para integração com banco de dados PostgreSQL. A API oferece endpoints para o gerenciamento completo de passageiros, voos, aeronaves, cartões de embarque (boarding passes) e usuários do sistema, incluindo autenticação JWT e cache em Redis. É ideal para sistemas de reservas aéreas ou operações aeroportuárias.

---

## Funcionalidades

- Cadastro, listagem, atualização e remoção de passageiros, voos, aeronaves e cartões de embarque.
- Gerenciamento de usuários (CRUD).
- Autenticação JWT.
- Cache de dados em Redis para maior performance.
- Documentação e testes com Postman.

---

## Tecnologias e Bibliotecas

- [Node.js](https://nodejs.org/)
- [Hono](https://hono.dev/) (framework web)
- [Drizzle ORM](https://orm.drizzle.team/) (ORM para PostgreSQL)
- [PostgreSQL](https://www.postgresql.org/) (banco de dados relacional)
- [Redis](https://redis.io/) (cache e gerenciamento de sessão)
- [JWT](https://jwt.io/) (autenticação)
- [dotenv](https://www.npmjs.com/package/dotenv) (gerenciamento de variáveis de ambiente)
- [Docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose/)
- [ESLint](https://eslint.org/) (linter)
- [Postman](https://www.postman.com/) (coleção de testes)

---

## Instalação

### Pré-requisitos

- Node.js 20+
- Docker e docker-compose
- (Opcional) PostgreSQL e Redis instalados localmente (se não usar Docker)

### 1. Clone o repositório

```bash
git clone https://github.com/douglascunha1/flight_api.git
cd flight_api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Gere as variáveis de ambiente

Execute o script abaixo para gerar a variável `JWT_SECRET` automaticamente em um arquivo `.env` na raiz do projeto.  
O mesmo arquivo `.env` será usado para armazenar as URLs do PostgreSQL e Redis.

```bash
sh generate-jwt-secret.sh
```

Esse script irá:

- Criar um arquivo `.env` se não existir.
- Gerar e armazenar uma chave segura para `JWT_SECRET`.
- Você deve incluir também as variáveis do PostgreSQL e Redis no `.env` manualmente, por exemplo:

```
DATABASE_URL="postgres://usuario:senha@localhost:5432/seu_banco"
REDIS_URL="redis://localhost:6379"
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
```

Se estiver usando Docker, as variáveis de ambiente são automaticamente lidas do `.env`.

### 4. Suba os containers (PostgreSQL, Redis, Adminer, API)

```bash
docker compose up -d --build
```

A aplicação estará disponível em:  
`http://localhost:3000`

O banco de dados Adminer estará disponível em:  
`http://localhost:8080`  
(_Use para inspecionar seu banco PostgreSQL via UI._)

---

## Endpoints

A API oferece endpoints REST completos para cada entidade, caso você queira testar manualmente, utilize o [Postman](https://www.postman.com/) ou qualquer outro cliente HTTP. A collection do Postman está disponível na pasta `docs` do repositório.

### Passageiros (`/passengers`)
- `GET /passengers` – Lista todos os passageiros
- `GET /passengers/:id` – Detalha um passageiro específico
- `POST /passengers` – Cria um novo passageiro
- `PUT /passengers/:id` – Atualiza um passageiro existente
- `DELETE /passengers/:id` – Remove um passageiro

### Voos (`/flights`)
- `GET /flights` – Lista todos os voos
- `GET /flights/:id` – Detalha um voo específico
- `POST /flights` – Cria um novo voo
- `PUT /flights/:id` – Atualiza um voo existente
- `DELETE /flights/:id` – Remove um voo

### Aeronaves (`/aircrafts`)
- `GET /aircrafts` – Lista todas as aeronaves
- `GET /aircrafts/:id` – Detalha uma aeronave específica
- `POST /aircrafts` – Cria uma nova aeronave
- `PUT /aircrafts/:id` – Atualiza uma aeronave existente
- `DELETE /aircrafts/:id` – Remove uma aeronave

### Cartões de Embarque (`/boarding-passes`)
- `GET /boarding-passes` – Lista todos os cartões de embarque
- `GET /boarding-passes/details` – Lista todos os cartões de embarque com detalhes
- `GET /boarding-passes/:id` – Detalha um cartão de embarque específico
- `POST /boarding-passes` – Cria um novo cartão de embarque
- `PUT /boarding-passes/:id` – Atualiza um cartão de embarque existente
- `DELETE /boarding-passes/:id` – Remove um cartão de embarque

### Usuários (`/users`)
- `POST /users` – Cria um novo usuário
- `PUT /users/:id` – Atualiza um usuário existente
- `DELETE /users/:id` – Remove um usuário

### Login (`/login`)
- `POST /login` – Realiza o login de um usuário e retorna um token JWT

---

## Estrutura do Projeto

```
flight_api/
├── Dockerfile
├── docker-compose.yml
├── .env
├── generate-jwt-secret.sh
├── README.md
├── index.js
├── package.json
├── src/
│   ├── config/
│   │   └── db/
│   │       ├── index.js
│   │       ├── schema.js
│   │       └── redis.js
│   ├── handlers/         # Lógica dos endpoints
│   ├── repository/       # Camada de acesso a dados
│   ├── routes/           # Definição das rotas
│   ├── services/         # Lógica de negócio
│   ├── middleware/       # Middlewares (ex: autenticação, cache)
│   ├── utils/            # Funções utilitárias
│   └── app.js
```

---

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests com sugestões de melhorias ou correções!

---

## Licença

Este projeto está sob licença MIT.

---