import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";

import {
    MenuItems_OpenFiles,
    MenuItem_CreateMani,
    MenuItem_SaveCurrent,
    MenuItem_SaveCurrentAs,
    MenuItem_SaveAll,
    MenuItem_FileExit,
} from "../11-files";

import { MenuItem_Options } from "../20-options";
import { MenuItem_FilterFiles } from "../1-filter-files";
import { MenuItem_CloseFolder } from "../2-close-folder";

//import { PreferencesSubMenu } from "./2-nun-preferences-sub-munu";

export function FilesMainMenuBody() {
    return (<>
        <MenuItems_OpenFiles />
        <MenuItem_CloseFolder />
        
        <DropdownMenuSeparator />
        <MenuItem_CreateMani />

        <DropdownMenuSeparator />
        <MenuItem_SaveCurrent />
        {/* <MenuItem_SaveCurrentAs /> */}
        <MenuItem_SaveAll />

        <DropdownMenuSeparator />
        <MenuItem_FilterFiles />

        {/* <DropdownMenuSeparator /> */}
        <MenuItem_Options />

        {/* <PreferencesSubMenu /> */}

        <MenuItem_FileExit />
    </>);
}
