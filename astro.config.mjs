import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless"
import icon from "astro-icon";

export default defineConfig({
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables"
    }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
  site: "https://runichaversack.ca",
  integrations: [tailwind(), icon()],
  output: "server",
  adapter: vercel(),
});