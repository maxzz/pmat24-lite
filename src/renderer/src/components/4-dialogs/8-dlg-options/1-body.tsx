import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Button, Checkbox, Input, Label } from "@/ui";
import { subClasses, rowClasses, SectionTitle } from "./8-shared-classes";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-2">PMAT Options</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-2 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="px-4 py-4 grid grid-cols-1 gap-6">

                <SectionTitle title="File list">
                    <FileListSettings />
                </SectionTitle>

                <SectionTitle title="UI/UX">
                    <UiUxSettings />
                </SectionTitle>

                <SectionTitle title="Dialog Password Policy">
                    <DialogPasswordPolicy />
                </SectionTitle>

                <SectionTitle title="Advanced settings">
                    <AdvancedSettings />
                </SectionTitle>
            </div>

            <div className="py-2 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </div>
        </div>
    );
}

function FileListSettings() {
    const snapItems = useSnapshot(appSettings.files).itemsState;
    const liveItems = appSettings.files.itemsState;
    return (
        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showIndex} onCheckedChange={(v) => liveItems.showIndex = !!v} />
                Show file index
            </Label>
            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showIeMarker} onCheckedChange={(v) => liveItems.showIeMarker = !!v} />
                Show IE warning icon
            </Label>
            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showFname} onCheckedChange={(v) => liveItems.showFname = !!v} />
                Show always file name
            </Label>
            <Label className={classNames(rowClasses, snapItems.showFname && "opacity-30 pointer-events-none")}>
                <Checkbox checked={snapItems.showChosen} onCheckedChange={(v) => liveItems.showChosen = !!v} />
                Show user defined name instead of domain name
            </Label>
            <Label className={rowClasses}>
                <Checkbox checked={snapItems.selectAsTrigger} onCheckedChange={(v) => liveItems.selectAsTrigger = !!v} />
                Select the same file will deselect it
            </Label>
            <Label className={rowClasses}>
                <Checkbox checked={snapItems.selectEmptySpace} onCheckedChange={(v) => liveItems.selectEmptySpace = !!v} />
                Empty space click will deselect current item
            </Label>
        </div>
    );
}

function UiUxSettings() {
    const { showStatusbar, showOptOnRight, showWelcome, showQuickXml } = useSnapshot(appSettings.appUi.uiGeneral);
    const liveUiGeneral = appSettings.appUi.uiGeneral;
    return (<>
        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showWelcome} onCheckedChange={(v) => liveUiGeneral.showWelcome = !!v} />
                Show Welcome screen on start
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showStatusbar} onCheckedChange={(v) => liveUiGeneral.showStatusbar = !!v} />
                Show status bar
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showQuickXml} onCheckedChange={(v) => liveUiGeneral.showQuickXml = !!v} />
                Show quick access button to XML manifest content
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showOptOnRight} onCheckedChange={(v) => liveUiGeneral.showOptOnRight = !!v} />
                Show manifest form option labels on the right side
            </Label>
        </div>
    </>
    );
}

function DialogPasswordPolicy() {
    const snapMani = useSnapshot(appSettings, { sync: true }).right.mani;
    return (<>
        <Label className={rowClasses}>
            Number of generated passwords
            <Input className="h-6 px-0 max-w-10 text-xs text-center" value={snapMani.nToGenerate} onChange={(e) => appSettings.right.mani.nToGenerate = +e.target.value} />
        </Label>
    </>);
}

function AdvancedSettings() {
    const { allowHandleFiles, showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    const liveUiAdvanced = appSettings.appUi.uiAdvanced;

    const { showFldCat } = useSnapshot(appSettings.files.shownManis);
    const liveFiles = appSettings.files;

    const snapDebugOnly = useSnapshot(debugSettings.debugOnly);
    const liveDebugOnly = debugSettings.debugOnly;

    return (
        <div className="grid grid-cols-2 gap-2 grid-flow-dense">

            <Label className={classNames("col-start-1", rowClasses)}>
                <Checkbox checked={allowHandleFiles} onCheckedChange={(v) => liveUiAdvanced.allowHandleFiles = !!v} />
                Allow opening of individual files
            </Label>

            <Label className={classNames("col-start-1", rowClasses)}>
                <Checkbox checked={showFldCat} onCheckedChange={(v) => liveFiles.shownManis.showFldCat = !!v} />
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

            <div className="text-[.67rem] text-foreground/50">
                <div className="">zoom Ctrl+0 to 100%</div>
                <div className="">zoom Ctrl+Shift+plus to zoom in</div>
                <div className="">zoom Ctrl+minus to zoom out</div>
            </div>

        </div>
    );
}


