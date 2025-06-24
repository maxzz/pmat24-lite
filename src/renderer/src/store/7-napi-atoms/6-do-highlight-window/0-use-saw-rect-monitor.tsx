import { useCallback, useEffect } from "react";
import { type Getter, type Setter, atom, useSetAtom } from "jotai";
import { type GetTargetWindowResult, type WindowHighlighterParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";
import { useSawHandleListener } from "../1-do-get-hwnd";
import { compareRect } from "@/utils";

export function useSawRectMonitor() {
    const doHideTarget = useSetAtom(doHideTargetAtom);

    useEffect(
        () => {
            return () => {
                doHideTarget();
            };
        }, []
    );

    useSawHandleListener(
        useCallback(
            (get: Getter, set: Setter, newVal: GetTargetWindowResult | null, prevVal: GetTargetWindowResult | null) => {
                if (!newVal?.hwnd) {
                    set(doHideTargetAtom);
                    return;
                }

                const unchanged = prevVal?.screenRect && compareRect(newVal.screenRect, prevVal.screenRect) && get(highlightIsOnAtom);
                if (!unchanged) {
                    set(doShowTargetAtom, { hwnd: newVal.hwnd, /*rect: newVal.screenRect,*/ highlightColor: '#ff8800', width: 5 }); // for now use only hwnd for show window client rect
                }
            }, []
        )
    );
}

const highlightIsOnAtom = atom(false);

const doShowTargetAtom = atom(
    null,
    async (get, set, params: WindowHighlighterParams) => {
        set(highlightIsOnAtom, true);

        const error = await invokeMainTyped({ type: 'r2mi:highlight-target', params });
        error && console.log('doShowTargetAtom', error);
    }
);

const doHideTargetAtom = atom(
    null,
    async (get, set) => {
        if (!get(highlightIsOnAtom)) {
            return;
        }
        set(highlightIsOnAtom, false);

        const error = await invokeMainTyped({ type: 'r2mi:highlight-target' });
        error && console.log('doHideTargetAtom', error);
    }
);
