import { atom, useAtom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, openedName } from "@/store/9-ui-state";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { Block4_ScreenDetection } from "./2-nun-4-screen-detection";
import { OptionsSubSectionTitle, UiAccordion } from "../9-controls";
import * as D from "@/ui/shadcn/dialog";
import { Button, ScrollArea } from "@/ui";
import { overlayClasses } from "@/components/4-dialogs";
import { UiAccordion3Example } from "../9-controls/nun-controls/ui-accordion3-motion";
import { UiAccordion4Example } from "../9-controls/nun-controls/ui-accordion4-motion";
import { UiAccordion5Example } from "../9-controls/nun-controls/ui-accordion5-motion";

export function BlockWrap_Detection_Button({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "detection";
    const { formIdx } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);

    return (<>
        <div className="col-span-1 w-full">
            <Button variant="outline" size={"sm"} className="px-2 justify-start" onClick={() => doOpenOptionsDialog(true)}>Screen detection...</Button>
        </div>

        <AppOptionsDialog oFormProps={oFormProps} />
    </>);
}

const doOpenOptionsDialogAtom = atom(false);

function AppOptionsDialog({ oFormProps }: { oFormProps: OFormProps; }) {

    const [optionsDialogOpen, doOpenOptionsDialog] = useAtom(doOpenOptionsDialogAtom);
    if (!optionsDialogOpen) {
        return null;
    }

    return (
        <D.Dialog open={optionsDialogOpen} onOpenChange={() => doOpenOptionsDialog(false)}>
            <D.DialogContent
                className={contentClasses}
                noClose
                hiddenTitle="Options"
                overlayClasses={overlayClasses}
            >
                <DialogOptionsBody setIsOpen={doOpenOptionsDialog} oFormProps={oFormProps} />
            </D.DialogContent>
        </D.Dialog>
    );
}

const contentClasses = "p-0 w-4/5! max-w-xl h-4/5 min-h-56 max-h-[700px] data-[state=open]:duration-ani-200";

function DialogOptionsBody({ setIsOpen, oFormProps }: { setIsOpen: (v: boolean) => void; oFormProps: OFormProps; }) {
    return (
        <div className="text-xs select-none grid grid-rows-[auto_1fr_auto]">
            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-2">PMAT Options</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-2 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="relative w-full h-full">
                <div className="absolute inset-0">
                    <DialogMiddleArea oFormProps={oFormProps} />
                </div>
            </div>

            <div className="py-2 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </div>
        </div>
    );
}

function DialogMiddleArea({ oFormProps }: { oFormProps: OFormProps; }) {
    return (
        <ScrollArea className="size-full overflow-auto" fullHeight>
            <div className="size-full px-4 py-4 grid grid-cols-1 justify-start auto-rows-min gap-6">
                {/* <UiAccordion3Example /> */}
                {/* <UiAccordion4Example /> */}
                <UiAccordion5Example />
                {/* <Block4_ScreenDetection oFormProps={oFormProps} /> */}
            </div>
        </ScrollArea>
    );
}
