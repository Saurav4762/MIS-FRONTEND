import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { env } from "@shared/config/env";

export type ApiError = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};

const buildError = (error: AxiosError): ApiError => {
  const status = error.response?.status ?? 0;
  const data = error.response?.data as
    | { code?: string; message?: string; details?: unknown }
    | undefined;

  return {
    status,
    code: data?.code ?? "UNKNOWN_ERROR",
    message: data?.message ?? error.message ?? "Something went wrong",
    details: data?.details,
  };
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["x-app-env"] = env.ENV;
  return config;
};

export const http = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(onRequest);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(buildError(error)),
);
