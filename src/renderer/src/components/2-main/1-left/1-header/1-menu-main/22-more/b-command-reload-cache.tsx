import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doPerformCommandAtom } from "@/store/7-napi-atoms";

export function MenuItem_ReloadCache() {
    const doPerformCommand = useSetAtom(doPerformCommandAtom);

    async function onClick() {
        const res = await doPerformCommand({ command: 'reloadCache' });
        console.log('perform.command.res:', res);
    }

    return (<>
        <DropdownMenuItem onClick={onClick}>
            Command: Reload Cache
        </DropdownMenuItem>
    </>);
}
