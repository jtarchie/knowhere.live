import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Knowhere API Docs",
  description: "API documentation for the Knowhere API.",
  outDir: "../dist/docs",
  base: "/docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
    ],

    sidebar: [
      {
        text: "API",
        items: [
          { text: "Runtime", link: "/runtime" },
          { text: "Query", link: "/query" },
        ],
      },
      {
        text: "Map",
        items: [
          { text: "Examples", link: "/examples" },
        ],
      },
    ],
  },
});
