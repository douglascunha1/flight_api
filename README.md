# Flight API

## Visão Geral

O **Flight API** é uma aplicação de backend desenvolvida em Node.js utilizando o framework [Hono](https://hono.dev/) e a biblioteca [drizzle-orm](https://orm.drizzle.team/) para integração com banco de dados MySQL. A API oferece endpoints para o gerenciamento completo de passageiros, voos, aeronaves, cartões de embarque (boarding passes) e usuários do sistema. É ideal para sistemas de reservas ou operações aeroportuárias.

---

## Funcionalidades

- **Passageiros:** CRUD de passageiros.
- **Voos:** CRUD de voos.
- **Aeronaves:** CRUD de aeronaves.
- **Cartões de Embarque:** CRUD de boarding passes.
- **Usuários:** Cadastro, atualização e remoção de usuários do sistema.

---

## Instalação

### Pré-requisitos

- Node.js 20+
- Banco de dados MySQL
- [npm](https://www.npmjs.com/)

### Configuração do ambiente

1. Crie um arquivo `.env` na raiz do projeto com a variável `DATABASE_URL` apontando para seu banco MySQL.  
   Exemplo:
   ```
   DATABASE_URL="mysql://usuario:senha@host:porta/nome_do_banco"
   ```

   A API estará disponível em `http://localhost:3000`.

### Docker

Você pode rodar a aplicação via Docker:

```bash
docker compose up -d --build
```

---

## Endpoints

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
- `GET /boarding-passes/:id` – Detalha um cartão de embarque específico
- `POST /boarding-passes` – Cria um novo cartão de embarque
- `PUT /boarding-passes/:id` – Atualiza um cartão de embarque existente
- `DELETE /boarding-passes/:id` – Remove um cartão de embarque

### Usuários (`/users`)
- `POST /users` – Cria um novo usuário
- `PUT /users/:id` – Atualiza um usuário existente
- `DELETE /users/:id` – Remove um usuário

---

## Estrutura do Projeto

```
flight_api/
├── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md
├── index.js
├── package-lock.json
├── package.json
├── .eslintrc.json
├── drizzle
├── mysql_demo_flight_db.sql
├── drizzle.config.js
├── src/
│   ├── config/
│   │   └── db/
│   │       ├── index.js
│   │       └── schema.js
│   ├── handlers/
│   │   ├── passengerHandler.js
│   │   ├── flightHandler.js
│   │   ├── aircraftHandler.js
│   │   ├── boardingPassHandler.js
│   │   └── userHandler.js
│   ├── repository/
│   │   ├── passengerRepository.js
│   │   ├── flightRepository.js
│   │   ├── aircraftRepository.js
│   │   ├── boardingPassRepository.js
│   │   └── userRepository.js
│   ├── routes/
│   │   ├── routes.js
│   ├── services/
│   │   ├── passengerService.js
│   │   ├── flightService.js
│   │   ├── aircraftService.js
│   │   ├── boardingPassService.js
│   │   └── userService.js
│   ├── middleware
│   ├── utils/
│   ├── app.js
│   └── index.js
└── ...
```

- **src/config/db/**: configuração e schema do banco de dados
- **src/handlers/**: lógica dos endpoints
- **src/repository/**: acesso aos dados no banco (camada de persistência)
- **src/services/**: lógica de negócio
- **src/routes/**: definição das rotas da API
- **src/middleware/**: middlewares para validação e autenticação
- **src/utils/**: funções utilitárias
- **index.js**: ponto de entrada da aplicação

---

## Tecnologias e Bibliotecas

- Node.js
- Hono (framework web)
- drizzle-orm (ORM MySQL)
- mysql2 (driver MySQL)
- dotenv (variáveis de ambiente)
- Docker

---

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests com sugestões de melhorias ou correções!

---

## Licença

Este projeto está sob licença MIT.

---