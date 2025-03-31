import { atom } from "jotai";
import { type Meta } from "@/store/manifest";
import { type HighlightCtx } from "../../9-types";
// import { type NormalField } from "../../1-normal-fields";
// import { type ManualFieldState } from "../../2-manual-fields";
import { sawHandleAtom } from "@/store/7-napi-atoms";

export const highlightFieldAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx, focusOn }: HighlightCtx & { focusOn: boolean; }) => {
        if (!focusOn) { // No need so far blur events
            return;
        }

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            console.log('highlightFieldAtom: no hwnd'); // temp trace
            return;
        }

        if (nFieldCtx) {
            const metaField: Meta.Field = nFieldCtx.metaField;
            const path: Meta.Path = metaField.path;
            const rect = getFieldRect(path.loc); // "x y w h"
            const prIndex = metaField.pidx;

            console.log(`highlightFieldAtom.normal: location "${JSON.stringify(rect)}", prIndex: ${prIndex}, focusOn: ${focusOn}`);
            //TODO: highlight: it can be web or win32
        }
        else if (mFieldCtx?.type === 'pos') {
            const x = get(mFieldCtx.xAtom);
            const y = get(mFieldCtx.yAtom);

            console.log(`highlightFieldAtom.manual: location "${x} x ${y}", focusOn: ${focusOn}`);
            //TODO: highlight
        }
    }
);

/**
 * Get location of field in the form as the last items in locations string.
 * @param loc - // "x y w h"
 */
function getFieldRect(loc: string | undefined): { x: number; y: number; w: number; h: number; } | undefined {
    if (!loc) {
        return undefined;
    }

    const allStr = loc.split('|').pop() || '';
    if (!allStr) {
        return undefined;
    }

    const [x, y, w, h] = allStr.split(' ').map(Number);
    return { x, y, w, h };
}
