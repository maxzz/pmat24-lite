import { useAtomValue, useSetAtom } from "jotai";
import { notice } from "@/ui/local-ui/7-toaster";
import { DropdownMenuItem } from "@/ui/shadcn";
import { launchDataIdx, type ManiAtoms } from "@/store/2-file-mani-atoms";
import { type LaunchData } from "@/store/0-serve-atoms/8-launch-data/9-launch-types";
import { execFile } from "@/store/0-serve-atoms/7-file-system-manipulation/4-exec-file";
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
    const label = withMain ? isLogin ? 'Launch login app' : 'Launch password change app' : 'Web PMAT cannot launch apps';
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
                    {isLogin ? 'Open Login URL' : 'Open password change URL'}
                </DropdownMenuItem>
            )
            : (
                <DropdownMenuItem
                    className={classNames("pl-8", !withMain && "opacity-50 cursor-not-allowed")}
                    onClick={() => launchExe(launchDataForm, withMain)}
                    title={label}
                >
                    {label}
                </DropdownMenuItem>
            )
        }
    </>);
}

function launchExe(launchDataForm: LaunchData, withMain: boolean) {
    if (!withMain) {
        notice.error('Cannot launch app without main process');
        return;
    }
    if (!launchDataForm.exe) {
        notice.error('There is no executable file to launch');
        return;
    }

    console.log('launch exe', launchDataForm.exe);

    if (!launchDataForm.exe) {
        notice.error('No executable file to launch');
        return;
    }
    const rv = execFile(launchDataForm.exe);
    if (rv) {
        notice.error(rv);
    }
}
