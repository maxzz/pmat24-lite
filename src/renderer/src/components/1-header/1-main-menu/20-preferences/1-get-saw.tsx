import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn/dropdown-menu";
import { doGetTargetHwndAtom } from "@/store";

export function MenuItem_GetSaw() {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    return (
        <>
            <DropdownMenuItem
                onClick={() => {
                    console.log('click');
                    doGetTargetHwnd();
                }}
            >
                Get Second Active Window
            </DropdownMenuItem>

        </>
    );
}
