# CursinhoFEAUSP Client — Painel Gerencial

## O que é este projeto

Painel administrativo web do Cursinho FEA USP. Permite que admins gerenciem inscrições de alunos, cursos (turmas), doações, cupons de desconto e usuários administradores. É a interface interna do sistema — não é pública.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Chakra UI v2** — todo o sistema de design; tema customizado em `src/styles/theme.ts`
- **React Router DOM v6** — roteamento SPA com rotas protegidas
- **Axios** — client HTTP com interceptor para refresh automático de token JWT
- **React Hook Form + Yup** — formulários com validação por schema
- **Context API + useReducer** — estado global no padrão semelhante ao Redux

## Estrutura de pastas

```
src/
├── components/       # Componentes reutilizáveis (Button, Input, Pagination, Nav, etc.)
├── hooks/            # Contextos globais + reducers
│   ├── auth.tsx      # Contexto de autenticação
│   ├── users.tsx     # CRUD de admins
│   ├── courses.tsx   # CRUD de turmas
│   ├── donations.tsx # CRUD de doações
│   ├── subscriptions.tsx # Inscrições de alunos
│   ├── index.tsx     # AppProvider que compõe todos os contextos
│   └── reducers/     # Actions + reducers por entidade
├── interfaces/       # Interfaces TypeScript (User, Course, Student, Donation)
├── layouts/          # DefaultLayout (sidebar + outlet) e PageLayout
├── pages/            # Páginas por feature
├── routes/           # Router.tsx (definição de rotas) + Route.tsx (guard privado)
├── services/         # api.ts — instância Axios configurada
├── styles/           # theme.ts
└── utils/            # Formatação de CPF, CEP, telefone, etc.
```

## Autenticação

- JWT armazenado em `localStorage` com chave `@cursinhoApp:token`
- Refresh token em `@cursinhoApp:refreshToken`
- Usuário serializado em `@cursinhoApp:user`
- O interceptor em `src/services/api.ts` captura 401 com mensagem "Token is invalid", faz `POST /refresh-token/` automaticamente, re-enfileira as requisições e as retenta com o novo token
- Se o refresh token for inválido, chama `signOut()` e redireciona para `/`
- Flag `isRefreshing` evita múltiplas chamadas simultâneas de refresh

## Roteamento

Rotas definidas em `src/routes/Router.tsx`. O componente `Route` em `src/routes/Route.tsx` faz o guard:

| Rota | Componente | Auth |
|------|-----------|------|
| `/` | SignIn | Pública (redireciona para `/inscricoes` se já logado) |
| `/inscricoes` | Subscriptions | Privada |
| `/inscricoes/:id` | ViewStudent | Privada |
| `/usuarios` | Users | Privada |
| `/cursos` | Courses | Privada |
| `/cursos/:id` | ViewCourse | Privada |
| `/doacoes` | Donations | Privada |
| `/doacoes/:id` | ViewDonation | Privada |
| `/cupons` | Coupons | Privada |

## Padrão de estado (Context + useReducer)

Cada entidade segue o mesmo padrão:

1. `hooks/reducers/{entity}/actions.ts` — enum de action types + action creators
2. `hooks/reducers/{entity}/reducer.ts` — reducer puro
3. `hooks/{entity}.tsx` — Context Provider com estado, chamadas à API e dispatch
4. Componentes consomem via hook `use{Entity}()` exportado pelo contexto

Estado típico por entidade:
```typescript
{ items: T[], page: number, total: number, registersPerPage: number }
```

## API

- Variável de ambiente: `VITE_APP_API_URL` (ex: `http://localhost:8081`)
- Configurado em `src/services/api.ts`
- Todas as rotas privadas enviam `Authorization: Bearer <token>` automaticamente

Principais endpoints consumidos:
- `POST /admins/login` — login
- `GET /admins` — lista admins
- `GET /students` — lista alunos (suporta filtros: CPF, email, nome, status de pagamento)
- `GET /students/excel` — exporta alunos filtrados como Excel
- `GET /schoolClass` — lista turmas
- `GET /donates` — lista doações (filtros similares a students)
- `GET /donates/excel` — exporta doações
- `GET /coupons` — lista cupons

## Padrões de componente

- **Modais**: usam `useDisclosure()` do Chakra; ex: `CreateUserModal`, `DeleteUserModal`
- **Tabelas com paginação**: tamanho de página responsivo (8 mobile, 12 desktop)
- **Filtros**: um componente por campo (`CpfFilter`, `EmailFilter`, etc.)
- **Exportação Excel**: resposta `blob` → cria URL → `<a>` dinâmico para download
- **Editable**: edição inline (clique para editar, blur/enter para salvar)
- **Skeletons**: loading state nas tabelas durante fetch

## Utilitários

`src/utils/` contém:
- `cpfUtils.ts` — formatar/validar CPF
- `cepUtils.ts` — formatar/parsear CEP
- `formatPhone.ts` — formatação de telefone
- `getPeriodOfDay.tsx` — retorna `'dia'`/`'tarde'`/`'noite'`
- `isEmptyObject.ts` — check de objeto vazio

## Variáveis de ambiente

```
VITE_APP_API_URL=http://localhost:8081
VITE_APP_URL=http://localhost:5173
```

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # tsc + vite build
npm run lint     # ESLint
npm run preview  # Preview do build
```

## Convenções

- Componentes em PascalCase dentro de pastas próprias com `index.tsx`
- Hooks nomeados `use{Entity}` retornam o contexto tipado ou lançam erro se fora do Provider
- Formulários sempre usam React Hook Form + Yup schema em arquivo separado (ex: `createCourseSchema.ts`)
- Cores do tema: fundo `gray.50`, botões amarelos, acentos azuis
