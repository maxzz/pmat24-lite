import { useCallback, useEffect } from "react";
import { type Getter, type Setter, atom, useSetAtom } from "jotai";
import { compareRect } from "@/utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { type GetTargetWindowResult, type WindowHighlighterParams } from "@shared/ipc-types";
import { useSawHandleListener } from "../1-do-get-hwnd";

export function useSawRectMonitor() {
    const doRect = useSetAtom(doRectAtom);

    useEffect(
        () => {
            return () => {
                doRect({ action: 'hide' });
            };
        }, []
    );

    useSawHandleListener(
        useCallback(
            (get: Getter, set: Setter, newVal: GetTargetWindowResult | null, prevVal: GetTargetWindowResult | null) => {
                if (!newVal?.hwnd) {
                    set(doRectAtom, { action: 'hide' });
                    return;
                }

                const unchanged = prevVal?.screenClientRect && compareRect(newVal.screenClientRect, prevVal.screenClientRect) && get(highlightIsOnAtom);
                if (!unchanged) {
                    set(doRectAtom, { action: 'show', params: { /*hwnd: newVal.hwnd,*/ rect: newVal.screenWindowRect, highlightColor: '#ff8800', width: 5 } });
                    // set(doRectAtom, { action: 'show', params: { /*hwnd: newVal.hwnd,*/ rect: newVal.screenClientRect, highlightColor: '#ff8800', width: 5 } });
                    // set(doRectAtom, { action: 'show', params: { hwnd: newVal.hwnd, /*rect: newVal.screenClientRect,*/ highlightColor: '#ff8800', width: 5 } });
                }
            }, []
        )
    );
}

const highlightIsOnAtom = atom(false);

const doRectAtom = atom(
    null,
    async (get, set, { action, params }: { action: 'show', params: WindowHighlighterParams; } | { action: 'hide', params?: undefined; }) => {
        if (!hasMain()) {
            return;
        }

        let error: string | undefined;

        if (action === 'show') {
            set(highlightIsOnAtom, true);
        } else {
            if (!get(highlightIsOnAtom)) {
                return;
            }
            set(highlightIsOnAtom, false);
        }

        error = await invokeMainTyped({ type: 'r2mi:highlight-target', params });
        error && console.log('doTargetWindowAtom', error);
    }
);
