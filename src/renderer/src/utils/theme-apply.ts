export type ThemeMode = "dark" | "light" | "system";

export function themeApplyMode(themeMode: ThemeMode): void {

    const root = window.document.documentElement;

    const newMode =
        themeMode === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : ""
            : themeMode === "dark"
                ? "dark"
                : "";

    root.classList[!!newMode ? "add" : "remove"]("dark");
}
