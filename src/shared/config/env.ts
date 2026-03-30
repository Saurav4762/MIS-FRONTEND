// All VITE_ vars come from import.meta.env
// We validate them at startup so the app crashes early
// with a clear message instead of silently failing later

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  console.log(value);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  APP_NAME: getEnvVar("VITE_APP_NAME"),
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL"),
  ENV: getEnvVar("VITE_ENV"),

  // Derived helpers (no validation needed)
  isDevelopment: import.meta.env.VITE_ENV === "development",
  isStaging: import.meta.env.VITE_ENV === "staging",
  isProduction: import.meta.env.VITE_ENV === "production",
} as const;
