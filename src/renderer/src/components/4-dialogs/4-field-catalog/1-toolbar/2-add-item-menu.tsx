import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconAdd } from "@/ui/icons";

export function AddItem_PanelMenu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <IconAdd className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">

                <DropdownMenuItem>
                    Add Text Field
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                    Add Password Field
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
