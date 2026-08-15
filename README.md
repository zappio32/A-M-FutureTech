# A&M FutureTech Solution Pvt Ltd

A premium IT company website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive multi-page marketing site
- Working CTA navigation and forms
- Structured content architecture for services, portfolio and careers
- API-ready form endpoints and validation layer
- Database-ready Prisma setup

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production deployment

Set environment variables in a `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_TO=info@amfuturetech.com
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
DATABASE_URL="mysql://user:pass@localhost:3306/amfuturetech"
```
