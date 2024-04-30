import axios, { AxiosRequestConfig } from "axios";

const getAPI = async (config: AxiosRequestConfig = {}) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...config,
    headers: {
      "Content-Type": "application/json",
      //Authorization: token && `Bearer ${token}`,
      ...(config.headers || {}),
    },
  });
};

export default getAPI;
