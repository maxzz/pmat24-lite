import { useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { doHighlightClickAtom } from "@/store/7-napi-atoms";

export function ButtonHighlightClick({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const doHighlightClick = useSetAtom(doHighlightClickAtom);
    
    return (
        <Button variant="outline" size="xs" onClick={() => doHighlightClick({ mFieldCtx: item, fileUsCtx })}>
            Highlight
        </Button>
    );
}
