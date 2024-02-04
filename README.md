# E-Shop

## 🌍 About the app

E-Commerce using NextJs - Tailwind- Zustand

## 🔧 Run it yourself

1. Create a copy of `.env.tempalte`, renamte it to `.env` and change the environment variables.

2. Install dependencies:

```bash
npm install
```

3. Building up the database

```bash
docker-compose up -d
```

4. Execute seed

```bash
npm run seed
```

5. Run migrations of Prisma

```bash
npx prisma migrate dev
```

6. Then run:

```bash
npm run dev
```

## Stack

- React
- NextJs
- Tailwind
- Prisma
- Docker
- PostgreSQL
