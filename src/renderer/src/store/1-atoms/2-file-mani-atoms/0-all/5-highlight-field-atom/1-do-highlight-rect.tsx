import { atom } from "jotai";
import { type Meta, FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type TargetClientRect } from "../../../../../../../shell/xternal-to-renderer/7-napi-calls";
import { type FieldHighlightCtx } from "../../9-types";
import { type R2MParams } from "@shared/ipc-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";
import { doHighlightFieldAtom } from "@/store/7-napi-atoms";
import { debounce } from "@/utils";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!focusOrBlur) { // No need so far blur events
            return;
        }

        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            //findHwnd(hwndHandle);
            console.log('temp. doHighlightRectAtom: no hwndHandle'); // temp trace
            return;
        }

        //console.log(`%cdoHighlightRectAtom hwnd: ${hwndHandle.hwnd}`, 'color: magenta');

        const params = { hwnd: hwndHandle.hwnd, isBrowser: hwndHandle.isBrowser, focusOn: focusOrBlur, fileUs, formIdx };

        if (nFieldCtx) {
            //set(normalFieldHighlightAtom, nFieldCtx, params);
            debouncedNormalHighlight(set, nFieldCtx, params);
        }
        else if (mFieldCtx) {
            //set(manualFieldHighlightAtom, mFieldCtx, params);
            debouncedManualHighlight(set, mFieldCtx, params);
        }
    }
);

const debouncedNormalHighlight = debounce((set, nFieldCtx, params) => {
    set(normalFieldHighlightAtom, nFieldCtx, params);
}, 750);

const debouncedManualHighlight = debounce((set, mFieldCtx, params) => {
    set(manualFieldHighlightAtom, mFieldCtx, params);
}, 750);

const normalFieldHighlightAtom = atom(
    null,
    (get, set, nFieldCtx: NormalField.RowCtx, { hwnd, isBrowser, focusOn, fileUs, formIdx }: { hwnd: string; isBrowser: boolean; focusOn: boolean; fileUs: FileUs; formIdx: FormIdx; }) => {
        const bounds = fileUs.parsedSrc?.meta?.[formIdx]?.view?.bounds;
        if (!bounds) {
            console.log('no bounds');
            return;
        }

        const metaField: Meta.Field = nFieldCtx.metaField;
        const path: Meta.Path = metaField.path;

        const params: R2MParams.HighlightRect = {
            hwnd,
            rect: isBrowser ? undefined : getFieldRect(path.loc, bounds),
            accId: isBrowser ? metaField.pidx : undefined,
        };
        set(doHighlightFieldAtom, params);

        console.log(`normalFieldHighlightAtom.normal: isBrower: ${isBrowser}, params: "${JSON.stringify(params)}", focusOn: ${focusOn}`);
    }
);

const manualFieldHighlightAtom = atom(
    null,
    (get, set, mFieldCtx: ManualFieldState.Ctx, { hwnd, focusOn }: { hwnd: string; isBrowser: boolean; focusOn: boolean; }) => {
        if (mFieldCtx.type === 'pos') {
            const x = +get(mFieldCtx.xAtom).data;
            const y = +get(mFieldCtx.yAtom).data;
            const rect = { left: x - 1, top: y - 1, right: x + 1, bottom: y + 1 };

            console.log('manualFieldHighlightAtom', x, y);

            const params: R2MParams.HighlightRect = { hwnd, rect, };
            set(doHighlightFieldAtom, params);

            console.log(`manualFieldHighlightAtom.manual: location "${x} x ${y}", focusOn: ${focusOn}`);
        }
    }
);

/**
 * Get location of field in the form as the last items in locations string.
 * @param loc - // "x y w h"
 */
function getFieldRect(loc: string | undefined, bounds: Meta.Bounds): TargetClientRect | undefined {
    if (!loc) {
        return undefined;
    }

    const allStr = loc.split('|').pop() || '';
    if (!allStr) {
        return undefined;
    }

    let [left, top, right, bottom] = allStr.split(' ').map(Number);

    left = left - bounds.x1 - 5; // convert to client rect // temp. add hardcoded client area offset
    top = top - bounds.y1 - 39;
    right = right - bounds.x1 - 5;
    bottom = bottom - bounds.y1 - 39;

    return { left, top, right, bottom };

    // const [x, y, w, h] = allStr.split(' ').map(Number);

    // console.log(`loc "${loc}" x:%s y:%s r:%s b:%s width:${w-x} height:${h-y}`, x, y, w, h);
    //     // return { left: x, top: y, right: w-h, bottom: h-y };
    //     // return { left: x, top: y, right: w, bottom: h };

    //     // const [x, y, w, h] = allStr.split(' ').map(Number);
    // return { left: x, top: y, right: x + w, bottom: y + h };
}
