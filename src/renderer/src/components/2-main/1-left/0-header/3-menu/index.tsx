import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger } from "@/ui/icons";
import { MenuItem_FilterFiles } from "./1-filter-files";
import { MenuItem_ClearFiles } from "./2-clear-files";

export function L_PanelMenu() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
            <DropdownMenuTrigger asChild>

                <Button className="" variant={"ghost"}>
                    <IconMenuHamburger className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="start">

                <MenuItem_FilterFiles />
                <DropdownMenuSeparator />
                
                <MenuItem_ClearFiles />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
