import { client } from "@/sanity/client";
import { quoteQuery, servicesQuery, testimonialsQuery } from "@/sanity/lib/queries";

export type TestimonialItem = {
  _id: string;
  _type?: string;
  text: string;
  author: string;
  initials: string;
};

export type QuoteData = {
  _id: string;
  _type?: string;
  lines: string[];
  buttonText?: string;
  buttonHref?: string;
} | null;

export type ServiceItem = {
  _id: string;
  _type?: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string | null;
};

function hasSanityConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 0
  );
}

export async function getTestimonials(draft = false): Promise<TestimonialItem[]> {
  if (!hasSanityConfig()) return [];
  try {
    const data = await client.fetch<TestimonialItem[]>(testimonialsQuery, undefined, { draft });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getQuote(draft = false): Promise<QuoteData> {
  if (!hasSanityConfig()) return null;
  try {
    const data = await client.fetch<QuoteData>(quoteQuery, undefined, { draft });
    return data;
  } catch {
    return null;
  }
}

export async function getServices(draft = false): Promise<ServiceItem[]> {
  if (!hasSanityConfig()) return [];
  try {
    const data = await client.fetch<ServiceItem[]>(servicesQuery, undefined, { draft });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
