import { atom } from "jotai";
import { FormIdx, type Meta } from "@/store/manifest";
import { type FieldHighlightCtx } from "../../9-types";
import { doHighlightFieldAtom } from "@/store/7-napi-atoms";
import { type TargetClientRect } from "../../../../../../../shell/xternal-to-renderer/7-napi-calls";
import { fileUsOfRightPanelAtom } from "@/store/1-atoms/3-right-panel";
import { R2MParams } from "@shared/ipc-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";

export const doFieldHighlightAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!focusOrBlur) { // No need so far blur events
            return;
        }

        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('temp. doFieldHighlightAtom: no hwndHandle'); // temp trace
            return;
        }

        console.log(`%cdoFieldHighlightAtom hwnd: ${hwndHandle.hwnd}`, 'color: magenta');

        const params = { hwnd: hwndHandle.hwnd, isBrowser: hwndHandle.isBrowser, focusOn: focusOrBlur };

        if (nFieldCtx) {
            set(normalFieldHighlightAtom, nFieldCtx, params);
        }
        else if (mFieldCtx) {
            set(manualFieldHighlightAtom, mFieldCtx, params);
        }
    }
);

const normalFieldHighlightAtom = atom(
    null,
    (get, set, nFieldCtx: NormalField.RowCtx, { hwnd, isBrowser, focusOn }: { hwnd: string; isBrowser: boolean; focusOn: boolean; }) => {

        const metaField: Meta.Field = nFieldCtx.metaField;
        const path: Meta.Path = metaField.path;

        const params: R2MParams.HighlightRect = {
            hwnd,
            rect: isBrowser ? undefined : getFieldRect(path.loc),
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
            const rect = { left: x, top: y, right: x + 10, bottom: y + 10 };

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
function getFieldRect(loc: string | undefined): TargetClientRect | undefined {
    if (!loc) {
        return undefined;
    }

    const allStr = loc.split('|').pop() || '';
    if (!allStr) {
        return undefined;
    }

    const [left, top, right, bottom] = allStr.split(' ').map(Number);
    return { left, top, right, bottom };

    // const [x, y, w, h] = allStr.split(' ').map(Number);

    // console.log(`loc "${loc}" x:%s y:%s r:%s b:%s width:${w-x} height:${h-y}`, x, y, w, h);
    //     // return { left: x, top: y, right: w-h, bottom: h-y };
    //     // return { left: x, top: y, right: w, bottom: h };

    //     // const [x, y, w, h] = allStr.split(' ').map(Number);
    // return { left: x, top: y, right: x + w, bottom: y + h };
}
