import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5 } from "@/ui/icons";
import { MainMenuBody } from "./1-menu-body";

export function MainDropdownMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>

            <DropdownMenuTrigger asChild>
                <Button className="px-1" variant="outline" size="xs">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-40 text-xs" align="start">
                <MainMenuBody />
            </DropdownMenuContent>

        </DropdownMenu>
    );
}
