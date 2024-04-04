import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

export const shadcnManiPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        addBase({
            ":root": {
                "--mani_section-foreground": "169 100% 60%",    // "#32ffdaa0"
                "--mani_foreground": "214, 32%, 91%",           // "#e2e8f0" // slate.200
                "--mani_background": "217, 33%, 17%",           // "#1e293b" // slate.800
                "--mani_muted-background": "215, 25%, 27%",     // "#334155" // slate.700
            },
            ".dark": {
                "--mani_section-foreground": "169 100% 60%",    // "#32ffdaa0"
                "--mani_foreground": "214, 32%, 91%",           // "#e2e8f0" // slate.200
                "--mani_background": "217, 33%, 17%",           // "#1e293b" // slate.800
                "--mani_muted-background": "215, 25%, 27%",     // "#334155" // slate.700
            },
        });
    },

    // 2. Extend the Tailwind theme with "themable" utilities
    {
        theme: {
            extend: {
                colors: {
                    mani_section: {
                        foreground: "hsl(var(--mani_section-foreground))",
                    },
                    mani_foreground: {
                        DEFAULT: "hsl(var(--mani_foreground))",
                    },
                    mani_background: {
                        DEFAULT: "hsl(var(--mani_background))",
                    },
                    mani_muted: {
                        background: "hsl(var(--mani_muted-background))",
                    },
                },
            }
        }
    }
);

export default shadcnManiPlugin;
