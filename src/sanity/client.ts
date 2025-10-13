import { createClient } from "next-sanity";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true, // ✅ Usar CDN para evitar CORS y mejorar performance
  // token: import.meta.env.VITE_SANITY_API_TOKEN, // Solo si necesitas datos privados
});
