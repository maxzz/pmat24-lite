import { useSetAtom } from "jotai";
import { doClearFileContentAtom } from "@/store";
import { DropdownMenuItem } from "@/ui/shadcn";

export function MenuItem_ClearFiles() {
    const doClearFileContent = useSetAtom(doClearFileContentAtom);
    return (
        <DropdownMenuItem onClick={() => { doClearFileContent(); }}>
            Clear files list
        </DropdownMenuItem>
    );
}
