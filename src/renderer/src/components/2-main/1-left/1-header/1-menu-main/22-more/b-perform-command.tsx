import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doPerformCommandAtom } from "@/store/7-napi-atoms";

export function MenuItem_PerformCommand() {
    const doPerformCommand = useSetAtom(doPerformCommandAtom);
    return (<>
        <DropdownMenuItem onClick={() => doPerformCommand({ command: 'reloadCache', params: {} })}>
            Perform Command
        </DropdownMenuItem>
    </>);
}
