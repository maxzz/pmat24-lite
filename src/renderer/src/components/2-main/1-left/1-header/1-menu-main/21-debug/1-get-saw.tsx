import { useSetAtom } from "jotai";
import { doGetTargetHwndAtom } from "@/store/7-napi-atoms";
import { DropdownMenuItem, checkDevTools } from "@/ui";

export function MenuItem_GetSaw() {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    return (
        <>
            <DropdownMenuItem
                onClick={() => {
                    checkDevTools.onClick();
                    console.log('click');
                    doGetTargetHwnd();
                }}
            >
                Get Second Active Window
            </DropdownMenuItem>

        </>
    );
}
