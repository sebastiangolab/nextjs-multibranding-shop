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
  config: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const url = axios.getUri(config);
  const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url;

  // Build query params
  const params = new URLSearchParams(config.params);
  const urlWithParams = params.toString() ? `${fullUrl}?${params}` : fullUrl;

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

  const response = await fetch(urlWithParams, fetchOptions);

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
