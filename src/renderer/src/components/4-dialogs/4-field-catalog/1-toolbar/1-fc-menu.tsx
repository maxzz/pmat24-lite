import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";

export function FC_PanelMenu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">

                {/* <MenuItem_ShowXML /> */}
                <DropdownMenuSeparator />
                {/* <MenuItem_More /> */}

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
