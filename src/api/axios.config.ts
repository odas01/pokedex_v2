import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

axiosConfig.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default axiosConfig;
