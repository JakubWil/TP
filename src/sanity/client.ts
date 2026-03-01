import { createClient, type SanityClient } from "next-sanity";

let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (_client) return _client;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  if (!projectId) throw new Error("Configuration must contain `projectId`");
  _client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: process.env.NODE_ENV === "production",
  });
  return _client;
}

export const client = {
  fetch: async <T>(query: string, params?: Record<string, unknown>): Promise<T> => {
    const c = getClient();
    return params ? c.fetch<T>(query, params as Record<string, string | number>) : c.fetch<T>(query);
  },
};
