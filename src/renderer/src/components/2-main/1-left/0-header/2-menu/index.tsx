import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger } from "@/ui/icons";
import { MenuItem_ClearFiles } from "./1-clear-files";

export function L_PanelMenu() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
            <DropdownMenuTrigger asChild>

                <Button className="" variant={"ghost"}>
                    <IconMenuHamburger className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42 text-xs" align="start">

                <MenuItem_ClearFiles />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
