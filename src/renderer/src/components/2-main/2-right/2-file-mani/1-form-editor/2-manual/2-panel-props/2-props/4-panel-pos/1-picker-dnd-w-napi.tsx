import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { invokeMainTyped, R2MCalls } from "@/xternal-to-main";
import { IconDndTarget } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState } from "@/store";
import { useBuildStateLink } from "./33-nun-build-state-link";
import { TestTargetWindowPosition } from "./17-nun-picker-dnd-w-dom";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    useBuildStateLink(item);

    return (
        <div className="my-4 space-x-2">
            {/* <div>
                Click on the preview window below to select the click point.
            </div> */}

            <NapiPicker item={item} fileUsCtx={fileUsCtx} />
        </div>
    );
}

function NapiPicker({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const dndActionInit = useSetAtom(dndActionInitAtom);
    const dndAction = useSetAtom(dndActionAtom);

    const [isDown, setIsDown] = useState(false);
    const [isBusy, setIsBusy] = useState(false);

    async function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);

        try {
            const res = await dndActionInit({ item, fileUsCtx });
            console.log('%cDragging. init', 'color:magenta', res);
            setIsDown(true);
        } catch (err) {
            console.error(err);
        }
    }

    function onPointerUp() {
        try {
            const res = dndAction('stop');
            console.log('%cDragging. stop', 'color:magenta', res);
        } catch (err) {
            console.error(err);
        }
        setIsDown(false);
    }

    function onPointerMove() {
        if (!isDown) {
            return;
        }
        if (isBusy) {
            return;
        }
        setIsBusy(true);
        try {
            const res = dndAction('move');
            console.log('%cDragging. move', 'color:magenta', res);
        } catch (err) {
            console.error(err);
        }
        setIsBusy(false);
    }

    return (
        <div
            className="p-1 inline-block border-border border rounded shadow"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
        >
            <IconDndTarget className="size-8" />
        </div>
    );
}

const dndActionInitAtom = atom(
    null,
    async (get, set, { item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }): Promise<string> => {

        const hwndAtom = fileUsCtx.formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom;
        const hwnd = get(hwndAtom);
        if (!hwnd) {
            console.log('hwnd not found');
            return 'no.wnd';
        }

        const data = await invokeMainTyped({ type: 'r2mi:get-window-pos-init', params: { what: 'init', hwnd: hwnd.hwnd } });
        if (data) {
            console.log('failed: dnd.init', data);
        }
        return data;
    }
);

const dndActionAtom = atom(
    null,
    (get, set, action: 'move' | 'stop'): void => {
        R2MCalls.getWindowPosAction(action);
    }
);
