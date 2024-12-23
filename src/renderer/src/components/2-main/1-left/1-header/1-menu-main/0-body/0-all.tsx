import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5 } from "@/ui/icons";
import {
    MenuItems_OpenFiles,
    MenuItem_FileExit,
    MenuItem_CreateMani,
    MenuItem_SaveCurrent,
    MenuItem_SaveCurrentAs,
    MenuItem_SaveAll
} from "../10-file";
import { MenuItem_Options } from "../20-options";
//import { PreferencesSubMenu } from "./2-nun-preferences-sub-munu";

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

//TODO: const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced); move menu items into files menu

/*export*/ function MainMenuBody() {
    return (<>
        <MenuItems_OpenFiles />
        <DropdownMenuSeparator />

        <MenuItem_CreateMani />
        <DropdownMenuSeparator />

        <MenuItem_SaveCurrent />
        <MenuItem_SaveCurrentAs />
        <MenuItem_SaveAll />
        <DropdownMenuSeparator />

        <MenuItem_Options />
        {/* <PreferencesSubMenu /> */}

        <MenuItem_FileExit />
    </>);
}
