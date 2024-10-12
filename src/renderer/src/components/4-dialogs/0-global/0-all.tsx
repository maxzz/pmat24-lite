import { OnAppMount, WorldToReactListener } from "@/xternal-to-main";
import { doSetFilesFromDropAtom } from "@/store";
import { DropItDoc, Toaster } from "@/ui";
import { AppGlobalShortcuts } from "./1-global-shortcuts";
import { OpenFilesPersistentInput } from "@/components/1-header/1-main-menu/10-file";
import { ManiCreateDialogs } from "../2-dlg-create-login";
import { AppOptionsDialog } from "../8-dlg-options";

export function AppGlobals() {
    return (<>
        {/* Global dialogs */}
        <AppOptionsDialog />
        <ManiCreateDialogs />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />

        {/* Open legacy dialogs hidden inputs */}
        <OpenFilesPersistentInput openAsFolder={false} />
        <OpenFilesPersistentInput openAsFolder={true} />

        {/* Rest */}
        <Toaster />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFromDropAtom} />

        <WorldToReactListener />
        <OnAppMount />
    </>);
}
