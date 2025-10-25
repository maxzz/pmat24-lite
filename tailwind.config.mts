import colors from "tailwindcss/colors";
// import tailwind_animate from "./tailwind/tailwindcss-animate.mts"; // This is local copy to resolve conflict with delay, duration, and ease. It adds suffix -ani. Also use !important to override shadcn's.
// const shadcnColors = require("./tailwind/colors");
// const shadcnTheRest = require("./tailwind/tailwind-plugin-shadcn-the-rest");

import tailwind_shadcn from "./tailwind/tailwind-plugin-shadcn.mts";
import tailwind_shadcn_feedback from "./tailwind/tailwind-plugin-shadcn-feedback.mts";
import tailwind_shadcn_mani from "./tailwind/tailwind-plugin-shadcn-mani/index.mts";

import tailwind_container_queries from "@tailwindcss/container-queries";
import tailwind_forms from '@tailwindcss/forms';
import tailwind_scrollbar from "tailwind-scrollbar";

import tm_debug_screens from "tailwindcss-plugin-debug-screens-tw4";
import tm_overflow from "tailwindcss-plugin-overflow-tw4";

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
        tm_debug_screens,
        tm_overflow,

        // /*problem*/tailwind_animate,
        tailwind_shadcn,
        tailwind_shadcn_feedback,
        tailwind_shadcn_mani,
        
        tailwind_container_queries,
        tailwind_forms({ strategy: 'class' }),
        tailwind_scrollbar,
    ],
};
