import { type Setter, atom } from "jotai";
import { debounce } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { R2MInvokes } from "@/xternal-to-main";
import { napiLock } from "../9-napi-build-state";
import { type FieldHighlightCtx } from "../../1-atoms/2-file-mani-atoms/9-types";
import { type R2MInvokeParams } from "@shared/ipc-types";
import { getHighlightParams } from "./2-get-highlight-params";
import { asyncGetWindowExtrasAtom } from "../1-do-get-hwnd";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }): void => {
        if (focusOrBlur) { // No need so far blur events
            debouncedHighlight(set, { nFieldCtx, mFieldCtx, fileUs, formIdx });
        }
    }
);

const debouncedHighlight = debounce((set: Setter, fieldHighlightCtx: FieldHighlightCtx) => set(workHighlightAtom, fieldHighlightCtx), 300);

const workHighlightAtom = atom(
    null,
    async (get, set, params: FieldHighlightCtx) => {

        const { fileUs, formIdx } = params;
        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        const windowExtra = await set(asyncGetWindowExtrasAtom, {hwnds: [hwndHandle.hwnd]});
        console.log('windowExtra', JSON.stringify(windowExtra));

        const callParams = getHighlightParams(hwndHandle.hwnd, hwndHandle.isBrowser, params, get);
        if (!callParams) {
            return;
        }
        if (!hwndHandle.hwnd || (!callParams.params?.rect && callParams.params?.accId === undefined)) {
            console.log('inv.params');
            return;
        }

        const rv = await callMainToHighlightField(callParams);
        if (rv) {
            //TODO: reset highlight atom and query again
            console.log('rv', rv);
        }
    }
);

async function callMainToHighlightField(params: R2MInvokeParams.HighlightField): Promise<string | undefined> {
    if (napiLock.locked('highlight')) {
        return;
    }

    try {
        const rv = await R2MInvokes.highlightField(params);
        return rv;
    } catch (error) {
        console.error('error', error);
    }
    finally {
        napiLock.unlock();
    }
}
