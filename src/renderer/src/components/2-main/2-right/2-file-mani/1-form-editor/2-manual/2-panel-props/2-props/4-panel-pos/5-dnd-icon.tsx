import { atom, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { invokeMainTyped } from "@/xternal-to-main";
import { IconDndTarget } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState } from "@/store";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    return (
        <div className="my-4 space-y-1">
            {/* <div>
                Click on the preview window below to select the click point.
            </div> */}

            <NapiPicker item={item} fileUsCtx={fileUsCtx} />
        </div>
    );
}

function NapiPicker({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const getDndPosition = useSetAtom(getDndPositionAtom);

    async function onClick(e: React.MouseEvent<HTMLDivElement>) {
        console.log('NapiPicker.onClick');
        await getDndPosition({ item, fileUsCtx });
    }

    return (
        <div className="p-1 inline-block border-border border rounded shadow" onClick={onClick}>
            <IconDndTarget className="size-8" />
        </div>
    );
}

const getDndPositionAtom = atom(
    null,
    async (get, set, { item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }): Promise<void> => {
        const hwndAtom = fileUsCtx.formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom;
        const hwnd = get(hwndAtom);
        if (!hwnd) {
            console.log('hwnd not found');
            return;
        }

        const data = await invokeMainTyped({ type: 'r2mi:get-window-pos', hwnd: hwnd.hwnd });
        console.log('done. data', data);

    }
);