import { client } from "@/sanity/client";
import { quoteQuery, servicesQuery, testimonialsQuery } from "@/sanity/lib/queries";

export type TestimonialItem = {
  text: string;
  author: string;
  initials: string;
};

export type QuoteData = {
  lines: string[];
  buttonText?: string;
  buttonHref?: string;
} | null;

export type ServiceItem = {
  _id: string;
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

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!hasSanityConfig()) return [];
  try {
    const data = await client.fetch<TestimonialItem[]>(testimonialsQuery);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getQuote(): Promise<QuoteData> {
  if (!hasSanityConfig()) return null;
  try {
    const data = await client.fetch<QuoteData>(quoteQuery);
    return data;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  if (!hasSanityConfig()) return [];
  try {
    const data = await client.fetch<ServiceItem[]>(servicesQuery);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
