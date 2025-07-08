import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import {
    MenuItems_OpenFiles,
    MenuItem_CreateMani,
    MenuItem_DeleteCurrent,
    MenuItem_RevealInExplorerCurrent,
    MenuItem_SaveCurrent,
    // MenuItem_SaveCurrentAs,
    MenuItem_SaveAll,
    MenuItem_FileExit,
} from "../11-files";
import { MenuItem_OpenRecent } from "../10-file-open-recent";
import { MenuItem_Options } from "../20-options";
import { MenuItem_FilterFiles } from "../1-filter-files";
import { MenuItem_GeneralInfo, MenuItem_PerformCommand } from "../22-more";
//import { MenuItem_CloseFolder } from "../2-close-folder";
//import { PreferencesSubMenu } from "./2-nun-preferences-sub-munu";

export function FilesMainMenuBody() {
    return (<>
        <MenuItems_OpenFiles />
        {/* <MenuItem_CloseFolder /> */}
        <MenuItem_OpenRecent />
        
        <DropdownMenuSeparator />
        <MenuItem_CreateMani />
        <MenuItem_SaveCurrent />
        <MenuItem_SaveAll />
        {/* <MenuItem_SaveCurrentAs /> */}

        {/* <DropdownMenuSeparator /> */}
        <MenuItem_DeleteCurrent />
        <MenuItem_RevealInExplorerCurrent />

        <DropdownMenuSeparator />
        <MenuItem_FilterFiles />

        {/* <DropdownMenuSeparator /> */}
        <MenuItem_Options />

        {/* <PreferencesSubMenu /> */}

        <DropdownMenuSeparator />
        <MenuItem_GeneralInfo />
        <MenuItem_PerformCommand />

        <MenuItem_FileExit />
    </>);
}
