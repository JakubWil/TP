import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333";

function getClient(): SanityClient {
  if (!projectId) throw new Error("Configuration must contain `projectId`");
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: process.env.NODE_ENV === "production",
    stega: false,
  });
}

let _client: SanityClient | null = null;
let _previewClient: SanityClient | null = null;

function getClientCached(): SanityClient {
  if (_client) return _client;
  _client = getClient();
  return _client;
}

function getPreviewClient(): SanityClient {
  if (_previewClient) return _previewClient;
  if (!projectId) throw new Error("Configuration must contain `projectId`");
  _previewClient = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: "previewDrafts",
    stega: {
      enabled: true,
      studioUrl,
    },
  });
  return _previewClient;
}

export const client = {
  fetch: async <T>(
    query: string,
    params?: Record<string, unknown>,
    options?: { draft?: boolean }
  ): Promise<T> => {
    const c = options?.draft ? getPreviewClient() : getClientCached();
    return params
      ? c.fetch<T>(query, params as Record<string, string | number>)
      : c.fetch<T>(query);
  },
};
