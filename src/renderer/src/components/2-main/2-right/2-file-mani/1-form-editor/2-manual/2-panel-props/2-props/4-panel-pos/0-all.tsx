import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputPos } from "./1-Input-pos";
import { buildState } from "./9-pos-build-state";
import { ButtonHighlightClick } from "./4-btn-hihglight-click";

export function PropsEditorPos({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };

    useBuildStateLink(item);

    return (<>
        <div className="h-full grid grid-cols-[auto,auto,1fr] grid-row-[1fr,auto] gap-2">
            <InputPos valueAtom={item.xAtom} label="X" highlightCtx={highlightCtx} />
            <InputPos valueAtom={item.yAtom} label="Y" highlightCtx={highlightCtx} />

            <div className="row-start-2 self-end pb-1">
                <ButtonHighlightClick item={item} fileUsCtx={fileUsCtx} />
            </div>
        </div>

        {/* Maybe later: */}{/* <InputXY item={item} /> */}
    </>);
}

function useBuildStateLink(item: ManualFieldState.CtxPos) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);

    useEffect(
        () => {
            const unsubscribe = subscribe(buildState.getPosProgress,
                () => {
                    console.log('buildState.getPosProgress.point', buildState.getPosProgress.point);
                    //TODO: use debounce

                    setPosValueX((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.x || 0}` }));
                    setPosValueY((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.y || 0}` }));
                }
            );
            return unsubscribe;
        }, []
    );
}

// TODO: zoom in/out buttons
// TODO: button: select the click point
// app preview or drag with client rects recalculation
