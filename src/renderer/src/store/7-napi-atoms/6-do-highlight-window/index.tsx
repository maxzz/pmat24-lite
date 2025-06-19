import { atom } from "jotai";
import { type WindowHighlighterParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

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
