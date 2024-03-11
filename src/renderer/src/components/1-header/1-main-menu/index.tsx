import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger } from "@/ui/icons";
import { Button } from "@/ui/shadcn";
import { sendToMain } from "@/xternal-to-main";
import { MenuItems_Persistent, MenuItems_FileOpen, MenuItem_FileExit } from "./10-file";
import { MenuItem_GetSaw, MenuItem_GetTestDirs } from "./20-preferences";
import { MenuItem_Settings } from "./21-settings";

export function DropdownMenuDemo() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button className="px-1" variant="outline" size="xs">
                    <IconMenuHamburger className="size-5" />
                    <MenuItems_Persistent setMenuOpen={setOpen} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42 text-xs" align="start">

                <MenuItems_FileOpen setMenuOpen={setOpen} />

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-xs">
                            <MenuItem_GetSaw />
                            <MenuItem_GetTestDirs />
                            <DropdownMenuSeparator />
                            <MenuItem_Settings />
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <MenuItem_FileExit />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
