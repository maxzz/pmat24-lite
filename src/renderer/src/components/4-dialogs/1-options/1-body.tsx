import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Checkbox, Label } from "@/ui";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const snap = useSnapshot(appSettings).ui.fileListItems;
    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <div className="py-4">Options</div>
                <D.DialogCloseButton onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="mt-4 px-4">
                <Label className="text-xs font-normal flex place-items-center gap-1">
                    <Checkbox checked={snap.showIndex} onCheckedChange={v => appSettings.ui.fileListItems.showIndex = !!v} />
                    Show files index
                </Label>

            </div>

        </div>
    );
}
