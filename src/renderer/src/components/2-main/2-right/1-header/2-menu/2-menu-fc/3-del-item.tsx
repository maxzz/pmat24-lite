import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { doDeleteSelectedItemAtom } from "@/store/atoms/4-field-catalogs/1-fc-file-atoms/7-add-del-item";

export function MenuItem_DelFcItem({ fceCtx }: { fceCtx: FceCtx; }) {

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    const doDeleteSelectedItem = useSetAtom(doDeleteSelectedItemAtom);
    const doSetFocusGrid = useSetAtom(fceCtx.focusGridAtom);

    function onDeleteItem() {
        doDeleteSelectedItem(fceCtx);
        doSetFocusGrid(true);
    }

    return (<>
        <DropdownMenuItem disabled={!selectedItem} onClick={onDeleteItem}>
            Delete selected item
        </DropdownMenuItem>
    </>);
}
