import { useState } from "react";
import { type PrimitiveAtom, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { IconDndTarget } from "@/ui/icons";
import { type FileUsCtx, type ManualFieldState, type HighlightHwnd, dndActionInitAtom, dndActionAtom } from "@/store";
import { useStateNapiPosTracker } from "./2-picker-dnd-inputs";
//import { TestTargetWindowPosition } from "./17-nun-picker-dnd-w-dom";

export function NewInputXY({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    useStateNapiPosTracker(item);

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

    async function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const elm = event.target as HTMLDivElement;
        elm.setPointerCapture(event.pointerId);

        try {
            const res = await dndActionInit(getFileUsConnectedHwndAtom(fileUsCtx));
            console.log('%cDragging. init', 'color:magenta', res);
            setIsDown(true);
        } catch (err) {
            console.error(err);
        }
    }

    function onPointerUp() {
        if (isDown) {
            dndAction('stop');
            setIsDown(false);
        }
    }

    function onPointerMove() {
        if (isDown) {
            dndAction('move');
        }
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

function getFileUsConnectedHwndAtom(fileUsCtx: FileUsCtx): PrimitiveAtom<HighlightHwnd> {
    return fileUsCtx.formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom;
}
