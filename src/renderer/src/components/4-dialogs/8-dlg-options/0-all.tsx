import { useAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { Button, ScrollArea } from "@/ui";
import { overlayClasses } from "../1-dlg-filter-files";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { FileListSettings } from "./2-settings-file-list";
import { UiUxSettings } from "./3-settings-ux-ui";
import { DialogPasswordPolicy } from "./4-settings-psw-policy";
import { AdvancedSettings } from "./5-settings-advanced";
import { SectionTitle } from "./8-shared-classes";

export function AppOptionsDialog() {

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
                <DialogOptionsBody setIsOpen={doOpenOptionsDialog} />
            </D.DialogContent>
        </D.Dialog>
    );
}

const contentClasses = "p-0 !w-4/5 max-w-xl h-4/5 min-h-56 max-h-[700px] data-[state=open]:[animation-duration:200ms]";

function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    return (
        <div className="text-xs select-none grid grid-rows-[auto,1fr,auto] gap-4">
            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-2">PMAT Options</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-2 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="relative w-full h-full">
                <div className="absolute inset-0">
                    <DialogMiddleArea />
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

function DialogMiddleArea() {
    return (
        <ScrollArea className="size-full" fullHeight>
            <div className="size-full px-4 grid grid-cols-1 justify-start auto-rows-min gap-6">

                <SectionTitle title="File list">
                    <FileListSettings />
                </SectionTitle>

                <SectionTitle title="UI/UX">
                    <UiUxSettings />
                </SectionTitle>

                <SectionTitle title="Dialog Password Policy">
                    <DialogPasswordPolicy />
                </SectionTitle>

                <AdvancedSettings />
            </div>
        </ScrollArea>
    );
}
