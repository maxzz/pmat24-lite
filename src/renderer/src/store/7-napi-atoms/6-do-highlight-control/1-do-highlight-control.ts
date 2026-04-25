import { atom } from "jotai";
import { debounce } from "@/utils";
import { FormIdx } from "@/store/8-manifest";
import { hasMain, R2MInvokes } from "@/xternal-to-main";
import { napiLock } from "../9-napi-build-state";
import { type R2MInvokeParams } from "@shared/ipc-types";
import { type FieldHighlightCtx } from "@/store/2-file-mani-atoms/9-types";
import { getHighlightFieldParams } from "./2-get-highlight-params";

export const doHighlightControlAtom = atom(
    null,
    (get, set, params: FieldHighlightCtx & { focusOrBlur: boolean; }): void => {
        if (hasMain()) {
            debouncedHighlight(set, params);
        }
    }
);

const debouncedHighlight = debounce((set: Setter, fieldHighlightCtx: FieldHighlightCtx & { focusOrBlur: boolean; }) => set(doHighlightAtom, fieldHighlightCtx), 300);

const doHighlightAtom = atom(
    null,
    async (get, set, params: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        //console.log('doHighlightAtom focusOrBlur', params.focusOrBlur, params);

        const isHideField = !params.focusOrBlur;

        /*
        // Hide method was never implemented in the plugin, so the plan is to call field highlight with -1 accId, but DpAgent has check on MAXINT32, so we'll use 10000(light years away) as the accId to indicate hide. This is a bit hacky but it works and does not require change in plugin.

        if (isHideField) { // Not focus ie. blur; it is necessary to handle blur events to remove the field highlighting.
            const rv = await callMainToHighlightField(undefined);
            if (rv) {
                console.error('rv', rv); //TODO: reset highlight atom and query again
            }
            return;
        }
        */

        const { fileUs, formIdx } = params;
        const hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            //console.log('%chighlight.no.hwnd', 'color: slateblue'); //TODO: show popup hint
            return;
        }

        const callParams = getHighlightFieldParams(hwndHandle.hwnd, hwndHandle.isBrowser, params, !isHideField, get);
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
