import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

export const shadcnManiPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        addBase({
            ":root": {
                "--mani_section-foreground": "169 100% 60%", // "#32ffdaa0"
            },
            ".dark": {
                "--mani_section-foreground": "169 100% 60%",
            }
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
                },
            }
        }
    }
);

export default shadcnManiPlugin;
