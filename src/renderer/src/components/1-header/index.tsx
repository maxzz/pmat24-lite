import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { DropdownMenuDemo } from "./1-dropdown-menu";

export function SectionHeader() {
    return (
        <div className="p-4 border-border border-b flex items-center justify-between">
            <DropdownMenuDemo />
            <ThemeSwitch />
        </div>
    );
}
