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
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

  if (isServerless) {
    // In serverless environments, env vars are injected by the platform
    console.log("✅ [SERVERLESS MODE] Using platform-injected environment variables");
    
    if (!process.env.NEXT_PUBLIC_BRAND) {
      console.warn("⚠️  Warning: NEXT_PUBLIC_BRAND not set in serverless environment");
    }
    
    envLoaded = true;
    return;
  }

  // First, load main .env file to get NEXT_PUBLIC_DEVELOPMENT_MODE
  const mainEnvPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(mainEnvPath)) {
    dotenv.config({
      path: mainEnvPath,
      override: false,
    });
  }

  // Check if we're in development mode
  const isDevelopmentMode = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "true";

  if (isDevelopmentMode) {
    // Development mode: load brand-specific .env files
    const brand = process.env.NEXT_PUBLIC_BRAND || process.env.BRAND;

    if (!brand) {
      throw new Error(
        "❌ BRAND environment variable is required in development mode!"
      );
    }

    // Ensure NEXT_PUBLIC_BRAND is set for client-side access
    if (!process.env.NEXT_PUBLIC_BRAND) {
      process.env.NEXT_PUBLIC_BRAND = brand;
    }

    const envFile = `.env.${brand}`;
    const envPath = path.resolve(process.cwd(), envFile);

    // Check if brand-specific env file exists
    if (fs.existsSync(envPath)) {
      console.log(
        `✅ [DEV MODE] Loading environment for: ${brand} (${envFile})`
      );

      const result = dotenv.config({
        path: envPath,
        override: false, // Don't override existing env vars
      });

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
  } else {
    // Production mode: use main .env file only (if it exists)
    console.log("✅ [PRODUCTION MODE] Using environment variables");

    // In production, NEXT_PUBLIC_BRAND should be set via platform or .env
    if (!process.env.NEXT_PUBLIC_BRAND) {
      console.warn(
        "⚠️  Warning: NEXT_PUBLIC_BRAND not set. Please set it in your deployment platform."
      );
    }
  }

  // Mark as loaded
  envLoaded = true;
}
