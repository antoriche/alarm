import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "aws-amplify";
import { shouldSkipAuth } from "../App";

const getAPI = async (config: AxiosRequestConfig = {}) => {
  let token = "";
  if (!shouldSkipAuth) {
    const session = await Auth.currentSession();
    token = session.getIdToken().getJwtToken();
  }
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
      ...(config.headers || {}),
    },
  });
};

export default getAPI;
