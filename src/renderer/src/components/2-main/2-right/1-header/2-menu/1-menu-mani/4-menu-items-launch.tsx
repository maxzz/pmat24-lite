import { useAtomValue } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { launchDataIdx, type ManiAtoms } from "@/store/2-file-mani-atoms";
import { type LaunchData } from "@/store/0-serve-atoms/8-launch-data/9-launch-types";
import { asyncLaunchExe, errorWebVersionCannotRunApps } from "@/store/0-serve-atoms/7-file-system-manipulation";
import { hasMain } from "@/xternal-to-main";
import { classNames } from "@/utils";

export function MenuItems_Launch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const launchData = useAtomValue(maniAtoms[launchDataIdx]);
    return (<>
        <MenuItem_LaunchForm launchDataForm={launchData.login} isLogin={true} />
        <MenuItem_LaunchForm launchDataForm={launchData.cpass} isLogin={false} />
    </>);
}

function MenuItem_LaunchForm({ launchDataForm, isLogin }: { launchDataForm: LaunchData; isLogin: boolean; }) {
    const withMain = hasMain();
    const exeLabel = withMain ? isLogin ? 'Launch login app' : 'Launch password change app' : errorWebVersionCannotRunApps;
    const urlLabel = isLogin ? 'Open login screen' : 'Open password change screen';
    return (<>
        {launchDataForm.isWeb
            ? (
                <DropdownMenuItem
                    className="pl-8"
                    disabled={!launchDataForm.url}
                    onClick={() => {
                        console.log('Open URL', launchDataForm.url);
                    }}
                >
                    <a href={launchDataForm.url} className={""} target="_blank" rel="noreferrer noopener">
                        {urlLabel}
                    </a>
                </DropdownMenuItem>
            )
            : (
                <DropdownMenuItem
                    className={classNames("pl-8", (!withMain || !launchDataForm.exe) && "opacity-50 cursor-not-allowed")}
                    onClick={() => asyncLaunchExe(launchDataForm.exe, withMain)}
                    title={exeLabel}
                >
                    {exeLabel}
                </DropdownMenuItem>
            )
        }
    </>);
}
