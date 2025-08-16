import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { hasMain, R2MCalls } from "@/xternal-to-main";
import { DropdownMenuItem } from "@/ui";
import { DropdownMenuItem_Open_FromRenderer } from "./1-open-from-renderer";

export function MenuItems_OpenFiles() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);

    if (hasMain()) {
        return (<>
            {allowHandleFiles && (
                < DropdownMenuItem onClick={() => R2MCalls.loadManifestsDialog({})}>
                    Open Files...
                </DropdownMenuItem >
            )}

            <DropdownMenuItem onClick={() => R2MCalls.loadManifestsDialog({ openDirs: true })}>
                Open Folder...
            </DropdownMenuItem>
        </>);
    }

    return (<>
        {allowHandleFiles && (
            <DropdownMenuItem_Open_FromRenderer />
        )}
        
        <DropdownMenuItem_Open_FromRenderer openAsFolder />
    </>);
}
