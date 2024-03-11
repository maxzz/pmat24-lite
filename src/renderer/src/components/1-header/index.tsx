import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { DropdownMenuDemo } from "./1-main-menu";

export function SectionHeader() {
    return (
        <div className="px-4 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <DropdownMenuDemo />

            <ThemeSwitch />
        </div>
    );
}
