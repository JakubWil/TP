import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Pojedyncza transformacja klienta: jedno zdjęcie (collage przed/po),
 * tytuł, statystyki, cytat, opis i lista "Co otrzymał(a)".
 */
export const transformationSchema = defineType({
  name: "transformation",
  title: "Transformation",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "np. Imię i nazwisko klienta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "transformationImage",
      title: "Transformation image",
      type: "image",
      description: "Jedno zdjęcie (collage przed/po) w formacie PNG/JPG",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "string",
      description: "np. 25 lat • Masa • 6 miesięcy",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "string",
      description: "np. Wreszcie przestałem być chudym facetem.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Długi opis historii transformacji",
    }),
    defineField({
      name: "resultsList",
      title: "Co otrzymał(a)",
      type: "array",
      of: [{ type: "string" }],
      description: "np. Indywidualny plan, Dieta, Konsultacje",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower number = higher in list",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", quote: "quote" },
    prepare({ title, quote }) {
      return {
        title: title || "Untitled transformation",
        subtitle: quote ? quote.slice(0, 50) + (quote.length > 50 ? "…" : "") : "",
      };
    },
  },
});
