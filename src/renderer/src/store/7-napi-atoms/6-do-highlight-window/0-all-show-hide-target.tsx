import { useCallback } from "react";
import { type Getter, type Setter, atom } from "jotai";
import { type GetTargetWindowResult, type WindowHighlighterParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";
import { useSawHandleListener } from "../1-do-get-hwnd";

//const isHighlightingAtom = atom(false);

export const doShowTargetAtom = atom(
    null,
    async (get, set, params: WindowHighlighterParams | undefined) => {
        const res = await invokeMainTyped({ type: 'r2mi:highlight-target', params });
        
        console.log('doShowTargetAtom', res);
    }
);

export const doHideTargetAtom = atom(
    null,
    async (get, set) => {
        const res = await invokeMainTyped({ type: 'r2mi:highlight-target' });
        
        console.log('doHideTargetAtom', res);
    }
);

//TODO: move out of this file
export function useSawHandleMonitor() {
    useSawHandleListener(
        useCallback(
            (get: Getter, set: Setter, newVal: GetTargetWindowResult | null, prevVal: GetTargetWindowResult | null) => {
                if (newVal?.hwnd !== prevVal?.hwnd) {
                    console.log('useSawHandleListener', newVal);
                }
            }, []
        )
    );
}
