import { DropdownMenuItem, DropdownMenuSeparator } from "@/ui/shadcn";
import { hasMain, R2MCalls } from "@/xternal-to-main";

export function MenuItem_FileExit() {
    return (<>
        {hasMain() && (<>
            <DropdownMenuSeparator />
            
            {/* <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:menu:command", what: "exit" })}> */}
            <DropdownMenuItem onClick={() => R2MCalls.menuCommand({ what: "exit" })}>
                Exit
            </DropdownMenuItem>
        </>)}
    </>);
}
