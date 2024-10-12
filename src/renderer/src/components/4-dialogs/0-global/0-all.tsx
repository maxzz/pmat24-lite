import { OnAppMount, WorldToReactListener } from "@/xternal-to-main";
import { doSetFilesFromDropAtom } from "@/store";
import { DropItDoc, Toaster } from "@/ui";
import { ManiCreateDialogs } from "../2-dlg-create-login";
import { OptionsFilesDialog } from "../8-dlg-options";
import { AppGlobalShortcuts } from "./1-global-shortcuts";
import { MenuItems_Persistent_Files } from "@/components/1-header/1-main-menu/10-file/10-file-open/4-menu-items_persistent";

export function AppGlobals() {
    return (<>
        {/* Global dialogs */}
        <ManiCreateDialogs />
        <OptionsFilesDialog />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />

        {/* Open dialogs */}
        <MenuItems_Persistent_Files />

        {/* Rest */}
        <Toaster />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFromDropAtom} />

        <WorldToReactListener />
        <OnAppMount />
    </>);
}
