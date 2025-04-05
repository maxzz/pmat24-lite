import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { rowClasses, SectionTitle } from "./8-shared-classes";

export function AdvancedSettings() {
    const { allowHandleFiles, showFieldCatalog, showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    const liveUiAdvanced = appSettings.appUi.uiAdvanced;

    const { allowWelcome } = useSnapshot(appSettings.appUi.uiGeneral);
    const liveGeneral = appSettings.appUi.uiGeneral;

    const { showFldCat } = useSnapshot(appSettings.files.shownManis);
    const liveFiles = appSettings.files;

    const snapDebugOnly = useSnapshot(debugSettings.debugOnly);
    const liveDebugOnly = debugSettings.debugOnly;

    const { debugAccess } = useSnapshot(debugSettings.debugOnly);
    if (!debugAccess) {
        return null;
    }

    return (
        <SectionTitle title="Hidden from the end user debug only">
            <div className="py-1 grid grid-cols-[auto,auto] gap-2 grid-flow-dense">


                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={showUiHeader} onCheckedChange={(v) => liveUiAdvanced.showUiHeader = !!v} />
                    Show application main header
                </Label>

                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={snapDebugOnly.showCreateSrcCodeBtn} onCheckedChange={(v) => liveDebugOnly.showCreateSrcCodeBtn = !!v} />
                    Show source code button in the new manifest editor
                </Label>

                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={allowWelcome} onCheckedChange={(v) => liveGeneral.allowWelcome = !!v} />
                    Allow Welcome screen to be turn off
                </Label>

                <Label className={classNames("col-start-2", rowClasses)}>
                    <Checkbox checked={allowHandleFiles} onCheckedChange={(v) => liveUiAdvanced.allowHandleFiles = !!v} />
                    Allow opening of individual files
                </Label>

                <Label className={classNames("col-start-2", rowClasses)}>
                    <Checkbox checked={showFieldCatalog} onCheckedChange={(v) => appSettings.appUi.uiAdvanced.showFieldCatalog = !!v} />
                    Show Field Catalog access
                </Label>

                <Label className={classNames("col-start-2 has-[:disabled]:opacity-50", rowClasses)}>
                    <Checkbox checked={showFldCat && showFieldCatalog} onCheckedChange={(v) => liveFiles.shownManis.showFldCat = !!v} disabled={!showFieldCatalog} />
                    Show field catalog files
                </Label>

                <div className="col-start-1 col-span-2 text-[.65rem] leading-3 text-foreground/50">
                    <div>zoom Ctrl+0 to 100%</div>
                    <div>zoom Ctrl+Shift+plus to zoom in</div>
                    <div>zoom Ctrl+minus to zoom out</div>
                </div>

            </div>
        </SectionTitle>
    );
}
