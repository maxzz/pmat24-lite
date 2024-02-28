import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MenubarDemo } from "./1-menu";
import { DropdownMenuDemo } from "./1-dropdown-menu";

export function SectionHeader() {
    return (
        <div className="p-4 flex items-center justify-between">
            SectionHeader
            <DropdownMenuDemo />
            <MenubarDemo />
            <ThemeSwitch />
        </div>
    );
}
