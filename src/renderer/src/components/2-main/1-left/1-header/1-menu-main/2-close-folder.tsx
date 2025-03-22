import { useSetAtom } from "jotai";
import { doClearFileContentAtom } from "@/store";
import { DropdownMenuItem } from "@/ui/shadcn";

/**
 * It was 'Clear files list' but now everything is based on folders not files.
 * It does not make sense when user has only one folder to work with.
 * It makes sense when we have multiple folders to work with, 
 * so history will be available when folder is closed.
 */
export function MenuItem_CloseFolder() {
    const doClearFileContent = useSetAtom(doClearFileContentAtom);
    return (
        <DropdownMenuItem onClick={() => { doClearFileContent(); }}>
            Close Folder
        </DropdownMenuItem>
    );
}
