import axios, { CreateAxiosDefaults } from "axios";

const axiosOptions: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(axiosOptions);

export const qidInterceptor = (qid?: string) => {
  apiClient.interceptors.request.use(
    async (config) => {
      if (qid) config.headers["Authorization"] = `Bearer ${qid}`;
      return config;
    },
    (err) => Promise.reject(err)
  );
};
