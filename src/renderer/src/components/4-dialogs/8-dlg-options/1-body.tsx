import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Checkbox, Label } from "@/ui";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const snap = useSnapshot(appSettings).files.itemsState;
    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <div className="py-4">Settings</div>
                <D.DialogCloseButton onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="mt-2 px-4">
                <Label className="block mb-4">File list options</Label>

                <div className="flex flex-col gap-2">
                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        <Checkbox checked={snap.showIndex} onCheckedChange={v => appSettings.files.itemsState.showIndex = !!v} />
                        Show file index
                    </Label>
                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        <Checkbox checked={snap.showChosen} onCheckedChange={v => appSettings.files.itemsState.showChosen = !!v} />
                        Show user defined name instead of domain name
                    </Label>
                </div>

            </div>

        </div>
    );
}
