import { getBrandConfig } from "./getBrandConfig";

/**
 * Returns the complete CSS string for the current brand
 * Includes light and dark themes
 * Used in layout.tsx for inline <style> injection in <head>
 * Server-side only
 */
export function generateThemeCSS(): string {
  const fs = require("fs");
  const path = require("path");

  const brand = getBrandConfig();
  const themeCssPath = path.join(process.cwd(), brand.themeCss);
  const themeCSS = fs.readFileSync(themeCssPath, "utf-8");

  return themeCSS;
}
