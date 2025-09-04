import axios from "axios";

export const axiosWpAcfApi = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/wp/v2`,
});

export const axiosWpCustomApi = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/custom/v1`,
  params: {
    acf_format: "standard",
    _embed: true,
  },
});

export const axiosWCApi = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/wc/v3`,
  params: {
    consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumer_secret: process.env.WOOCOMMERCE_SECRET_KEY,
  },
});