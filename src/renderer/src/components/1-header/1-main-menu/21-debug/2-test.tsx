import { sendToMain } from "@/xternal-to-main";
import { DropdownMenuItem, checkDevTools } from "@/ui";

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
