import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doGetGeneralInfoAtom } from "@/store/7-napi-atoms";

export function MenuItem_GeneralInfo() {
    const doGetGeneralInfo = useSetAtom(doGetGeneralInfoAtom);
    return (<>
        <DropdownMenuItem onClick={() => doGetGeneralInfo()}>
            General Info
        </DropdownMenuItem>
    </>);
}
