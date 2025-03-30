import { atom } from "jotai";
import { type MFormContextProps, type NFormContextProps } from "../../9-types";
import { sawHandleAtom } from "@/store/7-napi-atoms";

export const highlightFieldAtom = atom(
    null,
    (get, set, { nCtx, mCtx, fieldIdx }: { nCtx: NFormContextProps, mCtx: MFormContextProps; fieldIdx: number; }) => {

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            console.log('highlightFieldAtom: no hwnd'); // temp trace
            return;
        }

        if (nCtx) {
            const formIdx = nCtx.formIdx;

            const row = nCtx.nAllAtoms.normal.rowCtxs[fieldIdx];
            if (row) {
                //TODO: highlight
            }
        } else if (mCtx) {
            const formIdx = mCtx.formIdx;

            const fileUs = mCtx.mAllAtoms.fileUsCtx.fileUs;
            
            const ctx = get(mCtx.mAllAtoms.manual.chunksAtom)[fieldIdx];
            if (ctx?.type === 'pos') {
                const x = get(ctx.xAtom);
                const y = get(ctx.yAtom);
                //TODO: highlight
            }
        }
    }
);
