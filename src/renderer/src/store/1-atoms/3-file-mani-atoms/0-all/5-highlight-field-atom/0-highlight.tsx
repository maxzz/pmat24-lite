import { atom } from "jotai";
import { type Meta } from "@/store/manifest";
import { type MFormContextProps, type NFormContextProps } from "../../9-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";
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

            const row: NormalField.RowCtx = nCtx.nAllAtoms.normal.rowCtxs[fieldIdx];
            if (row) {
                const metaField: Meta.Field = row.metaField;
                const path: Meta.Path = metaField.path;
                const rectStr = path.loc; // "x y w h"
                console.log(`highlightFieldAtom normal field location "${rectStr}"`);
                
                //TODO: highlight
            }
        } else if (mCtx) {
            const formIdx = mCtx.formIdx;

            const fileUs = mCtx.mAllAtoms.fileUsCtx.fileUs;
            
            const ctx: ManualFieldState.Ctx = get(mCtx.mAllAtoms.manual.chunksAtom)[fieldIdx];
            if (ctx?.type === 'pos') {
                const x = get(ctx.xAtom);
                const y = get(ctx.yAtom);
                console.log(`highlightFieldAtom manual field location "${x} x ${y}"`);
                
                //TODO: highlight
            }
        }
    }
);
