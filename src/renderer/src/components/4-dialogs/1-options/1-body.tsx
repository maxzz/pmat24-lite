import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Checkbox, Label } from "@/ui";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const snap = useSnapshot(appSettings).fileListOptions.fileListItems;
    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <div className="py-4">Settings</div>
                <D.DialogCloseButton onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="mt-2 px-4">
                <Label className="block mb-2">File list options</Label>

                <Label className="text-xs font-normal flex place-items-center gap-2">
                    <Checkbox checked={snap.showIndex} onCheckedChange={v => appSettings.fileListOptions.fileListItems.showIndex = !!v} />
                    Show file index
                </Label>

            </div>

        </div>
    );
}
