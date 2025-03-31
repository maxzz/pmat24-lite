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

            const fieldCtx: NormalField.RowCtx = nCtx.nAllAtoms.normal.rowCtxs[fieldIdx];
            if (fieldCtx) {
                const metaField: Meta.Field = fieldCtx.metaField;
                const path: Meta.Path = metaField.path;
                const rectStr = path.loc; // "x y w h"
                console.log(`highlightFieldAtom normal field location "${rectStr}"`);
                
                //TODO: highlight: it can be web or win32
            }
        } else if (mCtx) {
            const formIdx = mCtx.formIdx;

            const fileUs = mCtx.mAllAtoms.fileUsCtx.fileUs;
            
            const fieldCtx: ManualFieldState.Ctx = get(mCtx.mAllAtoms.manual.chunksAtom)[fieldIdx];
            if (fieldCtx?.type === 'pos') {
                const x = get(fieldCtx.xAtom);
                const y = get(fieldCtx.yAtom);
                console.log(`highlightFieldAtom manual field location "${x} x ${y}"`);
                
                //TODO: highlight
            }
        }
    }
);
