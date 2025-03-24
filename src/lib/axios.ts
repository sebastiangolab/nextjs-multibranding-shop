import axios from "axios";

export const AxiosWordpress = axios.create({
  baseURL: `${process.env.WORDPRESS_API_URL}/wp/v2`,
});
