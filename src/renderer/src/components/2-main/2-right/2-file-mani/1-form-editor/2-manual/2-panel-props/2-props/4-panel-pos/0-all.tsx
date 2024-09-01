import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { buildState } from "./8-pos-build-state";
import { InputXY } from "./2-input-xy";

// function eventNumber(e: React.ChangeEvent<HTMLInputElement>, defValue: number = 0) {
//     let n = parseInt(e.target.value);
//     if (Number.isNaN(n)) {
//         n = defValue;
//     }
//     return n;
// }

export function PropsEditorPos({ item }: { item: ManualFieldState.PosForAtoms; }) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);

    useEffect(() => {
        const unsubscribe = subscribe(buildState.getPosProgress,
            () => {
                console.log('buildState.getPosProgress.point', buildState.getPosProgress.point);
                //TODO: use debounce

                setPosValueX((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.x || 0}` }));
                setPosValueY((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.y || 0}` }));
            }
        );
        return unsubscribe;
    }, []);

    return (<>
        <div className="flex items-center space-x-2">
            <RowInputWLabel stateAtom={item.xAtom} label="x" className="w-12" />
            <RowInputWLabel stateAtom={item.yAtom} label="y" className="w-12" />

            {/* <InputField className="w-12" label="x" horizontal={true} value={`${snap.x}`} onChange={(e) => item.x = eventNumber(e)} />
                <InputField className="w-12" label="y" horizontal={true} value={`${snap.y}`} onChange={(e) => item.y = eventNumber(e)} /> */}
        </div>

        <InputXY item={item} />
    </>);
}

// TODO: zoom in/out buttons
// TODO: button: select the click point
// app preview or drag with client rects recalculation