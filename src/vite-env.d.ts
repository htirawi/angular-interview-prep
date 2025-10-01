/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
