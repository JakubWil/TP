import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { testimonialSchema, quoteSchema, serviceSchema } from "./src/sanity/schema";

// Project ID z sanity.io/manage (projekt JDL) – Studio ładuje się z npx sanity dev
const projectId = "64aerxzk";
const dataset = "production";

export default defineConfig({
  name: "ptc",
  title: "PT Coaching",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: [testimonialSchema, quoteSchema, serviceSchema],
  },
});
