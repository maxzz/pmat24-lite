import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { type ManiAtoms } from "@/store/2-file-mani-atoms";
import { launchDataAtom, type LaunchDataForm } from "@/store/0-serve-atoms/8-launch-data";

export function MenuItems_Launch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const getLaunchData = useSetAtom(launchDataAtom);
    const launchData = getLaunchData({ maniAtoms });
    return (<>
        <MenuItem_LaunchForm launchDataForm={launchData.login} />
        <MenuItem_LaunchForm launchDataForm={launchData.cpass} />
    </>);
}

function MenuItem_LaunchForm({ launchDataForm }: { launchDataForm: LaunchDataForm; }) {
    return (<>
        {launchDataForm.isWeb ? (
            <DropdownMenuItem
                className="pl-8"
                disabled={!launchDataForm.url}
                onClick={(event) => {
                    console.log('launch URL', launchDataForm.url);
                }}
            >
                Launch URL
            </DropdownMenuItem>
        ) : (
            <DropdownMenuItem
                className="pl-8"
                disabled={!launchDataForm.exe}
                onClick={(event) => {
                    console.log('launch exe', launchDataForm.exe);
                }}
            >
                Launch Process
            </DropdownMenuItem>
        )}
    </>);
}
