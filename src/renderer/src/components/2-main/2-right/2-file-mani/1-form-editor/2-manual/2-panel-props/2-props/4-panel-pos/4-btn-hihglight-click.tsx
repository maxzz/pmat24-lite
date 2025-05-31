import { atom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState, doFindHwndAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { type GetTargetWindowResult } from "@shared/ipc-types";

export function ButtonHighlightClick({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const posValueX = useAtomValue(item.xAtom);
    const posValueY = useAtomValue(item.yAtom);

    const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };

    async function onClick() {
        await highlightClick({ mFieldCtx: item, fileUs: fileUsCtx, formIdx: fileUsCtx.formIdx });
        console.log(`ButtonHighlightClick.onClick`, highlightCtx);
    }

    const highlightClick = useSetAtom(highlightClickAtom);

    return (
        <Button variant="outline" size="xs" onClick={onClick}>
            Highlight
        </Button>
    );
}

const highlightClickAtom = atom(
    null,
    async (get, set, { mFieldCtx, fileUs, formIdx }: { mFieldCtx: ManualFieldState.CtxPos; fileUs: FileUsCtx; formIdx: number; }) => {
        const posX = get(mFieldCtx.xAtom);
        const posY = get(mFieldCtx.yAtom);

        let hwndHandle = fileUs && get(formIdx === FormIdx.login ? fileUs.fileUs.hwndLoginAtom : fileUs.fileUs.hwndCpassAtom);
        if (!hwndHandle) {
            const twInfo = await set(doFindHwndAtom, { fileUs: fileUs.fileUs, formIdx }) as GetTargetWindowResult;
            if (twInfo) {
                twInfo.isBrowser = false;
                twInfo.process = ''; //TODO: we need process name
                set(formIdx === FormIdx.login ? fileUs.fileUs.hwndLoginAtom : fileUs.fileUs.hwndCpassAtom, twInfo); //TODO: when to clean up?
            }

        }

        if (!hwndHandle) {
            console.log('no hwndHandle');
            return;
        }

    }
);
