import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Filejack",
    description: "File Operations CLI",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Get Started", link: "/docs" },
            {
                text: "Github",
                link: "https://github.com/plsankar/filejack?utm_source=filejackdocs&utm_medium=filejackdocs&utm_campaign=filejackdocs",
            },
        ],

        sidebar: [
            {
                text: "Docs",
                items: [{ text: "Get Started", link: "/docs" }],
            },
        ],

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/plsankar/filejack?utm_source=filejackdocs&utm_medium=filejackdocs&utm_campaign=filejackdocs",
            },
            {
                icon: "npm",
                link: "https://www.npmjs.com/package/filejack?utm_source=filejackdocs&utm_medium=filejackdocs&utm_campaign=filejackdocs",
            },
            {
                icon: "x",
                link: "https://x.com/plsankar96",
            },
        ],
        footer: {
            message: "Released under the MIT License.",
        },
    },
});
