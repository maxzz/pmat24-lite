import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
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

//TODO: const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced); move menu items into files menu

export function MainMenuBody() {
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
