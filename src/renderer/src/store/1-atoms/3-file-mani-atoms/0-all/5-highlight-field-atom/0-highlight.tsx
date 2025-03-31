import { atom } from "jotai";
import { type Meta } from "@/store/manifest";
// import { type MFormContextProps, type NFormContextProps } from "../../9-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";
import { sawHandleAtom } from "@/store/7-napi-atoms";

export const highlightFieldAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx }: { nFieldCtx: NormalField.RowCtx, mFieldCtx?: ManualFieldState.Ctx; }) => {

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            console.log('highlightFieldAtom: no hwnd'); // temp trace
            return;
        }

        if (nFieldCtx) {
            //nCtx: NFormContextProps
            // const formIdx = nCtx.formIdx;
            // const fileUs = nCtx.nAllAtoms.fileUsCtx.fileUs;
            // const fieldCtx: NormalField.RowCtx = nCtx.nAllAtoms.normal.rowCtxs[fieldIdx];

            if (nFieldCtx) {
                const metaField: Meta.Field = nFieldCtx.metaField;
                const path: Meta.Path = metaField.path;
                const rectStr = path.loc; // "x y w h"
                const prIndex = metaField.pidx;

                console.log(`highlightFieldAtom normal field location "${rectStr}", prIndex: ${prIndex}`);

                //TODO: highlight: it can be web or win32
            }
        } else if (mFieldCtx) {
            // const fieldCtx: ManualFieldState.Ctx = get(mCtx.mAllAtoms.manual.chunksAtom)[fieldIdx];

            if (mFieldCtx.type === 'pos') {
                const x = get(mFieldCtx.xAtom);
                const y = get(mFieldCtx.yAtom);
                console.log(`highlightFieldAtom manual field location "${x} x ${y}"`);

                //TODO: highlight
            }
        }
    }
);
