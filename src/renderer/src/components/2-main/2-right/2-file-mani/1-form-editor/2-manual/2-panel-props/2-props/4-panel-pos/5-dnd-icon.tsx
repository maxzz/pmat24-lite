import { ManualFieldState } from "@/store";
import { IconColorPicker, IconColorPickerChrome } from "@/ui/icons";
import { NewPositionIcon } from "./6-dnd-target-pos";

export function NewInputXY({ item }: { item: ManualFieldState.CtxPos; }) {
    return (
        <div className="my-4 space-y-1">
            <div>
                Click on the preview window below to select the click point.
            </div>

            <NapiPicker />
        </div>
    );
}

function NapiPicker() {
    return (
        <div className="inline-block bg-primary-950 border-primary-700 border rounded shadow-inner shadow-primary-100/10">
            <IconColorPickerChrome className="size-8" />
        </div>
    );
}