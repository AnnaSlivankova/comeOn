interface ImportMetaEnv {
  VITE_API_URL: string; // добавьте другие переменные окружения по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}