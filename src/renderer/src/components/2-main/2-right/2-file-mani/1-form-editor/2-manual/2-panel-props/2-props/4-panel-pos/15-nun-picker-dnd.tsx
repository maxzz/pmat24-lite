import { atom, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { invokeMainTyped } from "@/xternal-to-main";
import { IconDndTarget } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState } from "@/store";
import { useBuildStateLink } from "./33-nun-build-state-link";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    useBuildStateLink(item);

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
    // const getDndPosition = useSetAtom(getDndPositionAtom);

    async function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        // event.preventDefault();
        // event.stopPropagation();
        // setTimeout(() => getDndPosition({ item, fileUsCtx }), 100);
        // await getDndPosition({ item, fileUsCtx });
        console.log('NapiPicker.onPointerDown');
    }

    async function onClick() {
        // setTimeout(() => getDndPosition({ item, fileUsCtx }), 100);
        // await getDndPosition({ item, fileUsCtx });
        console.log('NapiPicker.onClick');
    }

    return (
        <div className="p-1 inline-block border-border border rounded shadow" onPointerDown={onPointerDown}>
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

        // const data = await invokeMainTyped({ type: 'r2mi:get-window-pos', params: { what: 'init', hwnd: hwnd.hwnd } });
        // console.log('done. data', data);

    }
);
