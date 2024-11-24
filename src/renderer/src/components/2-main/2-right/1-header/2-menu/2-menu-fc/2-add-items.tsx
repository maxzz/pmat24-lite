import { useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { FieldTyp } from "@/store/manifest";
import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { doAddItemAtom } from "@/store/atoms/4-field-catalogs/1-fc-file-atoms/7-add-del-item";

export function AddDel_FceMenuItems({ fceCtx }: { fceCtx: FceCtx; }) {
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
