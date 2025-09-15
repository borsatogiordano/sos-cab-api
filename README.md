# SOS Cab API

Esta é uma API REST para um sistema de gerenciamento de táxis construída com Node.js, TypeScript, Fastify e Prisma. Permite aos usuários gerenciar corridas, despesas, perfis e visualizar estatísticas do painel.

## Funcionalidades

- Autenticação de usuários com JWT
- Gerenciamento de perfis de usuários
- Rastreamento e gerenciamento de corridas
- Registro e categorização de despesas
- Estatísticas do painel com filtragem por intervalo de datas
- Role Base Access Control (USER, ADMIN)
- Validação de entrada com Zod
- Banco de dados PostgreSQL com ORM Prisma

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/borsatogiordano/sos-cab-api.git
   cd sos-cab-api
   ```

2. Instale as dependências:

   ```bash
   pnpm i
   ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` no diretório raiz com o seguinte:

   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/sos_cab_db"
   ACCESS_TOKEN_SECRET="sua-chave-secreta"
   ```

4. Configure o banco de dados:
   ```bash
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

## Uso

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O servidor será executado em `http://localhost:3000`.

## Endpoints da API

### Autenticação

- `POST /api/login` - Login do usuário

### Usuários

- `POST /api/users` - Criar usuário
- `GET /api/users` - Obter todos os usuários (paginado)
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id/email` - Alterar e-mail do usuário
- `DELETE /api/users/:id` - Excluir usuário (apenas admin)

### Perfis

- `POST /api/create-profile` - Criar perfil
- `PUT /api/update-profile/:userId` - Atualizar perfil

### Corridas

- `POST /api/rides` - Criar corrida
- `GET /api/rides` - Obter corridas do usuário (paginado)
- `GET /api/rides/:id` - Obter corrida por ID
- `PUT /api/rides/:id` - Atualizar corrida
- `DELETE /api/rides/:id` - Excluir corrida

### Despesas

- `POST /api/expenses` - Criar despesa
- `GET /api/expenses` - Obter despesas do usuário (paginado)
- `GET /api/expenses/:expenseId` - Obter despesa por ID
- `PUT /api/expenses/:expenseId` - Atualizar despesa
- `DELETE /api/expenses/:expenseId` - Excluir despesa

### Estatísticas

- `GET /api/stats` - Obter estatísticas do painel

Todos os endpoints, exceto login, requerem autenticação JWT via cabeçalho `Authorization: Bearer <token>`.

## Variáveis de Ambiente

- `DATABASE_URL`: String de conexão PostgreSQL
- `ACCESS_TOKEN_SECRET`: Chave secreta para assinatura JWT

## Banco de Dados

O projeto usa Prisma com PostgreSQL. Os modelos incluem:

- User
- Profile
- Ride
- Expense

Execute migrações com `pnpm prisma migrate dev`.

## Scripts

- `pnpm run dev`: Iniciar servidor de desenvolvimento com recarregamento automático
- `pnpm prisma migrate dev`: Executar migrações do banco de dados
- `pnpm prisma generate`: Gerar cliente Prisma

## Estrutura do Projeto

- `src/controllers/`: Manipuladores de requisições
- `src/services/`: Lógica de negócio
- `src/repositories/`: Camada de acesso a dados
- `src/routes/`: Definições de rotas
- `src/schemas/`: Esquemas de validação Zod
- `src/middlewares/`: Middleware de autenticação
- `prisma/`: Schema e migrações do banco de dados
