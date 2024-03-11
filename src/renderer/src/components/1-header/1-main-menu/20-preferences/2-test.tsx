import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { sendToMain } from "@/xternal-to-main";
import { checkDevTools } from "../not-impl-yet";

export function MenuItem_GetTestDirs() {
    return (
        <DropdownMenuItem
            onClick={() => {
                checkDevTools.onClick();
                console.log('click trace');
                sendToMain({ type: 'r2m:test' });
            }}
        >
            Get trace from renderer
        </DropdownMenuItem>
    );
}
