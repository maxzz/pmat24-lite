import { useCallback, useEffect } from "react";
import { type Getter, type Setter, atom, useSetAtom } from "jotai";
import { type GetTargetWindowResult, type WindowHighlighterParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";
import { useSawHandleListener } from "../1-do-get-hwnd";

const lastHighlightingedAtom = atom(false);

const doShowTargetAtom = atom(
    null,
    async (get, set, params: WindowHighlighterParams | undefined) => {
        const res = await invokeMainTyped({ type: 'r2mi:highlight-target', params });

        console.log('doShowTargetAtom', res);
    }
);

const doHideTargetAtom = atom(
    null,
    async (get, set) => {
        const res = await invokeMainTyped({ type: 'r2mi:highlight-target' });

        console.log('doHideTargetAtom', res);
    }
);

//TODO: move out of this file
export function useSawHandleMonitor() {
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
                if (newVal?.hwnd === prevVal?.hwnd) {
                    return;
                }

                console.log('useSawHandleListener', newVal);

                const rect = newVal?.screenRect || { left: 20, top: 40, right: 300, bottom: 500 }; //TODO: there is no screenRect in GetTargetWindowResult?

                if (newVal?.hwnd) {
                    set(doShowTargetAtom, { hwnd: newVal.hwnd, rect, highlightColor: '#0000FF', width: 5 });
                } else {
                    set(doHideTargetAtom);
                }
            }, []
        )
    );
}
