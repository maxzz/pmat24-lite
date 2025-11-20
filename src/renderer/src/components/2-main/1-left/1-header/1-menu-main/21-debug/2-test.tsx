import { R2MCalls } from "@/xternal-to-main";
import { DropdownMenuItem } from "@/ui/shadcn";
import { notice_checkDevTools } from "@/ui/local-ui";

export function MenuItem_GetTestDirs() {
    return (
        <DropdownMenuItem
            onClick={() => {
                notice_checkDevTools.onClick();
                console.log('click trace');
                R2MCalls.startTestFromMain();
            }}
        >
            Get trace from renderer
        </DropdownMenuItem>
    );
}
