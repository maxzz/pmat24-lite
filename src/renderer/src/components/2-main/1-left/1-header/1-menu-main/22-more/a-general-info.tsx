import { DropdownMenuItem } from "@/ui";
import { asyncGetAboutInfo } from "@/store/7-napi-atoms";

export function MenuItem_GeneralInfo() {
    return (<>
        <DropdownMenuItem onClick={() => asyncGetAboutInfo()}>
            General Info
        </DropdownMenuItem>
    </>);
}
