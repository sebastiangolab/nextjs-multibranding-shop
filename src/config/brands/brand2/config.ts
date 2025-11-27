import { BrandConfig } from "../types";

export const brand2Config: BrandConfig = {
  shopName: "Flowers Shop",
  availableThemeToggle: true,

  contact: {
    email: "flowershop@test.com",
    phone: "+48 123 123 123",
  },

  wooCommerceSettings: {
    deliveryZoneId: 2,
  },

  themeCss: `
:root {
  --background: #fff8f0;
  --foreground: #1c1e1d;
  --card: #ffffff;
  --card-foreground: #1c1e1d;
  --popover: #ffffff;
  --popover-foreground: #1c1e1d;
  --primary: #88b04b;
  --primary-foreground: #ffffff;
  --secondary: #f1e3cd;
  --secondary-foreground: #1c1e1d;
  --muted: #f5f5f5;
  --muted-foreground: #6b7280;
  --accent: #e6f0da;
  --accent-foreground: #1c1e1d;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #878787;
  --input: #3b3b3b;
  --ring: #aecf77;
  --chart-1: #88b04b;
  --chart-2: #f0a500;
  --chart-3: #e15b63;
  --chart-4: #5d9b9b;
  --chart-5: #d1b6e1;
  --sidebar: #fffbf5;
  --sidebar-foreground: #1c1e1d;
  --sidebar-primary: #88b04b;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e6f0da;
  --sidebar-accent-foreground: #1c1e1d;
  --sidebar-border: #e0e0e0;
  --sidebar-ring: #aecf77;
  --font-sans: var(--font-lora), 'Georgia', serif;
  --font-serif: var(--font-playfair), 'Georgia', serif;
  --font-mono: var(--font-fira-code), 'Courier New', monospace;
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 4px;
  --shadow-blur: 10px;
  --shadow-spread: -2px;
  --shadow-opacity: 0.1;
  --shadow-color: #708090;
  --shadow-2xs: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.05);
  --shadow-xs: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.05);
  --shadow-sm: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.10), 0px 1px 2px -3px hsl(210 12.5984% 50.1961% / 0.10);
  --shadow: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.10), 0px 1px 2px -3px hsl(210 12.5984% 50.1961% / 0.10);
  --shadow-md: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.10), 0px 2px 4px -3px hsl(210 12.5984% 50.1961% / 0.10);
  --shadow-lg: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.10), 0px 4px 6px -3px hsl(210 12.5984% 50.1961% / 0.10);
  --shadow-xl: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.10), 0px 8px 10px -3px hsl(210 12.5984% 50.1961% / 0.10);
  --shadow-2xl: 0px 4px 10px -2px hsl(210 12.5984% 50.1961% / 0.25);
  --tracking-normal: 0.01em;
  --spacing: 0.25rem;
}

.dark {
  --background: #1e201e;
  --foreground: #e0e2df;
  --card: #282a28;
  --card-foreground: #e0e2df;
  --popover: #282a28;
  --popover-foreground: #e0e2df;
  --primary: #aecf77;
  --primary-foreground: #1e201e;
  --secondary: #3e3f3b;
  --secondary-foreground: #e0e2df;
  --muted: #323432;
  --muted-foreground: #9ca3af;
  --accent: #4a5b37;
  --accent-foreground: #e0e2df;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #595959;
  --input: #595959;
  --ring: #d0e59d;
  --chart-1: #aecf77;
  --chart-2: #ffc300;
  --chart-3: #f27981;
  --chart-4: #7abdbe;
  --chart-5: #e1cff0;
  --sidebar: #242624;
  --sidebar-foreground: #e0e2df;
  --sidebar-primary: #aecf77;
  --sidebar-primary-foreground: #1e201e;
  --sidebar-accent: #4a5b37;
  --sidebar-accent-foreground: #e0e2df;
  --sidebar-border: #3a3c3a;
  --sidebar-ring: #d0e59d;
  --font-sans: var(--font-lora), 'Georgia', serif;
  --font-serif: var(--font-playfair), 'Georgia', serif;
  --font-mono: var(--font-fira-code), 'Courier New', monospace;
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 6px;
  --shadow-blur: 15px;
  --shadow-spread: -3px;
  --shadow-opacity: 0.3;
  --shadow-color: #000000;
  --shadow-2xs: 0px 6px 15px -3px hsl(0 0% 0% / 0.15);
  --shadow-xs: 0px 6px 15px -3px hsl(0 0% 0% / 0.15);
  --shadow-sm: 0px 6px 15px -3px hsl(0 0% 0% / 0.30), 0px 1px 2px -4px hsl(0 0% 0% / 0.30);
  --shadow: 0px 6px 15px -3px hsl(0 0% 0% / 0.30), 0px 1px 2px -4px hsl(0 0% 0% / 0.30);
  --shadow-md: 0px 6px 15px -3px hsl(0 0% 0% / 0.30), 0px 2px 4px -4px hsl(0 0% 0% / 0.30);
  --shadow-lg: 0px 6px 15px -3px hsl(0 0% 0% / 0.30), 0px 4px 6px -4px hsl(0 0% 0% / 0.30);
  --shadow-xl: 0px 6px 15px -3px hsl(0 0% 0% / 0.30), 0px 8px 10px -4px hsl(0 0% 0% / 0.30);
  --shadow-2xl: 0px 6px 15px -3px hsl(0 0% 0% / 0.75);
}
  `,
};
