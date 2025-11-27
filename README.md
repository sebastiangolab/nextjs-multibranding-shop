<!-- ABOUT THE PROJECT -->

## About The Project

Next.js e-commerce boilerplate with **Multi-Branding Support**. Build multiple shops with different brands, domains, WordPress backends, and themes - all in one application.

### Features

- 🎨 **Multi-Branding System** - Multiple stores with separate configurations
- 🌐 **Multi-Domain Support** - Each brand can have its own domain(s)
- 🎯 **WordPress/WooCommerce Integration** - Separate API keys per brand
- 🖌️ **Dynamic Theming** - Each brand has its own shadcn/ui theme
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Performance Optimized** - Built with Next.js 15

### Quick Start with Multi-Branding

See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide!

### Documentation

- 📘 [Multi-Branding Guide](./MULTI_BRANDING_GUIDE.md) - Complete documentation
- 📝 [Usage Examples](./MULTI_BRANDING_EXAMPLES.md) - Real-world examples
- 🔄 [Migration Guide](./MIGRATION_EXAMPLE.tsx) - How to migrate existing code

### Project Link

link

<!-- BUILD WITH -->

## Build With

<ul>
  <li>React 18</li>
  <li>Next.js 15</li>
  <li>TypeScript</li>
  <li>Tailwind CSS</li>
  <li>shadcn/ui</li>
  <li>WordPress/WooCommerce API</li>
</ul>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

- node - https://nodejs.org/en/download/

### Installation

1. Clone the repo
   ```sh
   git clone xxx
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

3. Configure your brand environment

   ```sh
   # Copy the example file for your brand
   cp .env.brand1.example .env.brand1

   # Edit .env.brand1 and add your WordPress/WooCommerce & Stripe keys
   # See ENV_CONFIGURATION_GUIDE.md for details
   ```

4. Start app in local

   ```sh
   # Brand 1 (port 3000)
   npm run dev:brand1

   # Brand 2 (port 3001)
   npm run dev:brand2
   ```

5. Open [http://localhost:3000](http://localhost:3000) (Brand 1) or [http://localhost:3001](http://localhost:3001) (Brand 2)

### Multi-Branding Setup

1. **Create separate .env files** for each brand:

   ```sh
   cp .env.brand1.example .env.brand1
   cp .env.brand2.example .env.brand2
   ```

2. **Add environment variables** in `.env.brand1`:

   ```env
   WC_CONSUMER_KEY=ck_your_key
   WC_SECRET_KEY=cs_your_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

   > 💡 **Note**: Each brand uses the same variable names, but different values in separate `.env` files.

3. **Configure brands** in `src/config/brands/`:

   - Edit `brand1.config.ts` and `brand2.config.ts`
   - Or create new brand configs

4. **Map domains** to brands in the config files

5. **Deploy** with the `BRAND` environment variable set

See [ENV_CONFIGURATION_GUIDE.md](./ENV_CONFIGURATION_GUIDE.md) and [QUICK_START.md](./QUICK_START.md) for detailed instructions.

<!-- CONTACT -->

## Contact

Sebastian Gołąb - sebagolab97@gmail.com
