import { useState } from "react";
import { atom, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { invokeMainTyped, R2MCalls } from "@/xternal-to-main";
import { IconDndTarget } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState } from "@/store";
import { useBuildStateLink } from "./10-nun-build-state-link";
import { TestTargetWindowPosition } from "./1-test-target-position";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    useBuildStateLink(item);

    return (
        <div className="my-4 space-x-2">
            {/* <div>
                Click on the preview window below to select the click point.
            </div> */}

            <NapiPicker item={item} fileUsCtx={fileUsCtx} />
            <TestTargetWindowPosition />
        </div>
    );
}

function NapiPicker({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const dndActionInit = useSetAtom(dndActionInitAtom);
    const dndActionMove = useSetAtom(dndActionMoveAtom);
    const dndActionStop = useSetAtom(dndActionStopAtom);

    const [isDown, setIsDown] = useState(false);
    const [isBusy, setIsBusy] = useState(false);

    // async function onDragStart(event: React.DragEvent<HTMLDivElement>) {
    //     //event.dataTransfer.setData('text/plain', 'Drag started');

    //     // await dndActionInit({ item, fileUsCtx });
    //     console.log('NapiPicker.onPointerDown');
    //     setIsDown(true);

    // }

    // async function onDragEnd(event: React.DragEvent<HTMLDivElement>) {
    //     //event.dataTransfer.setData('text/plain', 'Drag ended');

    //     // await dndActionStop({ item, fileUsCtx });
    //     console.log('NapiPicker.onPointerUp');
    //     setIsDown(false);
    // }

    // async function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    //     event.preventDefault();
    //     //event.dataTransfer.dropEffect = 'move';

    //     // if (!isDown) {
    //     //     return;
    //     // }
    //     // if (isBusy) {
    //     //     return;
    //     // }
    //     setIsBusy(true);
    //     // await dndActionMove({ item, fileUsCtx });
    //     console.log('NapiPicker.onPointerMove');
    //     setIsBusy(false);
    // }

    async function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);

        try {
            const res = await dndActionInit({ item, fileUsCtx });
            console.log('%cDragging. init', 'color:magenta', res);
        } catch (err) {
            console.error(err);
        }
        setIsDown(true);
    }

    async function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
        try {
            const res = dndActionStop();
            console.log('%cDragging. stop', 'color:magenta', res);
        } catch (err) {
            console.error(err);
        }
        setIsDown(false);
    }

    async function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDown) {
            return;
        }
        if (isBusy) {
            return;
        }
        setIsBusy(true);
        try {
            const res = dndActionMove();
            console.log('%cDragging. move', 'color:magenta', res);
        } catch (err) {
            console.error(err);
        }
        setIsBusy(false);
    }

    return (
        <div
            className="p-1 inline-block border-border border rounded shadow"
            // draggable={true}
            // onDragStart={onDragStart}
            // onDragEnd={onDragEnd}
            // onDragOver={onDragOver}
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

const dndActionMoveAtom = atom(
    null,
    (get, set): void => {
        R2MCalls.getWindowPosAction('move');
    }
);

const dndActionStopAtom = atom(
    null,
    (get, set): void => {
        R2MCalls.getWindowPosAction('stop');
    }
);
