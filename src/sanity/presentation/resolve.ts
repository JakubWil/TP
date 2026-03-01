import { defineLocations } from "sanity/presentation";

/**
 * Gdzie dokumenty z Sanity są używane na stronie (lista "Used on" w Studio).
 * Wszystkie typy są wyświetlane na stronie głównej.
 */
export const resolve = {
  locations: {
    testimonial: defineLocations({
      select: { author: "author", text: "text" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.author || "Testimonial",
            href: "/",
          },
        ],
      }),
    }),
    quote: defineLocations({
      select: { lines: "lines" },
      resolve: () => ({
        locations: [{ title: "Quote section", href: "/" }],
      }),
    }),
    service: defineLocations({
      select: { title: "title", slug: "slug" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Service",
            href: "/",
          },
        ],
      }),
    }),
    transformation: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Transformation",
            href: "/",
          },
        ],
      }),
    }),
  },
};
