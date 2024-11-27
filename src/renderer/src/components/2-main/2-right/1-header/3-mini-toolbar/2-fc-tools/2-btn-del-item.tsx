import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Button } from "@/ui";
import { IconTrash } from "@/ui/icons";
import { doDeleteSelectedItemAtom } from "@/store/atoms/4-field-catalogs";

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
