import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { IconTrash } from "@/ui/icons";
import { type FceCtx, doDeleteSelectedItemAtom } from "@/store/1-atoms/4-field-catalogs";

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
