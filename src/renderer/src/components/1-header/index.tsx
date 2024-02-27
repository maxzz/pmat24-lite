import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MenubarDemo } from "./1-menu";

export function SectionHeader() {
    return (
        <div className="p-4 flex items-center justify-between">
            SectionHeader
            <MenubarDemo />
            <ThemeSwitch />
        </div>
    );
}
