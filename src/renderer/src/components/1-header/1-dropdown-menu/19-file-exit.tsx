import { DropdownMenuItem, DropdownMenuSeparator } from "@/ui/shadcn";
import { hasMain, sendToMain } from "@/xternal-to-main";

export function MenuItem_FileExit() {
    return (<>
        {hasMain() && (<>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:menu:command", what: "exit" })}>
                Exit
            </DropdownMenuItem>
        </>)}
    </>);
}
