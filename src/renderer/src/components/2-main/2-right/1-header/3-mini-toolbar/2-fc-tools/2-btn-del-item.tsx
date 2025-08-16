import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { IconTrash } from "@/ui/icons";
import { type FceCtx, doDeleteSelectedItemAtom } from "@/store/3-field-catalog-atoms";

export function Button_DeleteItem({ fceCtx }: { fceCtx: FceCtx; }) {
    const hasSelectedItem = useAtomValue(fceCtx.hasSelectedItemAtom);
    const doDeleteSelectedItem = useSetAtom(doDeleteSelectedItemAtom);
    return (
        <Button
            className="-mx-1"
            variant="ghost"
            disabled={!hasSelectedItem}
            title="Delete current item"
            tabIndex={-1}
            onClick={() => doDeleteSelectedItem(fceCtx)}
        >
            <IconTrash className="size-4" />
        </Button>
    );
}
