import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import {
    MenuItems_OpenFiles,
    MenuItem_FileExit,
    MenuItem_CreateMani,
    MenuItem_SaveCurrent,
    MenuItem_SaveCurrentAs,
    MenuItem_SaveAll
} from "../10-file";
import { MenuItem_Settings } from "../20-settings";
//import { PreferencesSubMenu } from "./2-preferences-sub-munu";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5 } from "@/ui/icons";

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

                <MenuItems_OpenFiles />
                <DropdownMenuSeparator />

                <MenuItem_CreateMani />
                <DropdownMenuSeparator />

                <MenuItem_SaveCurrent />
                <MenuItem_SaveCurrentAs />
                <MenuItem_SaveAll />
                <DropdownMenuSeparator />

                <MenuItem_Settings />
                {/* <PreferencesSubMenu /> */}

                <MenuItem_FileExit />
            </DropdownMenuContent>

        </DropdownMenu>
    );
}
