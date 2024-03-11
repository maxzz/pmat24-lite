import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { sendToMain } from "@/xternal-to-main";

export function MenuItem_GetTestDirs() {
    return (
        <DropdownMenuItem
            onClick={() => {
                console.log('click trace');
                sendToMain({ type: 'r2m:test' });
            }}
        >
            Get trace from renderer
        </DropdownMenuItem>
    );
}
