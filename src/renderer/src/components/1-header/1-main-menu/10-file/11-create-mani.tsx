import { useSetAtom } from "jotai";
import { createDialogOpenAtom } from "@/store/atoms/4-dialogs";
import { DropdownMenuItem } from "@/ui/shadcn";

export function MenuItem_CreateMani() {
    const doCreateDialogOpen = useSetAtom(createDialogOpenAtom);
    return (<>
        <DropdownMenuItem onClick={() => doCreateDialogOpen(true)}>
            Create manifest...
        </DropdownMenuItem>
    </>);
}
