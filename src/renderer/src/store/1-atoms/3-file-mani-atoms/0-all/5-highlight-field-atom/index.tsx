import { atom } from "jotai";
import { type MFormContextProps, type NFormContextProps } from "../../9-types";

export const highlightFieldAtom = atom(
    null,
    (get, set, { nCtx, mCtx, fieldIdx }: { nCtx: NFormContextProps, mCtx: MFormContextProps; fieldIdx: number; }) => {
        if (nCtx) {
            const formIdx = nCtx.formIdx;

            const row = nCtx.nAllAtoms.normal.rowCtxs[fieldIdx];
            if (row) {
                //TODO: highlight
            }
        } else if (mCtx) {
            const formIdx = mCtx.formIdx;
            
            const ctx = get(mCtx.mAllAtoms.manual.chunksAtom)[fieldIdx];
            if (ctx?.type === 'pos') {
                //TODO: highlight
            }
        }
    }
);
