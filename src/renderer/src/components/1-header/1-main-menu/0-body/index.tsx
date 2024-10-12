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
import { IconMenuHamburger5 } from "@/ui/icons";
import { Button } from "@/ui/shadcn";
import { MenuItems_Persistent, MenuItems_OpenFiles, MenuItem_FileExit, MenuItem_CreateMani, MenuItem_SaveCurrent, MenuItem_SaveCurrentAs } from "../10-file";
import { MenuItem_GetSaw, MenuItem_GetTestDirs } from "../21-debug";
import { MenuItem_Settings } from "../20-settings";
import { MenuItem_More } from "../22-more";
import { MenuItem_SaveAll } from "../10-file";
import { useAtom } from "jotai";
import { maniMenuOpenAtom } from "@/store";

export function MainDropdownMenu() {
    const [menuOpen, setMenuOpen] = useAtom(maniMenuOpenAtom);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>

            <DropdownMenuTrigger asChild>
                <Button className="px-1" variant="outline" size="xs">
                    <IconMenuHamburger5 className="size-5" />
                    <MenuItems_Persistent />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-40 text-xs" align="start">

                <MenuItems_OpenFiles setMenuOpen={setMenuOpen} />
                <DropdownMenuSeparator />

                <MenuItem_CreateMani />
                <DropdownMenuSeparator />

                <MenuItem_SaveCurrent />
                <MenuItem_SaveCurrentAs />
                <MenuItem_SaveAll />
                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        Preferences
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-xs">
                            <MenuItem_Settings />
                            <DropdownMenuSeparator />

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Debug
                                </DropdownMenuSubTrigger>

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
