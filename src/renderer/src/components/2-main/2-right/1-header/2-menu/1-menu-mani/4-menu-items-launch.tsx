import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { type ManiAtoms, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { type LaunchData, launchDataAtom } from "@/store/0-serve-atoms/8-launch-data";

export function MenuItems_Launch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const getLaunchData = useSetAtom(launchDataAtom);
    const launchData = getLaunchData({ maniAtoms });
    return (<>
        <MenuItem_Launch launchData={launchData} />
    </>);
}

function MenuItem_Launch({ launchData }: { launchData: LaunchData; }) {
    if (launchData.isWeb) {
        return (<>
            <DropdownMenuItem
                className="pl-8"
                disabled={!launchData.loginUrl}
                onClick={(event) => {

                }}
            >
                Launch login URL
            </DropdownMenuItem>

            <DropdownMenuItem
                className="pl-8"
                disabled={!launchData.cpassUrl}
                onClick={(event) => {

                }}
            >
                Launch Password Change URL
            </DropdownMenuItem>
        </>);
    }
    else {
        return (<>
            <DropdownMenuItem
                className="pl-8"
                disabled={!launchData.loginExe}
                onClick={(event) => {

                }}
            >
                Launch login URL
            </DropdownMenuItem>

            <DropdownMenuItem
                className="pl-8"
                disabled={!launchData.cpassExe}
                onClick={(event) => {

                }}
            >
                Launch Password Change URL
            </DropdownMenuItem>
        </>);
    }
}
