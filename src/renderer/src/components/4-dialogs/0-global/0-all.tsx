import { ManiCreateDialogs } from "../2-dlg-create-login";
import { OptionsFilesDialog } from "../8-dlg-options";
import { AppGlobalShortcuts } from "./1-global-shortcuts";

export function AppGloabals() {
    return (<>
        {/* Global dialogs */}
        <ManiCreateDialogs />
        <OptionsFilesDialog />

        {/* Global shortcuts */}
        <AppGlobalShortcuts />
    </>);
}
