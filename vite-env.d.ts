declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';

interface ImportMetaEnv {
  VITE_VERCEL_API_URL: string; // добавьте другие переменные окружения по мере необходимости
  VITE_VERCEL_TESTING_API_URL: string;
  MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}