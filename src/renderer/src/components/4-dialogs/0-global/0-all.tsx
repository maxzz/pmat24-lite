import { OnAppMount, WorldToReactListener } from "@/xternal-to-main";
import { doSetFilesFromDropAtom } from "@/store";
import { DropItDoc, Toaster } from "@/ui";
import { ManiCreateDialogs } from "../2-dlg-create-login";
import { OptionsFilesDialog } from "../8-dlg-options";
import { AppGlobalShortcuts } from "./1-global-shortcuts";

export function AppGlobals() {
    return (<>
        {/* Global dialogs */}
        <ManiCreateDialogs />
        <OptionsFilesDialog />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />

        {/* Rest */}
        <Toaster />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFromDropAtom} />

        <WorldToReactListener />
        <OnAppMount />
    </>);
}
