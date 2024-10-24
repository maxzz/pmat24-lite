import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Button, Checkbox, Input, Label } from "@/ui";
import { classNames } from "@/utils";

const labelBoldClasses = "block mb-1 text-xs font-semibold";
const subClasses = "py-1 flex flex-col gap-2";
const rowClasses = "text-xs font-normal flex place-items-center gap-1.5";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {

    const snapItems = useSnapshot(appSettings).files.itemsState;
    const { showStatusbar, showOptOnRight, showWelcome, showQuickXml } = useSnapshot(appSettings.appUi.uiGeneral);
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    const { showFldCat  } = useSnapshot(appSettings.files.shownManis);

    const snapMani = useSnapshot(appSettings, { sync: true }).right.mani;

    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-4">PMAT Options</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-4 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="px-4 py-4 grid grid-cols-1 gap-6">

                <div>
                    <Label className={labelBoldClasses}>
                        File list options
                    </Label>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={snapItems.showIndex} onCheckedChange={(v) => appSettings.files.itemsState.showIndex = !!v} />
                            Show file index
                        </Label>
                        <Label className={rowClasses}>
                            <Checkbox checked={snapItems.showIeMarker} onCheckedChange={(v) => appSettings.files.itemsState.showIeMarker = !!v} />
                            Show IE warning icon
                        </Label>
                        <Label className={rowClasses}>
                            <Checkbox checked={snapItems.showFname} onCheckedChange={(v) => appSettings.files.itemsState.showFname = !!v} />
                            Show always file name
                        </Label>
                        <Label className={classNames(rowClasses, snapItems.showFname && "opacity-30 pointer-events-none")}>
                            <Checkbox checked={snapItems.showChosen} onCheckedChange={(v) => appSettings.files.itemsState.showChosen = !!v} />
                            Show user defined name instead of domain name
                        </Label>
                    </div>
                </div>

                <div>
                    <Label className={labelBoldClasses}>
                        UI settings
                    </Label>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={showStatusbar} onCheckedChange={(v) => appSettings.appUi.uiGeneral.showStatusbar = !!v} />
                            Show status bar
                        </Label>
                    </div>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={showOptOnRight} onCheckedChange={(v) => appSettings.appUi.uiGeneral.showOptOnRight = !!v} />
                            Show manifest form option labels on the right side
                        </Label>
                    </div>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={showQuickXml} onCheckedChange={(v) => appSettings.appUi.uiGeneral.showQuickXml = !!v} />
                            Show quick access button to XML manifest content
                        </Label>
                    </div>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={showWelcome} onCheckedChange={(v) => appSettings.appUi.uiGeneral.showWelcome = !!v} />
                            Show Welcome screen on start
                        </Label>
                    </div>
                </div>

                <div>
                    <Label className={labelBoldClasses}>
                        Dialog Password Policy settings
                    </Label>

                    <Label className={rowClasses}>
                        Number of generated passwords
                        <Input className="h-7 max-w-12" value={snapMani.nToGenerate} onChange={(e) => appSettings.right.mani.nToGenerate = +e.target.value} />
                    </Label>
                </div>

                <div>
                    <Label className={labelBoldClasses}>
                        Advanced settings
                    </Label>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={allowHandleFiles} onCheckedChange={(v) => appSettings.appUi.uiAdvanced.allowHandleFiles = !!v} />
                            Allow opening of individual files
                        </Label>
                    </div>

                    <div className={subClasses}>
                        <Label className={rowClasses}>
                            <Checkbox checked={showFldCat} onCheckedChange={(v) => appSettings.files.shownManis.showFldCat = !!v} />
                            Show field catalog files
                        </Label>
                    </div>
                </div>
            </div>

            <div className="py-4 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </div>
        </div>
    );
}
