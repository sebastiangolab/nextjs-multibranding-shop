# 🛍️ Next.js E-commerce Platform

Modern, high-performance headless e-commerce platform built with Next.js 15, TypeScript, and WordPress/WooCommerce backend. Features multi-brand support, optimized performance, and production-ready architecture.

## 📚 Table of Contents

- [Shop Features](#️-shop-features)
- [Project Features](#-project-features)
- [Prerequisites](#-prerequisites)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Architecture Patterns](#️-architecture-patterns)
- [UI Development Guidelines](#-ui-development-guidelines)
- [Configuration](#-configuration)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)

## 🛒 Shop Features

### 📄 Generic Pages
Dynamic content pages powered by WordPress ACF (Advanced Custom Fields). Create marketing pages, landing pages, and custom content directly from WordPress CMS with flexible page builder sections.

### 🔍 Product Search
Real-time product search with instant results, autocomplete suggestions, and advanced filtering capabilities. Powered by WooCommerce REST API for fast and accurate product discovery.

### 💳 Complete Checkout Flow
Full-featured checkout process with multiple steps:
- **Cart Management** - Add, remove, update quantities with persistent cart state (Zustand)
- **Delivery Information** - Address validation, shipping methods, delivery zones
- **Payment Processing** - Secure Stripe integration with card payments
- **Order Confirmation** - Order summary, email notifications, order tracking

### 📦 Category View with Filtering
Advanced product category browsing with:
- **Multi-level Categories** - Hierarchical category navigation
- **Product Filtering** - Filter by price, attributes, availability
- **Sorting Options** - Sort by popularity, price, rating, newest
- **Pagination** - Efficient loading of large product catalogs
- **Responsive Grid** - Mobile-optimized product grid layout

### 🛍️ Single Product View
Detailed product pages featuring:
- **Product Gallery** - Multiple images with zoom functionality
- **Variant Selection** - Choose size, color, and other attributes
- **Stock Information** - Real-time availability updates
- **Product Details** - Rich descriptions, specifications, reviews
- **Related Products** - Cross-sell and upsell recommendations
- **Add to Cart** - Quick add to cart with quantity selection

### 💰 Stripe Payment Integration
Secure payment processing with:
- **Stripe Elements** - PCI-compliant card input
- **Payment Intent API** - Secure server-side payment processing
- **Webhook Handling** - Real-time payment status updates
- **Error Handling** - User-friendly payment error messages
- **Order Synchronization** - Automatic WooCommerce order creation

### 🎨 Shadcn/ui Integration (tweakcn.com)
Modern UI components powered by [tweakcn.com](https://tweakcn.com):
- **Component Library** - Pre-built, accessible components
- **Theme System** - Customizable design tokens
- **Dark Mode Support** - Seamless theme switching
- **Responsive Design** - Mobile-first component architecture
- **Accessibility** - WCAG 2.1 compliant components

### 🌓 Light/Dark Mode Support
Complete theme switching functionality:
- **User Preference** - Persistent theme selection (localStorage)
- **System Detection** - Automatic theme based on OS preferences
- **Smooth Transitions** - Animated theme switching
- **Brand Customization** - Per-brand theme configurations
- **CSS Variables** - Theme tokens for consistent styling

### 🏢 Multi-Brand Support
Run multiple storefronts from a single codebase:
- **Brand Configuration** - Separate config files per brand (`brand1/config.ts`, `brand2/config.ts`)
- **Environment Variables** - Brand-specific `.env` files (`.env.brand1`, `.env.brand2`)
- **Theme Customization** - Independent Shadcn themes per brand
- **Shared Codebase** - Single source of truth with brand-specific overrides

### 🔎 SEO Optimization
Enterprise-level SEO implementation

## 🚀 Project Features

- **Multi-Brand Support** - Configure and run multiple brand storefronts from a single codebase
- **Headless CMS** - WordPress with WooCommerce as backend API
- **Modern Stack** - Next.js 15, React 18, TypeScript, Tailwind CSS 4
- **UI Components** - Shadcn/ui component library with Radix UI primitives
- **Payment Integration** - Stripe payment processing
- **State Management** - Zustand for global state, TanStack Query for server state
- **Form Handling** - React Hook Form with Zod validation
- **Optimized Performance** - Server Components, dynamic imports, image optimization
- **Type Safety** - Full TypeScript coverage with strict mode
- **Code Quality** - ESLint, Prettier, Husky pre-commit hooks
- **SEO Optimized** - Next.js Metadata API, structured data
- **Accessibility** - WCAG compliant, keyboard navigation, screen reader support

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- WordPress instance with WooCommerce
- Stripe account (for payments)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Shadcn/ui
- **UI Components:** Radix UI primitives
- **State Management:** Zustand, TanStack React Query
- **Forms:** React Hook Form + Zod
- **Payments:** Stripe
- **API Client:** Axios
- **CMS:** WordPress + WooCommerce (headless)
- **Development:** Turbopack, ESLint, Prettier

## 📁 Project Structure

```
shop-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (checkout)/         # Checkout flow pages
│   │   ├── (shop)/             # Shop pages
│   │   └── api/                # API routes
│   ├── config/                 # Configuration
│   │   └── brands/             # Multi-brand configs
│   ├── features/               # Business features
│   │   ├── breadcrumb/
│   │   ├── checkout/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── prices/
│   │   ├── products/
│   │   └── seo/
│   ├── shared/                 # Shared utilities
│   │   ├── components/         # Reusable components
│   │   ├── shadcn/            # Shadcn/ui components
│   │   ├── actions/           # Server actions
│   │   ├── helpers/           # Helper functions
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Libraries (axios, etc.)
│   │   └── store/             # Zustand stores
│   └── views/                  # Page views
│       ├── cart/
│       ├── category/
│       ├── delivery/
│       ├── payment/
│       └── single-product/
├── public/                     # Static assets
├── .github/                    # GitHub configuration
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd shop-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create brand-specific environment files:

**`.env.brand1`**
```env
NEXT_PUBLIC_BRAND=brand1
NEXT_PUBLIC_DEVELOPMENT_MODE=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json

WC_CONSUMER_KEY=your_woocommerce_consumer_key
WC_SECRET_KEY=your_woocommerce_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**`.env.brand2`**
```env
NEXT_PUBLIC_BRAND=brand2
NEXT_PUBLIC_DEVELOPMENT_MODE=true
NEXT_PUBLIC_SITE_URL=http://localhost:3001
# ... other environment variables
```

### 4. Configure Brands

Edit brand configurations in `src/config/brands/brand1/config.ts` and `src/config/brands/brand2/config.ts`:

```typescript
export const config: BrandConfig = {
  shopName: "Your Shop Name",
  availableThemeToggle: true,
  contact: {
    email: "contact@yourshop.com",
    phone: "+1234567890"
  },
  wooCommerceSettings: {
    deliveryZoneId: 1
  },
  themeCss: "...shadcn_theme"
};
```

### 5. Run Development Server

```bash
# Brand 1 (port 3000)
npm run dev:brand1

# Brand 2 (port 3001)
npm run dev:brand2
```

Visit:
- Brand 1: http://localhost:3000
- Brand 2: http://localhost:3001

## 📜 Available Scripts

```bash
# Development
npm run dev:brand1              # Start Brand 1 dev server (port 3000)
npm run dev:brand2              # Start Brand 2 dev server (port 3001)

# Build
npm run build:brand1            # Build Brand 1 for production
npm run build:brand2            # Build Brand 2 for production

# Production
npm run start:brand1            # Start Brand 1 production server
npm run start:brand2            # Start Brand 2 production server

# Code Quality
npm run lint                    # Run ESLint
npm run lint-fix                # Fix ESLint issues
npm run format                  # Check formatting with Prettier
npm run format:fix              # Fix formatting with Prettier
```

## 🏗️ Architecture Patterns

### Feature-Based Organization
Each feature has its own folder with components, actions, helpers, hooks, and types.

### Server Actions
Server-side logic is organized in `actions/` folders using Next.js Server Actions.

### Component Co-location
Components are stored with their related types and actions in the same folder.

### Barrel Exports
`index.ts` files are used for re-exports to improve import paths.

### Separation of Concerns
- **Features:** Can only be imported in `app/` or `views/`
- **Shared:** Can be imported everywhere
- **Imports:** Only from `index.ts` files

## 🎨 UI Development Guidelines

### Styling Rules
- ✅ Use Shadcn UI components exclusively
- ✅ Use theme-based classes (`bg-background`, `text-foreground`)
- ✅ Use layout utilities (`flex`, `grid`, `gap-*`, `p-*`)
- ❌ No raw Tailwind color utilities
- ❌ No inline styles
- ❌ No arbitrary values

## 🔧 Configuration

### Next.js Config
Multi-brand support is configured in `next.config.ts` with dynamic environment loading.

### TypeScript Config
Strict mode enabled with path aliases configured in `tsconfig.json`.

## 🔐 Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_BRAND` | Public | Brand identifier (brand1/brand2) |
| `NEXT_PUBLIC_DEVELOPMENT_MODE` | Public | Enable development features |
| `NEXT_PUBLIC_SITE_URL` | Public | Site URL |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Public | WordPress API endpoint |
| `WC_CONSUMER_KEY` | Secret | WooCommerce consumer key |
| `WC_SECRET_KEY` | Secret | WooCommerce secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Secret | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Secret | Stripe webhook secret |

## 📦 Deployment

### Build for Production

```bash
# Build specific brand
npm run build:brand1

# Start production server
npm run start:brand1
```

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables for each brand
3. Deploy

### Environment Variables on Vercel
Add all environment variables from `.env-example` in Vercel dashboard.