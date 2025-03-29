import { defineCollection, z } from "astro:content";

const links = defineCollection({
    schema: z.object({
        icon: z.string(),
        title: z.string(),
        url: z.string(),
    }),
    type: "data"
});

export const collections = {
    links: links,
};