import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { doDeleteSelectedItemAtom } from "@/store/atoms/4-field-catalogs/1-fc-file-atoms/7-add-del-item";

export function Button_DeleteItem({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    
    const doDeleteSelectedItem = useSetAtom(doDeleteSelectedItemAtom);
    return (
        <Button variant="ghost" disabled={!selectedItem} title="Delete current item" tabIndex={-1} onClick={() => doDeleteSelectedItem(fceCtx)}>
            Delete
        </Button>
    );
}
