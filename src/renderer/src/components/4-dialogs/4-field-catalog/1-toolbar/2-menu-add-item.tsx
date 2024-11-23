import { useState } from "react";
import { type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconAdd } from "@/ui/icons";
import { doAddItemAtom } from "@/store/atoms/4-field-catalogs/1-fc-file-atoms/7-add-del-item";
import { useSetAtom } from "jotai";
import { FieldTyp } from "pm-manifest";

export function PanelMenu_AddItem({ fceCtx }: { fceCtx: FceCtx; }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const doAddItem = useSetAtom(doAddItemAtom);
    const doSetFocusGrid = useSetAtom(fceCtx.focusGridAtom);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" title="Add new item" tabIndex={-1}>
                    <IconAdd className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">
                <DropdownMenuItem onClick={() => { doAddItem(fceCtx, FieldTyp.edit); doSetFocusGrid(true); }}>
                    Add Text Field
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => { doAddItem(fceCtx, FieldTyp.psw); doSetFocusGrid(true); }}>
                    Add Password Field
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}
