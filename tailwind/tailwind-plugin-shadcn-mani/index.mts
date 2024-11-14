import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

const newColors = {
    ":root": {
        "--mani-title": "144 85% 36%",                  // "#0ea94d"
        "--mani-foreground": "214 32% 91%",             // "#e2e8f0" // slate.200
        "--mani-background": "217 33% 17%",             // "#1e293b" // slate.800
        "--mani-muted-background": "215 25% 27%",       // "#334155" // slate.700
        "--mani-muted-foreground": "215 16% 47%",       // "#64748b" // slate.500
    },
    ".dark": {
        "--mani-title": "169 100% 60%",                 // "#45a194" "#32ffdaa0"
        "--mani-foreground": "214 32% 91%",             // "#e2e8f0" // slate.200
        "--mani-background": "217 33% 17%",             // "#1e293b" // slate.800
        "--mani-muted-background": "215 25% 27%",       // "#334155" // slate.700
        "--mani-muted-foreground": "215 16% 47%",       // "#64748b" // slate.500
    },
};

export const shadcnManiPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        //addBase(newColors);
    },

    // 2. Extend the Tailwind theme with "themable" utilities
    {
        theme: {
            extend: {
                colors: {
                    mani: {
                        title: "var(--mani-title)",
                        foreground: "var(--mani-foreground)",
                        background: "var(--mani-background)",
                        muted: {
                            DEFAULT: "var(--mani-muted-background)",
                            foreground: "var(--mani-muted-foreground)",
                        },
                        border: {
                            DEFAULT: "var(--mani-border)",
                            muted: "var(--mani-border-muted)",
                            separator: "var(--mani-border-separator)",  // button separator inside parent button
                        },
                        ring: {
                            DEFAULT: "var(--mani-ring)",
                            activated: "var(--mani-ring-activated)",
                        },
                    },
                    list: {
                        select: {
                            focus: "var(--list-select-focus)",
                            hover: "var(--list-select-hover)",
                            selected: {
                                active: "var(--list-select-selected-active)",
                                inactive: "var(--list-select-selected-inactive)",
                            },
                            bg: {
                                focus: "var(--list-select-bg-focus)",
                                hover: "var(--list-select-bg-hover)",
                                selected: {
                                    active: "var(--list-select-bg-selected-active)",
                                    inactive: "var(--list-select-bg-selected-inactive)",
                                },
                            },
                        },
                    },

                    // mani: {
                    //     title: "hsl(var(--mani-title))",
                    //     foreground: "hsl(var(--mani-foreground))",
                    //     background: "hsl(var(--mani-background))",
                    //     muted: {
                    //         DEFAULT: "hsl(var(--mani-muted-background))",
                    //         foreground: "hsl(var(--mani-muted-foreground))",
                    //     },
                    // },

                    // mani: {
                    //     title: "#45a194",           // --mani-title
                    //     foreground: "#e2e8f0",      // --mani-foreground // slate.200
                    //     background: "#1e293b",      // --mani-background // slate.800

                    //     muted: {
                    //         DEFAULT: "#334155",     // --mani-muted-background // slate.700
                    //         foreground: "#64748b",  // --mani-muted-foreground // slate.500

                    //         nested: {
                    //             DEFAULT: "#f00",
                    //             foreground: "#f77",
                    //         }
                    //     },
                    // },
                },
            }
        }
    }
);

export default shadcnManiPlugin;
