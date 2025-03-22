import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { rowClasses } from "./8-shared-classes";

export function AdvancedSettings() {
    const { allowHandleFiles, showFieldCatalog, showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    const liveUiAdvanced = appSettings.appUi.uiAdvanced;

    const { showFldCat } = useSnapshot(appSettings.files.shownManis);
    const liveFiles = appSettings.files;

    const snapDebugOnly = useSnapshot(debugSettings.debugOnly);
    const liveDebugOnly = debugSettings.debugOnly;

    return (
        <div className="py-1 grid grid-cols-[auto,auto] gap-2 grid-flow-dense">

            <Label className={classNames("col-start-1", rowClasses)}>
                <Checkbox checked={allowHandleFiles} onCheckedChange={(v) => liveUiAdvanced.allowHandleFiles = !!v} />
                Allow opening of individual files
            </Label>

            <Label className={classNames("col-start-1", rowClasses)}>
                <Checkbox checked={showFieldCatalog} onCheckedChange={(v) => appSettings.appUi.uiAdvanced.showFieldCatalog = !!v} />
                Show Field Catalog access
            </Label>

            <Label className={classNames("col-start-1 has-[:disabled]:opacity-50", rowClasses)}>
                <Checkbox checked={showFldCat && showFieldCatalog} onCheckedChange={(v) => liveFiles.shownManis.showFldCat = !!v} disabled={!showFieldCatalog} />
                Show field catalog files
            </Label>

            <Label className={classNames("col-start-2", rowClasses)}>
                <Checkbox checked={showUiHeader} onCheckedChange={(v) => liveUiAdvanced.showUiHeader = !!v} />
                Show application main header
            </Label>

            <Label className={classNames("col-start-2", rowClasses)}>
                <Checkbox checked={snapDebugOnly.showCreateSrcCodeBtn} onCheckedChange={(v) => liveDebugOnly.showCreateSrcCodeBtn = !!v} />
                Show source code button in the new manifest editor
            </Label>

            <div className="col-start-1 text-[.67rem] text-foreground/50">
                <div className="">zoom Ctrl+0 to 100%</div>
                <div className="">zoom Ctrl+Shift+plus to zoom in</div>
                <div className="">zoom Ctrl+minus to zoom out</div>
            </div>

        </div>
    );
}
