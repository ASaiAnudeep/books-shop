# Leaf & Lantern Books

Leaf & Lantern Books is a minimal ecommerce sample app for buying books, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment values:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
pnpm dev
```

## Required environment variables

- `NEXT_PUBLIC_RUDDER_WRITE_KEY`
- `NEXT_PUBLIC_RUDDER_DATA_PLANE_URL`

## Event contract

Event schemas are versioned in `analytics/schemas/*.json` and used as the contract for core storefront funnel events.

## CI checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm schema-validate
```

Or run all at once:

```bash
pnpm ci
```
