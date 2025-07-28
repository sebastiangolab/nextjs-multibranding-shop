import axios from "axios";

export const axiosWpApi = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/wp/v2`,
  params: {
    acf_format: "standard",
    _embed: true,
  },
});

export const axiosWpCustomApi = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/custom/v1`,
  params: {
    acf_format: "standard",
    _embed: true,
  },
});
