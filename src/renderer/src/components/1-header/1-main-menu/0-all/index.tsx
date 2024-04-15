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
import { MenuItems_Persistent, MenuItems_FileOpen, MenuItem_FileExit, MenuItem_CreateMani } from "../10-file";
import { MenuItem_GetSaw, MenuItem_GetTestDirs } from "../21-debug";
import { MenuItem_Settings } from "../20-settings";
import { MenuItem_More } from "../22-more";

export function MainDropdownMenu() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button className="px-1" variant="outline" size="xs">
                    <IconMenuHamburger className="size-5" />
                    <MenuItems_Persistent setMenuOpen={setOpen} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-40 text-xs" align="start">

                <MenuItems_FileOpen setMenuOpen={setOpen} />
                <DropdownMenuSeparator />

                <MenuItem_CreateMani />
                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-xs">
                            
                            <MenuItem_Settings />
                            <DropdownMenuSeparator />

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Debug</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="text-xs">
                                        <MenuItem_GetSaw />
                                        <MenuItem_GetTestDirs />
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <MenuItem_More />

                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <MenuItem_FileExit />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
