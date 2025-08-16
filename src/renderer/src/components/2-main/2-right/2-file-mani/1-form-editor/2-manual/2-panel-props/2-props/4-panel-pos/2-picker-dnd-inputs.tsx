import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type ManualFieldState } from "@/store/2-file-mani-atoms";
import { stateNapiPosTracker } from "@/store";

export function useStateNapiPosTracker(item: ManualFieldState.CtxPos) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);

    useEffect(
        () => {
            const unsubscribe = subscribe(stateNapiPosTracker.current,
                () => {
                    const { x, y, isInside } = stateNapiPosTracker.current;
                    if (isInside) {
                        setPosValueX((prev) => ({ ...prev, data: `${x}` }));
                        setPosValueY((prev) => ({ ...prev, data: `${y}` }));
                    }
                }
            );
            return unsubscribe;
        }, []
    );
}
