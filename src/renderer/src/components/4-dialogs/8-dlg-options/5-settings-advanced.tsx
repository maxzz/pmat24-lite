import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { rowClasses, SectionTitle } from "./8-shared-classes";

export function AdvancedSettings() {
    const { allowHandleFiles, showFieldCatalog, showUiHeader, saveWDebugExt } = useSnapshot(appSettings.appUi.uiAdvanced);
    const liveUiAdvanced = appSettings.appUi.uiAdvanced;

    const { allowWelcome } = useSnapshot(appSettings.appUi.uiGeneral);
    const liveGeneral = appSettings.appUi.uiGeneral;

    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
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

                {/* 1 */}

                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={showUiHeader} onCheckedChange={(v) => liveUiAdvanced.showUiHeader = !!v} />
                    Show application main header
                </Label>

                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={snapDebugOnly.showCreateSrcCodeBtn} onCheckedChange={(v) => liveDebugOnly.showCreateSrcCodeBtn = !!v} />
                    Show source code button in the new manifest editor
                </Label>

                <Label className={classNames("col-start-1", rowClasses)}>
                    <Checkbox checked={saveWDebugExt} onCheckedChange={(v) => liveUiAdvanced.saveWDebugExt = !!v} />
                    Save files with debug name as {'[name.test.ext]'}
                </Label>

                {/* 2 */}

                <Label className={classNames("col-start-2", rowClasses)}>
                    <Checkbox checked={allowWelcome} onCheckedChange={(v) => liveGeneral.allowWelcome = !!v} />
                    Allow Welcome screen to be turn off
                </Label>

                <Label className={classNames("col-start-2", rowClasses)}>
                    <Checkbox checked={allowHandleFiles} onCheckedChange={(v) => liveUiAdvanced.allowHandleFiles = !!v} />
                    Allow opening of individual files
                </Label>

                <Label className={classNames("col-start-2", rowClasses)}>
                    <Checkbox checked={fcAllowed} onCheckedChange={(v) => liveFiles.shownManis.fcAllowed = !!v} />
                    Field Catalog support allowed
                </Label>

                <Label className={classNames("col-start-2 has-[:disabled]:opacity-50", rowClasses)}>
                    <Checkbox checked={fcAllowed && showFieldCatalog} onCheckedChange={(v) => appSettings.appUi.uiAdvanced.showFieldCatalog = !!v} disabled={!fcAllowed} />
                    Show field catalog files
                </Label>

                {/* 3 */}
                <div className="col-start-1 col-span-2 text-[.65rem] leading-3 text-foreground/50 flex gap-2">
                    <div className="">zoom:</div>
                    <div><span className="font-semibold">-</span>   <span className="px-1 bg-muted/40 border-border border rounded">ctrl+minus</span>     </div>
                    <div><span className="font-semibold">100</span> <span className="px-1 bg-muted/40 border-border border rounded">ctrl+0</span>         </div>
                    <div><span className="font-semibold">+</span>   <span className="px-1 bg-muted/40 border-border border rounded">ctrl+shift+plus</span></div>
                </div>

            </div>
        </SectionTitle>
    );
}
