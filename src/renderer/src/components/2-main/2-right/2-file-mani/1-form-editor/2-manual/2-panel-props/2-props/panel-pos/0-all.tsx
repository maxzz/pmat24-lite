import { HTMLAttributes, useEffect } from "react";
import { subscribe, useSnapshot } from "valtio";
import { SrcriptItemPos, buildState } from "@/store";
import { propsBoxClasses, InputField } from "../../ui";
import { InputXY } from "./2-input-xy";

function eventNumber(e: React.ChangeEvent<HTMLInputElement>, defValue: number = 0) {
    let n = parseInt(e.target.value);
    if (Number.isNaN(n)) {
        n = defValue;
    }
    return n;
}

export function PropsEditorPos({ item, ...rest }: { item: SrcriptItemPos; } & HTMLAttributes<HTMLElement>) {
    const snap = useSnapshot(item);

    useEffect(() => {
        const unsubscribe = subscribe(buildState.getPosProgress, () => {
            console.log('buildState.getPosProgress.point', buildState.getPosProgress.point);
            //TODO: use debounce

            item.x = buildState.getPosProgress.point?.x || 0;
            item.y = buildState.getPosProgress.point?.y || 0;
        });
        return unsubscribe;
    }, []);

    return (
        <div className={propsBoxClasses} {...rest}>
            <div className="flex items-center space-x-2">
                <InputField className="w-12" label="x" horizontal={true} value={`${snap.x}`} onChange={(e) => item.x = eventNumber(e)} />
                <InputField className="w-12" label="y" horizontal={true} value={`${snap.y}`} onChange={(e) => item.y = eventNumber(e)} />
            </div>

            <InputXY item={item} />
        </div>
    );
}

// TODO: zoom in/out buttons
// TODO: button: select the click point
// app preview or drag with client rects recalculation
