import { DropdownMenuItem } from "@/ui";
import { asyncReloadCache } from "@/store/7-napi-atoms";

export function MenuItem_ReloadCache() {
    return (<>
        <DropdownMenuItem onClick={asyncReloadCache}>
            Command: Reload Cache
        </DropdownMenuItem>
    </>);
}
