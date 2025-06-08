import { type Getter, type Setter, atom } from "jotai";
import { debounce } from "@/utils";
import { type Meta, FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type TargetClientRect } from "../../../../../shell/xternal-to-renderer/7-napi-calls";
import { type FieldHighlightCtx } from "../../1-atoms/2-file-mani-atoms/9-types";
import { type R2MInvokeParams, type R2MParams } from "@shared/ipc-types";
import { type NormalField } from "../../1-atoms/2-file-mani-atoms/1-normal-fields";
import { type ManualFieldState } from "../../1-atoms/2-file-mani-atoms/2-manual-fields";
import { doHighlightFieldAtom } from "@/store/7-napi-atoms";
import { getHighlightParams } from "./8-get-highlight-data";

export const doHighlightRectAtom = atom(
    null,
    async (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!focusOrBlur) { // No need so far blur events
            return;
        }

        console.log('--debouncedWorkHighlight 1');
        
        debouncedWorkHighlight(set, { nFieldCtx, mFieldCtx, fileUs, formIdx });
        //await set(workHighlightAtom, { nFieldCtx, mFieldCtx, fileUs, formIdx })

        console.log('--debouncedWorkHighlight 2');

        /*
        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        const hihglightParams = getHighlightParams(hwndHandle.hwnd, hwndHandle.isBrowser, { nFieldCtx, mFieldCtx, fileUs, formIdx }, get);
        if (!hihglightParams) {
            return;
        }

        const rv = await set(doHighlightFieldAtom, hihglightParams); //TODO: debounce
        if (rv) {
            //TODO: reset highlight atom and query again
            console.log('rv', rv);
        }
        */

        // const params: HighlightParams = { hwnd: hwndHandle.hwnd, isBrowser: hwndHandle.isBrowser, focusOn: focusOrBlur, fileUs, formIdx };
        //
        // if (nFieldCtx) {
        //     debouncedNormalHighlight(set, nFieldCtx, params);
        // }
        // else if (mFieldCtx) {
        //     debouncedManualHighlight(set, mFieldCtx, params);
        // }
    }
);

type HighlightParams = R2MInvokeParams.HighlightField & { isBrowser: boolean; focusOn: boolean; fileUs: FileUs; formIdx: FormIdx; };

const debouncedNormalHighlight = debounce((set: Setter, nFieldCtx: NormalField.RowCtx, params: HighlightParams) => set(normalFieldHighlightAtom, nFieldCtx, params), 500);
const debouncedManualHighlight = debounce((set: Setter, mFieldCtx: ManualFieldState.Ctx, params: HighlightParams) => set(manualFieldHighlightAtom, mFieldCtx, params), 500);

const debouncedWorkHighlight = debounce((set: Setter, fieldHighlightCtx: FieldHighlightCtx) => set(workHighlightAtom, fieldHighlightCtx), 500);

const workHighlightAtom = atom(
    null,
    async (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx }: FieldHighlightCtx) => {
        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        console.log('hihglightParams 1', hwndHandle, fileUs, formIdx);

        const hihglightParams = getHighlightParams(hwndHandle.hwnd, hwndHandle.isBrowser, { nFieldCtx, mFieldCtx, fileUs, formIdx }, get);
        if (!hihglightParams) {
            return;
        }

        console.log('hihglightParams 2', hihglightParams);

        const rv = await set(doHighlightFieldAtom, hihglightParams); //TODO: debounce
        if (rv) {
            //TODO: reset highlight atom and query again
            console.log('rv', rv);
        }

        console.log('hihglightParams 3');
    }
);

const normalFieldHighlightAtom = atom(
    null,
    async (get, set, nFieldCtx: NormalField.RowCtx, { hwnd, isBrowser, focusOn, fileUs, formIdx }: HighlightParams) => {
        const metaField: Meta.Field = nFieldCtx.metaField;
        const path: Meta.Path = metaField.path;

        const params: R2MInvokeParams.HighlightField = {
            hwnd,
            rect: isBrowser ? undefined : getFieldRect(path.loc),
            accId: isBrowser ? metaField.pidx : undefined,
        };
        const rv = await set(doHighlightFieldAtom, params);
        if (rv) {
            //TODO: reset highlight atom and query again
            console.log('rv', rv);
        }

        //console.log(`%cnormalFieldHighlightAtom: isBrower: ${isBrowser}, params: "${JSON.stringify(params)}", focusOn: ${focusOn}`, 'color: magenta');
    }
);

const manualFieldHighlightAtom = atom(
    null,
    async (get, set, mFieldCtx: ManualFieldState.Ctx, { hwnd, focusOn }: HighlightParams) => {
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

            const params: R2MInvokeParams.HighlightField = { hwnd, rect, };
            const rv = await set(doHighlightFieldAtom, params);
            if (rv) {
                //TODO: reset highlight atom and query again
                console.log('rv', rv);
            }

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
