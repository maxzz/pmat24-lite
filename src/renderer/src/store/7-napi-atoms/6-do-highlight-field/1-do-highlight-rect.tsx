import { type Setter, atom } from "jotai";
import { debounce } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { type FieldHighlightCtx } from "../../1-atoms/2-file-mani-atoms/9-types";
import { doHighlightFieldAtom } from "@/store/7-napi-atoms";
import { getHighlightParams } from "./8-get-highlight-data";

export const doHighlightRectAtom = atom(
    null,
    async (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx, focusOrBlur }: FieldHighlightCtx & { focusOrBlur: boolean; }) => {
        if (!focusOrBlur) { // No need so far blur events
            return;
        }

        debouncedWorkHighlight(set, { nFieldCtx, mFieldCtx, fileUs, formIdx });
    }
);

const debouncedWorkHighlight = debounce((set: Setter, fieldHighlightCtx: FieldHighlightCtx) => set(workHighlightAtom, fieldHighlightCtx), 500);

const workHighlightAtom = atom(
    null,
    async (get, set, { nFieldCtx, mFieldCtx, fileUs, formIdx }: FieldHighlightCtx) => {
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
    }
);
