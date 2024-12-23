import { R2MCalls } from "@/xternal-to-main";
import { DropdownMenuItem, checkDevTools } from "@/ui";

export function MenuItem_GetTestDirs() {
    return (
        <DropdownMenuItem
            onClick={() => {
                checkDevTools.onClick();
                console.log('click trace');
                R2MCalls.startTestFromMain();
            }}
        >
            Get trace from renderer
        </DropdownMenuItem>
    );
}
