import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Quote text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "e.g. John Smith, Newcastle, UK",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "e.g. JS (for avatar)",
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower number = higher in list",
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});

export const quoteSchema = defineType({
  name: "quote",
  title: "Quote section",
  type: "document",
  fields: [
    defineField({
      name: "lines",
      title: "Quote lines",
      type: "array",
      of: [{ type: "string" }],
      description: "One line per array item (displayed as separate lines)",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "buttonText",
      title: "Button text",
      type: "string",
      initialValue: "Start Your Journey",
    }),
    defineField({
      name: "buttonHref",
      title: "Button link",
      type: "string",
      initialValue: "#start",
    }),
  ],
});

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug / ID",
      type: "string",
      description: "Used in URL e.g. 1-1, online, custom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
