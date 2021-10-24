export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "blind-client",
        htmlAttrs: {
            lang: "ko"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content:
                    "width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1.0"
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href:
                    "https://use.fontawesome.com/releases/v5.15.3/css/all.css",
                integrity:
                    "sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk",
                crossorigin: "anonymous"
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/api.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/tailwindcss"],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/moment"
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        browserBaseURL: "http://localhost:8080",
        baseURL: "http://localhost:8080",
        https: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
};
