import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
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
import { MenuItem_About, MenuItem_GeneralInfo, MenuItem_ReloadCache, MenuItem_TestPingPong } from "../22-more";
import { hasMain } from "@/xternal-to-main";
//import { MenuItem_CloseFolder } from "../2-close-folder";~
//import { PreferencesSubMenu } from "./2-nun-preferences-sub-munu";

export function FilesMainMenuBody() {
    const { debugAccess } = useSnapshot(debugSettings.debugOnly);
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

        <MenuItem_About />

        {debugAccess && hasMain() && (<>
            <MenuItem_GeneralInfo />
            <MenuItem_ReloadCache />
            <MenuItem_TestPingPong />
        </>)}

        <MenuItem_FileExit />
    </>);
}
