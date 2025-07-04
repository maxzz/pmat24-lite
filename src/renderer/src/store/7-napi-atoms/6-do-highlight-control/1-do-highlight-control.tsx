import { type Setter, atom } from "jotai";
import { debounce } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { hasMain, R2MInvokes } from "@/xternal-to-main";
import { napiLock } from "../9-napi-build-state";
import { type R2MInvokeParams } from "@shared/ipc-types";
import { type FieldHighlightCtx } from "../../1-atoms/2-file-mani-atoms/9-types";
import { getHighlightFieldParams } from "./2-get-highlight-params";

export const doHighlightControlAtom = atom(
    null,
    (get, set, params: FieldHighlightCtx & { focusOrBlur: boolean; }): void => {
        debouncedHighlight(set, params);
    }
);

const debouncedHighlight = debounce((set: Setter, fieldHighlightCtx: FieldHighlightCtx & { focusOrBlur: boolean; }) => set(doHighlightAtom, fieldHighlightCtx), 300);

const doHighlightAtom = atom(
    null,
    async (get, set, params: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!params.focusOrBlur) { // No need so far blur events
            const rv = await callMainToHighlightField(undefined);
            if (rv) {
                console.error('rv', rv); //TODO: reset highlight atom and query again
            }
            return;
        }

        const { fileUs, formIdx } = params;
        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        const callParams = getHighlightFieldParams(hwndHandle.hwnd, hwndHandle.isBrowser, params, get);
        if (!callParams) {
            return;
        }
        if (!hwndHandle.hwnd || (!callParams.params?.rect && callParams.params?.accId === undefined)) {
            console.error('inv.params');
            return;
        }

        const rv = await callMainToHighlightField(callParams);
        if (rv) {
            console.log('rv', rv); //TODO: reset highlight atom and query again
        }
    }
);

async function callMainToHighlightField(params: R2MInvokeParams.HighlightField | undefined): Promise<string | undefined> {
    if (!hasMain()) { // It's better to block somewhere higher but here is ok as well
        return;
    }

    if (napiLock.locked('highlight')) {
        return;
    }

    try {
        const rv = await R2MInvokes.highlightField(params);
        return rv;
    } catch (error) {
        console.error('error', error);
    } finally {
        napiLock.unlock();
    }
}
