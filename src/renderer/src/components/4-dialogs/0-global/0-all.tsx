import { OnAppMount, WorldToReactListener } from "@/xternal-to-main";
import { doSetFilesFrom_Dnd_Atom } from "@/store";
import { DropItDoc, Toaster } from "@/ui";
import { AppGlobalShortcuts } from "./1-global-shortcuts";
import { OpenFilesPersistentInput } from "@/components/2-main/1-left/1-header/1-menu-main/11-files";
import { DialogCreateManiSecondPage, DialogCreateManiV1, DialogCreateManiV2 } from "../2-dlg-create-login";
import { FceDialog } from "../4-dlg-field-catalog";
import { AppOptionsDialog } from "../8-dlg-options";

export function AppGlobals() {
    return (<>
        {/* Global dialogs */}
        <AppOptionsDialog />
        <ManiCreateDialogs />
        <FceDialog />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />

        {/* Open legacy dialogs hidden inputs */}
        <OpenFilesPersistentInput />
        <OpenFilesPersistentInput openAsFolder />

        {/* Rest */}
        <Toaster />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFrom_Dnd_Atom} />

        <WorldToReactListener />
        <OnAppMount />
    </>);
}

function ManiCreateDialogs() {
    return (<>
        <DialogCreateManiV1 />
        <DialogCreateManiSecondPage />
        <DialogCreateManiV2 />
    </>);
}
