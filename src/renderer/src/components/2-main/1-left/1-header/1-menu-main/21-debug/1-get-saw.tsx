import { useSetAtom } from "jotai";
import { doGetTargetHwndAtom } from "@/store/7-napi-atoms";
import { DropdownMenuItem } from "@/ui/shadcn";
import { notice_checkDevTools } from "@/ui/local-ui";

export function MenuItem_GetSaw() {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    return (
        <>
            <DropdownMenuItem
                onClick={() => {
                    notice_checkDevTools.onClick();
                    console.log('click');
                    doGetTargetHwnd();
                }}
            >
                Get Second Active Window
            </DropdownMenuItem>

        </>
    );
}
