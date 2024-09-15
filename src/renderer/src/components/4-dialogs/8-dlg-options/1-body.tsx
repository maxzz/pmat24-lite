import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Checkbox, Input, Label } from "@/ui";

export function DialogOptionsBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const snapItems = useSnapshot(appSettings).files.itemsState;
    const snapMani = useSnapshot(appSettings, { sync: true }).right.mani;
    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <div className="py-4">Settings</div>
                <D.DialogCloseButton onClick={() => setIsOpen(false)} />
            </D.DialogHeader>

            <div className="my-2 px-4 grid grid-cols-1">
                <Label className="block mb-2 font-semibold">
                    File list options
                </Label>

                <div className="flex flex-col gap-2">
                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        <Checkbox checked={snapItems.showIndex} onCheckedChange={v => appSettings.files.itemsState.showIndex = !!v} />
                        Show file index
                    </Label>

                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        <Checkbox checked={snapItems.showIeMarker} onCheckedChange={v => appSettings.files.itemsState.showIeMarker = !!v} />
                        Show IE warning icon
                    </Label>

                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        <Checkbox checked={snapItems.showChosen} onCheckedChange={v => appSettings.files.itemsState.showChosen = !!v} />
                        Show user defined name instead of domain name
                    </Label>
                </div>

                <div className="my-4">
                    <Label className="block mb-2 font-semibold">
                        Password policy options
                    </Label>

                    <Label className="text-xs font-normal flex place-items-center gap-2">
                        Number of generated passwords
                        <Input value={snapMani.nToGenerate} onChange={(e) => appSettings.right.mani.nToGenerate = +e.target.value} />
                    </Label>

                </div>

            </div>
        </div>
    );
}
