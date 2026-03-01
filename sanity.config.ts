import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { resolve } from "./src/sanity/presentation/resolve";
import { testimonialSchema, quoteSchema, serviceSchema } from "./src/sanity/schema";

// Project ID z sanity.io/manage (projekt JDL) – Studio ładuje się z npx sanity dev
const projectId = "64aerxzk";
const dataset = "production";

// URL strony Next.js dla Presentation Tool (w .env możesz ustawić VITE_SANITY_PREVIEW_URL)
const previewUrl = "http://localhost:3000";

export default defineConfig({
  name: "ptc",
  title: "PT Coaching",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: "/api/draft",
          disable: "/api/disable-draft",
        },
      },
    }),
  ],
  schema: {
    types: [testimonialSchema, quoteSchema, serviceSchema],
  },
});
