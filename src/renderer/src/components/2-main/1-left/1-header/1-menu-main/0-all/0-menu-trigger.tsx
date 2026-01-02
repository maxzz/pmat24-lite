import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";
import { FilesMainMenuBody } from "./1-menu-body";

export function L_PanelMenuTrigger() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>

            <DropdownMenuTrigger asChild>
                <Button className="rounded" variant="ghost" title="Main menu">
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-48 text-xs" align="start">
                <FilesMainMenuBody />
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
