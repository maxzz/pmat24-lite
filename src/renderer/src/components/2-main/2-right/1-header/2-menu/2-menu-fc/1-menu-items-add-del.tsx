import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { FieldTyp } from "@/store/manifest";
import { type FceCtx, doAddItemAtom, doDeleteSelectedItemAtom } from "@/store/1-atoms/4-field-catalogs";

export function MenuItem_AddFcItem({ fceCtx }: { fceCtx: FceCtx; }) {

    const doAddItem = useSetAtom(doAddItemAtom);
    const doSetFocusGrid = useSetAtom(fceCtx.focusGridAtom);

    function onAddItem(fType: FieldTyp) {
        doAddItem(fceCtx, fType);
        doSetFocusGrid(true);
    }

    return (<>
        <DropdownMenuItem onClick={() => { onAddItem(FieldTyp.edit); }}>
            Add Text Field
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => { onAddItem(FieldTyp.psw); }}>
            Add Password Field
        </DropdownMenuItem>
    </>);
}

export function MenuItem_DelFcItem({ fceCtx }: { fceCtx: FceCtx; }) {

    const hasSelectedItem = useAtomValue(fceCtx.hasSelectedItemAtom);

    const doDeleteSelectedItem = useSetAtom(doDeleteSelectedItemAtom);
    const doSetFocusGrid = useSetAtom(fceCtx.focusGridAtom);

    function onDeleteItem() {
        doDeleteSelectedItem(fceCtx);
        doSetFocusGrid(true);
    }

    return (<>
        <DropdownMenuItem disabled={!hasSelectedItem} onClick={onDeleteItem}>
            Delete selected item
        </DropdownMenuItem>
    </>);
}
