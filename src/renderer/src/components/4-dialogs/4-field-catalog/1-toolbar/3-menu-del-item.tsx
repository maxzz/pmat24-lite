import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { IconAdd } from "@/ui/icons";
import { doDeleteItemIdxAtom } from "@/store/atoms/4-field-catalogs/1-fc-file-atoms/7-add-del-item";

export function Button_DeleteItem({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    
    const doDeleteItemIdx = useSetAtom(doDeleteItemIdxAtom);
    return (
        <Button variant="ghost" title="Delete current item" tabIndex={-1}>
            Delete
        </Button>
    );
}
