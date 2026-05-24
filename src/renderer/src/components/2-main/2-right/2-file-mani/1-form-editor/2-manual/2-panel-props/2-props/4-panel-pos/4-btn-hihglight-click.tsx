import { useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-file-mani-atoms";
import { doHighlightPosClickAtom } from "@/store/7-napi-atoms";

export function ButtonHighlightClick({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const doHighlightClick = useSetAtom(doHighlightPosClickAtom);
    
    return (
        <Button variant="outline" size="xs" onClick={() => doHighlightClick({ mFieldCtx: item, fileUsCtx })}>
            Highlight
        </Button>
    );
}
