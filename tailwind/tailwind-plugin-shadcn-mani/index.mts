import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

export const shadcnManiPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        addBase({
            ":root": {
                "--manisection": "0 100% 97%",
                "--manisection-foreground": "169.17 100% 59.8%",
                "--manisection-border": "359 100% 94%",
            },
            ".dark": {
                "--manisection": "358 76% 10%",
                "--manisection-foreground": "169.17 100% 59.8%",
                "--manisection-border": "357 89% 16%",
            }
        });
    },

    // 2. Extend the Tailwind theme with "themable" utilities
    {
        theme: {
            extend: {
                colors: {
                    manisection: {
                        DEFAULT: "hsl(var(--manisection))",
                        foreground: "hsl(var(--manisection-foreground))",
                        border: "hsl(var(--manisection-border))",
                    },
                },
            }
        }
    }
);

export default shadcnManiPlugin;
