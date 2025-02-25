import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
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
  integrations: [tailwind(), sitemap(), mdx(), icon()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});