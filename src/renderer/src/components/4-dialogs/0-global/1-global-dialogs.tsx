import { OnAppMount, WorldToReactListener } from "@/xternal-to-main";
import { OnAppMountGetZoomLevel } from "@/store/9-ui-state/8-app-ui/6-zoom-atom";
import { OnAppMountGetProcessEnv } from "@/store/0-serve-atoms/8-launch-app-data/2-process-env-atom";
import { doSetFilesFrom_Dnd_Atom } from "@/store/0-serve-atoms/2-do-load-files";
import { DropItDoc } from "@/ui/shadcn";
import { Toaster } from "sonner"; //import { Toaster } from "@/ui/local-ui/7-toaster";
import { AppGlobalShortcuts } from "./2-global-shortcuts";
import { WindowsAppTitleCaption } from "./3-windows-app-title-caption";
import { OpenFilesPersistentInput } from "@/components/2-main/1-left/1-header/1-menu-main/11-files";
//import { DialogCreateManiV1SecondPage, DialogCreateManiV1, DialogCreateManiV2, DialogSawMonitor } from "../2-dlg-create-login";
import { DialogSawMonitor } from "../2-dlg-create-login/1-entry-saw-monitor";
import { FceDialog } from "../4-dlg-field-catalog";
import { ConfirmationDialog } from "../5-confirm/1-confirmation/1-dlg-confirm-body";
import { ManiNameDialog } from "../5-confirm/5-dlg-mani-name/1-dlg-rename-mani";
import { AppSettingsDialog } from "../8-dlg-settings";

export function AppGlobals() {
    return (<>
        {/* App title */}
        <WindowsAppTitleCaption />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />

        {/* Open legacy dialogs hidden inputs */}
        <OpenFilesPersistentInput />
        <OpenFilesPersistentInput openAsFolder />

        <DropItDoc doSetFilesFromDropAtom={doSetFilesFrom_Dnd_Atom} />

        <WorldToReactListener />
        <OnAppMount />
        <OnAppMountGetZoomLevel />
        <OnAppMountGetProcessEnv />

        {/* Rest */}
        <Toaster />

        {/* Global dialogs */}
        <ConfirmationDialog />
        <AppSettingsDialog />
        <ManiNameDialog />
        <ManiCreateDialogs />
        <FceDialog />

    </>);
}

function ManiCreateDialogs() {
    return (<>
        <DialogSawMonitor />
        {/* <DialogCreateManiV3Saw /> */}
        {/*
        <DialogCreateManiV1 />
        <DialogCreateManiV1SecondPage />
        <DialogCreateManiV2 />
        */}
    </>);
}
