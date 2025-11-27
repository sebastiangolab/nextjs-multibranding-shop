import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Next.js fetch extended type
interface NextFetchRequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// Custom fetch adapter for Next.js caching support
const fetchAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  // Build full URL with baseURL and path
  const baseURL = (config.baseURL || "").replace(/\/$/, ""); // Remove trailing slash
  const url = (config.url || "").replace(/^\//, ""); // Remove leading slash
  let fullUrl = url ? `${baseURL}/${url}` : baseURL;

  // Add query params if they exist
  if (config.params) {
    const params = new URLSearchParams();

    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();

    if (queryString) {
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  // Prepare fetch options
  const fetchOptions: NextFetchRequestConfig = {
    method: config.method?.toUpperCase() || "GET",
    headers: config.headers as Record<string, string>,
    body: config.data ? JSON.stringify(config.data) : undefined,
    // Next.js cache options - default 60s revalidation
    next: {
      revalidate: 60,
      ...(config as any).next,
    },
  };

  try {
    const response = await fetch(fullUrl, fetchOptions);

    // Check if response is ok (status in range 200-299)
    if (!response.ok) {
      const errorData = await response.text();
      console.error("🔴 HTTP Error:", response.status, errorData);

      // Throw error similar to axios behavior
      const error: any = new Error(
        `Request failed with status ${response.status}`
      );

      error.response = {
        data: errorData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        config,
      };

      throw error;
    }

    const data = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : await response.text();

    // Convert fetch Response to Axios Response format
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config,
    } as AxiosResponse;
  } catch (error) {
    console.error("🔴 Fetch adapter error:", error, fullUrl);

    throw error;
  }
};

export const axiosWpAcfApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2`,
  adapter: fetchAdapter,
});

export const axiosWpCustomApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/custom/v1`,
  params: {
    acf_format: "standard",
    _embed: true,
  },
  adapter: fetchAdapter,
});

export const axiosWcCustomApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/custom/v1`,
  adapter: fetchAdapter,
});

// Server-side only, secret keys included
export const axiosWCApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wc/v3`,
  params: {
    consumer_key: process.env.WC_CONSUMER_KEY,
    consumer_secret: process.env.WC_SECRET_KEY,
  },
  adapter: fetchAdapter,
});

export const axiosStripeApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe`,
  adapter: fetchAdapter,
});
