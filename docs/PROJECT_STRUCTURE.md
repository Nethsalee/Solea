# Project Structure

This document describes the folder and file structure of the SOLEA e-commerce platform.

## Root Directory

```
E Commerce/
├── .git/                      # Git version control
├── .next/                     # Next.js build output (auto-generated)
├── node_modules/              # Dependencies (auto-generated)
├── app/                       # Next.js App Router pages
├── components/                # Reusable React components
├── data/                      # Static data and mock data
├── docs/                      # Documentation files
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions and libraries
├── public/                    # Static assets
├── types/                     # TypeScript type definitions
├── .env.local.example         # Environment variables template
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore rules
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # Project license
├── middleware.ts             # Next.js middleware
├── next.config.js            # Next.js configuration
├── next-env.d.ts             # Next.js TypeScript definitions
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project overview
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## App Directory (`/app`)

Next.js 13+ App Router pages and layouts.

```
app/
├── api/                      # API routes
│   ├── products/
│   │   └── route.ts         # Products API endpoint
│   └── newsletter/
│       └── route.ts         # Newsletter subscription API
├── men/
│   └── page.tsx             # Men's collection page
├── product/
│   └── [id]/
│       └── page.tsx         # Dynamic product detail page
├── shop/
│   └── page.tsx             # Shop/catalog page
├── women/
│   └── page.tsx             # Women's collection page
├── globals.css              # Global styles
├── layout.tsx               # Root layout with header/footer
└── page.tsx                 # Homepage
```

## Components Directory (`/components`)

Reusable React components.

```
components/
├── Footer.tsx               # Site footer
├── Header.tsx               # Site header/navigation
└── ProductCard.tsx          # Product card component
```

## Data Directory (`/data`)

Static data and mock data for the application.

```
data/
└── products.ts              # Product data and helper functions
```

## Docs Directory (`/docs`)

Project documentation.

```
docs/
├── API.md                   # API documentation
├── DEPLOYMENT.md            # Deployment guide
└── PROJECT_STRUCTURE.md     # This file
```

## Hooks Directory (`/hooks`)

Custom React hooks for shared logic.

```
hooks/
├── useCart.ts               # Shopping cart management
└── useWishlist.ts           # Wishlist management
```

## Lib Directory (`/lib`)

Utility functions and shared libraries.

```
lib/
├── constants.ts             # Application constants
└── utils.ts                 # Utility functions
```

## Public Directory (`/public`)

Static assets served directly.

```
public/
├── manifest.json            # PWA manifest
├── robots.txt               # SEO robots file
└── sitemap.xml              # SEO sitemap
```

## Types Directory (`/types`)

TypeScript type definitions.

```
types/
└── index.ts                 # All type definitions
```

## Key Files

### Configuration Files

- **`next.config.js`**: Next.js configuration (image domains, redirects, etc.)
- **`tailwind.config.ts`**: Tailwind CSS customization (colors, fonts, plugins)
- **`tsconfig.json`**: TypeScript compiler options
- **`postcss.config.js`**: PostCSS plugins (Tailwind, Autoprefixer)
- **`.eslintrc.json`**: Linting rules
- **`.prettierrc`**: Code formatting rules
- **`middleware.ts`**: Next.js middleware for security headers

### Documentation

- **`README.md`**: Project overview and getting started
- **`CONTRIBUTING.md`**: Guidelines for contributors
- **`CHANGELOG.md`**: Version history
- **`LICENSE`**: Project license (ISC)

### Environment

- **`.env.local.example`**: Template for environment variables
- **`.env.local`**: Local environment variables (not in git)
- **`.gitignore`**: Files to exclude from git

## Adding New Features

### New Page

1. Create a new folder in `app/` with the route name
2. Add `page.tsx` inside the folder
3. Import and use components as needed

Example:
```
app/
└── about/
    └── page.tsx
```

### New Component

1. Create a new file in `components/`
2. Export the component as default
3. Import where needed

Example:
```typescript
// components/Button.tsx
export default function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
```

### New API Route

1. Create folder structure in `app/api/`
2. Add `route.ts` file
3. Export GET, POST, etc. functions

Example:
```typescript
// app/api/products/route.ts
export async function GET(request: Request) {
  return Response.json({ data: [] });
}
```

### New Hook

1. Create file in `hooks/` with `use` prefix
2. Export the hook function

Example:
```typescript
// hooks/useProducts.ts
export function useProducts() {
  // hook logic
  return { products };
}
```

### New Utility Function

1. Add function to `lib/utils.ts`
2. Export the function

Example:
```typescript
// lib/utils.ts
export function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

## Best Practices

- **Components**: Keep them small, focused, and reusable
- **Types**: Define interfaces for all props and data structures
- **Utilities**: Extract repeated logic into utility functions
- **Constants**: Store magic numbers and strings in constants file
- **Hooks**: Use custom hooks for complex state logic
- **API Routes**: Keep business logic in separate services
- **Styling**: Use Tailwind utility classes for consistency

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test locally: `npm run dev`
4. Check types: `npm run type-check`
5. Format code: `npm run format`
6. Lint code: `npm run lint`
7. Build: `npm run build`
8. Commit and push
9. Create pull request
