import { atom } from "jotai";
import { type Meta } from "@/store/manifest";
import { type NFieldHighlightCtx, type MFieldHighlightCtx, type FieldHighlightCtx } from "../../9-types";
import { doHighlightFieldAtom, sawHandleAtom } from "@/store/7-napi-atoms";
import { type TargetClientRect } from "../../../../../../../shell/xternal-to-renderer/7-napi-calls";
import { R2MParams } from "@shared/ipc-types";
import { type NormalField } from "../../1-normal-fields";
import { type ManualFieldState } from "../../2-manual-fields";

export const fieldHighlightAtom = atom(
    null,
    (get, set, { nFieldCtx, focusOn }: FieldHighlightCtx & { focusOn: boolean; }) => {
        if (!focusOn) { // No need so far blur events
            return;
        }

        const hwndHandle = get(sawHandleAtom);
        if (!hwndHandle) {
            console.log('normalFieldHighlightAtom: no hwndHandle'); // temp trace
            return;
        }
        const hwnd = hwndHandle.hwnd;
        const isBrower = hwndHandle.isBrowser;

        if (nFieldCtx) {
            const metaField: Meta.Field = nFieldCtx.metaField;
            const path: Meta.Path = metaField.path;

            const params: R2MParams.HighlightRect = {
                hwnd,
                rect: isBrower ? undefined : getFieldRect(path.loc),
                accId: isBrower ? metaField.pidx : undefined,
            };
            set(doHighlightFieldAtom, params);

            console.log(`normalFieldHighlightAtom.normal: isBrower: ${isBrower}, params: "${JSON.stringify(params)}", focusOn: ${focusOn}`);
        }
    }
);

export const normalFieldHighlightAtom = atom(
    null,
    (get, set, { nFieldCtx, focusOn }: { nFieldCtx?: NormalField.RowCtx; } & { focusOn: boolean; }) => {
        if (!focusOn) { // No need so far blur events
            return;
        }

        const hwndHandle = get(sawHandleAtom);
        if (!hwndHandle) {
            console.log('normalFieldHighlightAtom: no hwndHandle'); // temp trace
            return;
        }
        const hwnd = hwndHandle.hwnd;
        const isBrower = hwndHandle.isBrowser;

        if (nFieldCtx) {
            const metaField: Meta.Field = nFieldCtx.metaField;
            const path: Meta.Path = metaField.path;

            const params: R2MParams.HighlightRect = {
                hwnd,
                rect: isBrower ? undefined : getFieldRect(path.loc),
                accId: isBrower ? metaField.pidx : undefined,
            };
            set(doHighlightFieldAtom, params);

            console.log(`normalFieldHighlightAtom.normal: isBrower: ${isBrower}, params: "${JSON.stringify(params)}", focusOn: ${focusOn}`);
        }
    }
);

export const manualFieldHighlightAtom = atom(
    null,
    (get, set, { mFieldCtx, focusOn }: { mFieldCtx?: ManualFieldState.Ctx; } & { focusOn: boolean; }) => {
        if (!focusOn) { // No need so far blur events
            return;
        }

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            console.log('normalFieldHighlightAtom: no hwndHandle'); // temp trace
            return;
        }

        if (mFieldCtx?.type === 'pos') {
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

    const [x, y, w, h] = allStr.split(' ').map(Number);
    return { left: x, top: y, right: x + w, bottom: y + h };
}
