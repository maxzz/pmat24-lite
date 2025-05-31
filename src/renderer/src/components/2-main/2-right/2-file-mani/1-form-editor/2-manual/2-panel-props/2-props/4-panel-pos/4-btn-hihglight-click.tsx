import { atom, useSetAtom } from "jotai";
import { toast } from "sonner";
import { Button } from "@/ui/shadcn";
import { FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState, doFindHwndAtom, doHighlightRectAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { type GetTargetWindowResult } from "@shared/ipc-types";

export function ButtonHighlightClick({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const highlightClick = useSetAtom(highlightClickAtom);

    async function onClick() {
        highlightClick({ mFieldCtx: item, fileUsCtx });
    }

    return (
        <Button variant="outline" size="xs" onClick={onClick}>
            Highlight
        </Button>
    );
}

const highlightClickAtom = atom(
    null,
    async (get, set, { mFieldCtx, fileUsCtx }: { mFieldCtx: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) => {
        const formIdx = fileUsCtx.formIdx;
        const hwndAtom = formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom;

        let hwndHandle = get(hwndAtom);

        //if (!hwndHandle) { // do it every time since window can be closed and atom stores stale hwnd
        const twInfo = await set(doFindHwndAtom, { fileUs: fileUsCtx.fileUs, formIdx }) as GetTargetWindowResult;
        if (twInfo) {
            twInfo.isBrowser = false;
            twInfo.process = ''; //TODO: we need process name
            set(hwndAtom, twInfo); //TODO: when to clean up?
        } else {
            set(hwndAtom, null);
        }
        //}

        hwndHandle = get(hwndAtom);
        if (!hwndHandle) {
            toast.info('Open target window first');
            return;
        }

        set(doHighlightRectAtom, { mFieldCtx, fileUs: fileUsCtx.fileUs, formIdx, focusOrBlur: true });
    }
);
