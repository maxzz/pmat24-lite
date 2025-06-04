import { ManualFieldState } from "@/store";
import { IconColorPicker, IconColorPickerChrome } from "@/ui/icons";
import { NewPositionIcon } from "./6-dnd-target-pos";

export function NewInputXY({ item }: { item: ManualFieldState.CtxPos }) {
    return (
        <div className="!mt-6 space-y-2">
            <div>
                Click on the preview window below to select the click point.
            </div>

            {/* <div className="aspect-auto h-28 bg-primary-700 border-primary-400 border grid place-items-center cursor-pointer">
                <div className="text-[.65rem]">
                    <IconTarget className="w-12 h-12" />
                </div>
            </div> */}

            <NapiPicker />

            <div className="flex items-center space-x-2">

                <IconColorPickerChrome className="size-8" />

                {/* <div className="p-2 bg-primary-950 border-primary-700 border rounded shadow-inner shadow-primary-100/10">
                    <IconColorPicker className="size-7 stroke-[1.5]" />
                </div> */}

                {/* <TargetPositionDisplay /> */}
                {/* <NewPositionIcon /> */}

                {/* <IconLibra className="w-6 h-6 stroke-[1]" />
                <IconSearch className="w-5 h-5 stroke-[1]" /> */}
            </div>

        </div>
    );
}

function NapiPicker() {
    return (
        <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-950 border-primary-700 border rounded shadow-inner shadow-primary-100/10">
                <IconColorPickerChrome className="size-8" />
            </div>
        </div>
    );
}