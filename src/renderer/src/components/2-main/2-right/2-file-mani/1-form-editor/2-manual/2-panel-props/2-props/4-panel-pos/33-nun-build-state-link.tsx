import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { buildState } from "./19-nun-pos-build-state";

export function useBuildStateLink(item: ManualFieldState.CtxPos) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);

    useEffect(
        () => {
            const unsubscribe = subscribe(buildState.getPosProgress,
                () => {
                    console.log('buildState.getPosProgress.point', buildState.getPosProgress.point);
                    //TODO: use debounce and don't do highlight during dragging

                    setPosValueX((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.x || 0}` }));
                    setPosValueY((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.y || 0}` }));
                }
            );
            return unsubscribe;
        }, []
    );
}

//TODO: Add button: select the click point
//TODO: App preview or drag with client rects recalculation
//TODO: Add zoom in/out buttons

//05.31.25
//TODO: manifest default name
//TODO: proper grid
//TODO: only one call get tlw info with PROCESS NAME i.e. is open (no need to check minimize)
