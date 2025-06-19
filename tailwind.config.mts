import colors from "tailwindcss/colors";
//const colors = require("tailwindcss/colors");
// const shadcnColors = require("./tailwind/colors");
// const shadcnTheRest = require("./tailwind/the-rest");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: colors.slate,
                secondary: colors.green,
                // ...shadcnColors.colors,
            },
        },
    },
    plugins: [
        require("./tailwind/tailwind-plugin-debug-screens"),
        require("./tailwind/tailwind-plugin-debug-styles"),
        require("./tailwind/tailwindcss-animate"), // This is local copy to resolve conflict with delay, duration, and ease. It adds suffix -ani. Also use !important to override shadcn's.
        require('./tailwind/tailwind-plugin-shadcn.mts'),
        require('./tailwind/tailwind-plugin-shadcn-feedback.mts'),
        require('./tailwind/tailwind-plugin-shadcn-mani'),
        require("./tailwind/tailwind-plugin-overflow-overlay"),
        require("@tailwindcss/container-queries"),
        require("tailwind-scrollbar"),
        require('@tailwindcss/forms')({ strategy: 'class' }),
    ],
};
