import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Global flag to prevent multiple loads
let envLoaded = false;

/**
 * Load environment variables based on BRAND environment variable
 * Usage: BRAND=brand1 npm run dev or NEXT_PUBLIC_BRAND=brand1 npm run dev
 *
 * For Vercel: Set NEXT_PUBLIC_BRAND directly in environment variables
 */
export function loadBrandEnv() {
  // Skip if already loaded
  if (envLoaded) {
    return;
  }

  // Check if we're in a serverless environment (Vercel, etc.)
  const isServerless =
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

  if (isServerless) {
    // In serverless environments, env vars are injected by the platform
    console.log(
      "✅ [SERVERLESS MODE] Using platform-injected environment variables"
    );

    if (!process.env.NEXT_PUBLIC_BRAND) {
      console.warn(
        "⚠️  Warning: NEXT_PUBLIC_BRAND not set in serverless environment"
      );
    }

    envLoaded = true;
    return;
  }

  // First, try to load main .env file
  const mainEnvPath = path.resolve(process.cwd(), ".env");

  if (fs.existsSync(mainEnvPath)) {
    dotenv.config({
      path: mainEnvPath,
      override: false,
    });

    console.log("✅ Using .env file");
  } else {
    // If .env doesn't exist, load brand-specific .env file
    const brand = process.env.BRAND;
    const brandEnvPath = path.resolve(process.cwd(), `.env.${brand}`);

    if (!brand) {
      console.warn("⚠️  Warning: BRAND environment variable is not set");
      return;
    }

    if (fs.existsSync(brandEnvPath)) {
      console.log(`✅ Loading environment for: ${brand} (.env.${brand})`);

      dotenv.config({
        path: brandEnvPath,
        override: false,
      });

      console.log(`✅ Successfully loaded .env.${brand}`);
    } else {
      console.warn(`⚠️  Warning: Neither .env nor .env.${brand} found`);
    }
  }

  // Mark as loaded
  envLoaded = true;
}
