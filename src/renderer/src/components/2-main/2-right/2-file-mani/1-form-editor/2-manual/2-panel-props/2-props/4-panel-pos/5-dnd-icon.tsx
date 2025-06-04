import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { invokeMainTyped } from "@/xternal-to-main";
import { IconColorPickerChrome } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState } from "@/store";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
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

const getDndPositionAtom = atom(
    null,
    async (get, set, { item, fileUsCtx }: { item: ManualFieldState.CtxPos;fileUsCtx: FileUsCtx; }): Promise<void> => {
        const hwndAtom = fileUsCtx.formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom;
        const hwnd = get(hwndAtom);
        if (!hwnd) {
            console.log('hwnd not found');
            return;
        }
        
        const data = await invokeMainTyped({ type: 'r2mi:get-window-pos', hwnd: hwnd.hwnd });
        console.log('data', data);
        
    }
);