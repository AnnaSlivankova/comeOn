interface ImportMetaEnv {
  VITE_VERCEL_API_URL: string; // добавьте другие переменные окружения по мере необходимости
  VITE_VERCEL_TESTING_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}