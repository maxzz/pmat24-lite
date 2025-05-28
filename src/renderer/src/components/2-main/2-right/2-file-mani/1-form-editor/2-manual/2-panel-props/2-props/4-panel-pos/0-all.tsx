import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputPos } from "./1-Input-pos";
import { buildState } from "./8-pos-build-state";

export function PropsEditorPos({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);
    const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };

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

    return (<>
        <div className="flex items-center space-x-2">
            <InputPos valueAtom={item.xAtom} label="X" highlightCtx={highlightCtx} />
            <InputPos valueAtom={item.yAtom} label="Y" highlightCtx={highlightCtx} />

            {/* <RowInputWLabel stateAtom={item.xAtom} label="x" className="w-12" />
                <RowInputWLabel stateAtom={item.yAtom} label="y" className="w-12" /> */}

            {/* <InputField className="w-12" label="x" horizontal={true} value={`${snap.x}`} onChange={(e) => item.x = eventNumber(e)} />
                <InputField className="w-12" label="y" horizontal={true} value={`${snap.y}`} onChange={(e) => item.y = eventNumber(e)} /> */}
        </div>

        {/* Maybe later: */}
        {/* <InputXY item={item} /> */}
    </>);
}

// TODO: zoom in/out buttons
// TODO: button: select the click point
// app preview or drag with client rects recalculation

