import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { FileListSettings } from "./2-settings-file-list";
import { UiUxSettings } from "./3-settings-ux-ui";
import { DialogPasswordPolicy } from "./4-settings-psw-policy";
import { AdvancedSettings } from "./5-settings-advanced";
import { SectionTitle } from "./8-shared-classes";

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
