import { type Setter, atom } from "jotai";
import { debounce } from "@/utils";
import { type Meta, FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type TargetClientRect } from "../../../../../../../shell/xternal-to-renderer/7-napi-calls";
import { type FieldHighlightCtx } from "../../9-types";
import { type R2MParams } from "@shared/ipc-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";
import { doHighlightFieldAtom } from "@/store/7-napi-atoms";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!focusOrBlur) { // No need so far blur events
            return;
        }

        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        const params: HighlightParams = { hwnd: hwndHandle.hwnd, isBrowser: hwndHandle.isBrowser, focusOn: focusOrBlur, fileUs, formIdx };

        if (nFieldCtx) {
            debouncedNormalHighlight(set, nFieldCtx, params);
        }
        else if (mFieldCtx) {
            debouncedManualHighlight(set, mFieldCtx, params);
        }
    }
);

type HighlightParams = R2MParams.HighlightRect & { isBrowser: boolean; focusOn: boolean; fileUs: FileUs; formIdx: FormIdx; };

const debouncedNormalHighlight = debounce((set: Setter, nFieldCtx: NormalField.RowCtx, params: HighlightParams) => set(normalFieldHighlightAtom, nFieldCtx, params), 500);
const debouncedManualHighlight = debounce((set: Setter, mFieldCtx: ManualFieldState.Ctx, params: HighlightParams) => set(manualFieldHighlightAtom, mFieldCtx, params), 500);

const normalFieldHighlightAtom = atom(
    null,
    (get, set, nFieldCtx: NormalField.RowCtx, { hwnd, isBrowser, focusOn, fileUs, formIdx }: HighlightParams) => {
        const metaField: Meta.Field = nFieldCtx.metaField;
        const path: Meta.Path = metaField.path;

        const params: R2MParams.HighlightRect = {
            hwnd,
            rect: isBrowser ? undefined : getFieldRect(path.loc),
            accId: isBrowser ? metaField.pidx : undefined,
        };
        set(doHighlightFieldAtom, params);

        //console.log(`%cnormalFieldHighlightAtom: isBrower: ${isBrowser}, params: "${JSON.stringify(params)}", focusOn: ${focusOn}`, 'color: magenta');
    }
);

const manualFieldHighlightAtom = atom(
    null,
    (get, set, mFieldCtx: ManualFieldState.Ctx, { hwnd, focusOn }: HighlightParams) => {
        if (mFieldCtx.type === 'pos') {
            const xState = get(mFieldCtx.xAtom);
            const yState = get(mFieldCtx.yAtom);

            if (xState.error || yState.error) {
                console.log('manualFieldHighlightAtom: x or y is invalid'); //TODO: after error state paste did not trigger highlight
                return;
            }

            const x = +xState.data;
            const y = +yState.data;

            const rect = { left: x - 1, top: y - 1, right: x + 1, bottom: y + 1 };

            const params: R2MParams.HighlightRect = { hwnd, rect, };
            set(doHighlightFieldAtom, params);

            //console.log(`%cmanualFieldHighlightAtom hwnd: ${hwnd}: x:${x} y:${y}`, 'color: magenta');
        }
    }
);

/**
 * Get location of field in the form as the last items in locations string.
 */
function getFieldRect(loc: string | undefined): TargetClientRect | undefined {
    if (!loc) {
        return undefined;
    }

    const allStr = loc.split('|').pop() || '';
    if (!allStr) {
        return undefined;
    }

    let [left, top, right, bottom] = allStr.split(' ').map(Number);
    return { left, top, right, bottom };
}
