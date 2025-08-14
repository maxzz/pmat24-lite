import { DropdownMenuItem } from "@/ui";
import { asyncReloadCache } from "@/store/7-napi-atoms";

export function MenuItem_ReloadCache() {
    
    async function onClick() {
        const res = await asyncReloadCache();
        if (res) {
            console.error('perform.command.res:', res);
        }
    }

    return (<>
        <DropdownMenuItem onClick={onClick}>
            Command: Reload Cache
        </DropdownMenuItem>
    </>);
}
