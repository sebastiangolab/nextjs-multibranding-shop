import { BrandConfig } from "../types";

export const brand1Config: BrandConfig = {
  shopName: "Toy Store",
  availableThemeToggle: true,

  contact: {
    email: "toystore@test.com",
    phone: "+48 123 123 123",
  },

  wooCommerceSettings: {
    deliveryZoneId: 2,
  },

  themeCss: `
    :root {
      --background: #ffffff;
      --foreground: #0f172a;
      --card: #ffffff;
      --card-foreground: #0f172a;
      --popover: #ffffff;
      --popover-foreground: #0f172a;
      --primary: #f25a6c;
      --primary-foreground: #fafafa;
      --secondary: #f1f5f9;
      --secondary-foreground: #0f172a;
      --muted: #f1f5f9;
      --muted-foreground: #64748b;
      --accent: #f1f5f9;
      --accent-foreground: #0f172a;
      --destructive: #ef4444;
      --destructive-foreground: #fafafa;
      --border: #787878;
      --input: #787878;
      --ring: #f25a6c;
      --chart-1: #f25a6c;
      --chart-2: #ffe14d;
      --chart-3: #5281e0;
      --chart-4: #52e099;
      --chart-5: #bb67e4;
      --sidebar: #fff8f5;
      --sidebar-foreground: #0f172a;
      --sidebar-primary: #f25a6c;
      --sidebar-primary-foreground: #fafafa;
      --sidebar-accent: #f1f5f9;
      --sidebar-accent-foreground: #0f172a;
      --sidebar-border: #e2e8f0;
      --sidebar-ring: #f25a6c;
      --font-sans: 'Comic Sans MS', cursive, sans-serif;
      --font-serif: 'Georgia', serif;
      --font-mono: 'Fira Code', monospace;
      --radius: 0.75rem;
      --shadow-x: 0px;
      --shadow-y: 0.5rem;
      --shadow-blur: 1rem;
      --shadow-spread: 0.25rem;
      --shadow-opacity: 0.1;
      --shadow-color: hsl(220 30% 20%);
      --shadow-2xs: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.05);
      --shadow-xs: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.05);
      --shadow-sm: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.10), 0px 1px 2px -0.75px hsl(220 30% 20% / 0.10);
      --shadow: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.10), 0px 1px 2px -0.75px hsl(220 30% 20% / 0.10);
      --shadow-md: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.10), 0px 2px 4px -0.75px hsl(220 30% 20% / 0.10);
      --shadow-lg: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.10), 0px 4px 6px -0.75px hsl(220 30% 20% / 0.10);
      --shadow-xl: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.10), 0px 8px 10px -0.75px hsl(220 30% 20% / 0.10);
      --shadow-2xl: 0px 0.5rem 1rem 0.25rem hsl(220 30% 20% / 0.25);
      --tracking-normal: 0em;
      --spacing: 0.25rem;
    }

    .dark {
      --background: #0f172a;
      --foreground: #f1f5f9;
      --card: #0f172a;
      --card-foreground: #f1f5f9;
      --popover: #0f172a;
      --popover-foreground: #f1f5f9;
      --primary: #ec939d;
      --primary-foreground: #0f172a;
      --secondary: #1e293b;
      --secondary-foreground: #f1f5f9;
      --muted: #1e293b;
      --muted-foreground: #94a3b8;
      --accent: #1e293b;
      --accent-foreground: #f1f5f9;
      --destructive: #c10007;
      --destructive-foreground: #f1f5f9;
      --border: #404040;
      --input: #7d7d7d;
      --ring: #ec939d;
      --chart-1: #ec939d;
      --chart-2: #e8d67d;
      --chart-3: #8ca6d9;
      --chart-4: #8cd9b3;
      --chart-5: #ca9fdf;
      --sidebar: #172636;
      --sidebar-foreground: #f1f5f9;
      --sidebar-primary: #ec939d;
      --sidebar-primary-foreground: #0f172a;
      --sidebar-accent: #1e293b;
      --sidebar-accent-foreground: #f1f5f9;
      --sidebar-border: #1e293b;
      --sidebar-ring: #ec939d;
      --font-sans: 'Comic Sans MS', cursive, sans-serif;
      --font-serif: 'Georgia', serif;
      --font-mono: 'Fira Code', monospace;
      --radius: 0.75rem;
      --shadow-x: 0px;
      --shadow-y: 0.5rem;
      --shadow-blur: 1rem;
      --shadow-spread: 0.25rem;
      --shadow-opacity: 0.4;
      --shadow-color: hsl(220 30% 5%);
      --shadow-2xs: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.20);
      --shadow-xs: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.20);
      --shadow-sm: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.40), 0px 1px 2px -0.75px hsl(220 30% 5% / 0.40);
      --shadow: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.40), 0px 1px 2px -0.75px hsl(220 30% 5% / 0.40);
      --shadow-md: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.40), 0px 2px 4px -0.75px hsl(220 30% 5% / 0.40);
      --shadow-lg: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.40), 0px 4px 6px -0.75px hsl(220 30% 5% / 0.40);
      --shadow-xl: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 0.40), 0px 8px 10px -0.75px hsl(220 30% 5% / 0.40);
      --shadow-2xl: 0px 0.5rem 1rem 0.25rem hsl(220 30% 5% / 1.00);
    }
`,
};
