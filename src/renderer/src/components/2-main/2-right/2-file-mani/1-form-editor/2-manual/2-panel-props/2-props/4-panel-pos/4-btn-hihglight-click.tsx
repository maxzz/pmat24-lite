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
        const posX = get(mFieldCtx.xAtom);
        const posY = get(mFieldCtx.yAtom);
        
        const formIdx = fileUsCtx.formIdx;

        let hwndHandle = fileUsCtx && get(formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            const twInfo = await set(doFindHwndAtom, { fileUs: fileUsCtx.fileUs, formIdx }) as GetTargetWindowResult;
            if (twInfo) {
                twInfo.isBrowser = false;
                twInfo.process = ''; //TODO: we need process name
                set(formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom, twInfo); //TODO: when to clean up?
            }
        }

        hwndHandle = fileUsCtx && get(formIdx === FormIdx.login ? fileUsCtx.fileUs.hwndLoginAtom : fileUsCtx.fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            toast.info('Open target window first');
            return;
        }

        set(doHighlightRectAtom, { mFieldCtx, fileUs: fileUsCtx.fileUs, formIdx, focusOrBlur: true });
    }
);
