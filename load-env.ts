import dotenv from "dotenv";
import path from "path";
import fs from "fs";

/**
 * Load environment variables based on BRAND environment variable
 * Usage: BRAND=brand1 npm run dev or NEXT_PUBLIC_BRAND=brand1 npm run dev
 *
 * For Vercel: Set NEXT_PUBLIC_BRAND directly in environment variables
 */
export function loadBrandEnv() {
  // Check if NEXT_PUBLIC_BRAND is already set
  // If not, use BRAND env var (for local development)
  const brand = process.env.NEXT_PUBLIC_BRAND || process.env.BRAND;

  if (!brand) {
    throw new Error("❌ BRAND environment variable is required!");
  }

  // Ensure NEXT_PUBLIC_BRAND is set for client-side access
  if (!process.env.NEXT_PUBLIC_BRAND) {
    process.env.NEXT_PUBLIC_BRAND = brand;
  }

  const envFile = `.env.${brand}`;
  const envPath = path.resolve(process.cwd(), envFile);

  // Check if brand-specific env file exists
  if (fs.existsSync(envPath)) {
    console.log(`✅ Loading environment for: ${brand} (${envFile})`);
    const result = dotenv.config({ path: envPath });

    if (result.error) {
      console.error(`❌ Error loading ${envFile}:`, result.error);
    } else {
      console.log(`✅ Successfully loaded ${envFile}`);
    }
  } else {
    console.warn(
      `⚠️  Warning: ${envFile} not found. Using default environment variables.`
    );
  }

  // Validate required variables
  const requiredVars = [
    "NEXT_PUBLIC_WORDPRESS_API_URL",
    "WC_CONSUMER_KEY",
    "WC_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
  ];

  const missingVars = requiredVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.warn(`⚠️  Warning: Missing environment variables for ${brand}:`);
    missingVars.forEach((v) => console.warn(`   - ${v}`));
  }
}
