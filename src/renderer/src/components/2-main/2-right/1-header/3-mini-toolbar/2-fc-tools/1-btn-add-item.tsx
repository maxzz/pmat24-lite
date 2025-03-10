import { useState } from "react";
import { type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconAdd } from "@/ui/icons";
import { doAddItemAtom } from "@/store/1-atoms/4-field-catalogs";
import { useSetAtom } from "jotai";
import { FieldTyp } from "pm-manifest";

export function Button_AddItem({ fceCtx }: { fceCtx: FceCtx; }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>

            <DropdownMenuTrigger asChild>
                <Button className="-mx-1" variant="ghost" title="Add new item" tabIndex={-1}>
                    <IconAdd className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">
                <Menu_AddItem fceCtx={fceCtx} />
            </DropdownMenuContent>

        </DropdownMenu>
    );
}

function Menu_AddItem({ fceCtx }: { fceCtx: FceCtx; }) {
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
