import { atom } from "jotai";
import { toast } from "sonner";
import { FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { doHighlightRectAtom } from "./1-do-highlight-rect";
import { doFindHwndAtom } from "./6-find-hwnd";

export const doHighlightClickAtom = atom(
    null,
    async (get, set, { mFieldCtx, fileUsCtx }: { mFieldCtx: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) => {
        const fileUs = fileUsCtx.fileUs;
        const formIdx = fileUsCtx.formIdx;
        const hwndAtom = formIdx === FormIdx.login ? fileUs.hwndLoginAtom : fileUs.hwndCpassAtom;

        // Find window every time since window can be closed and atom stores stale hwnd
        set(hwndAtom, await set(doFindHwndAtom, { fileUs, formIdx }));

        const hwndHandle = get(hwndAtom);
        if (!hwndHandle) {
            toast.info('Open target window first');
            return;
        }

        set(doHighlightRectAtom, { mFieldCtx, fileUs, formIdx, focusOrBlur: true });
    }
);
