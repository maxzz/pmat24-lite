import { useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";

export function ButtonHighlightClick({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {
    const posValueX = useAtomValue(item.xAtom);
    const posValueY = useAtomValue(item.yAtom);

    const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };

    return (
        <Button variant="outline" size="xs">
            Highlight
        </Button>
    );
}
