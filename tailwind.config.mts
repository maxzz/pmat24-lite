import colors from "tailwindcss/colors";
//const colors = require("tailwindcss/colors");
// const shadcnColors = require("./tailwind/colors");
// const shadcnTheRest = require("./tailwind/the-rest");

import debug_screens from "./tailwind/tailwind-plugin-debug-screens.mts";
import debug_styles from "./tailwind/tailwind-plugin-debug-styles.mts";
import tailwind_animate from "./tailwind/tailwindcss-animate.mts"; // This is local copy to resolve conflict with delay, duration, and ease. It adds suffix -ani. Also use !important to override shadcn's.
import tailwind_shadcn from "./tailwind/tailwind-plugin-shadcn.mts";
import tailwind_shadcn_feedback from "./tailwind/tailwind-plugin-shadcn-feedback.mts";
import tailwind_shadcn_mani from "./tailwind/tailwind-plugin-shadcn-mani/index.mts";
import tailwind_overflow_overlay from "./tailwind/tailwind-plugin-overflow-overlay.mts";
import tailwind_container_queries from "@tailwindcss/container-queries";
import tailwind_scrollbar from "tailwind-scrollbar";
import tailwind_forms from '@tailwindcss/forms';

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
        /*problem*/debug_screens,
        debug_styles,
        /*problem*/tailwind_animate,
        tailwind_shadcn,
        tailwind_shadcn_feedback,
        tailwind_shadcn_mani,
        /*problem*/tailwind_overflow_overlay,
        tailwind_container_queries,
        /*problem*/tailwind_scrollbar,
        tailwind_forms({ strategy: 'class' }),
    ],
};
