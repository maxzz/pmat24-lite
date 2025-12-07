import { useSetAtom } from "jotai";
import { notice } from "@/ui/local-ui/7-toaster";
import { DropdownMenuItem } from "@/ui/shadcn";
import { type ManiAtoms } from "@/store/2-file-mani-atoms";
import { launchDataAtom, type LaunchData } from "@/store/0-serve-atoms/8-launch-data";
import { execFile } from "@/store/0-serve-atoms/7-file-system-manipulation/4-exec-file";

export function MenuItems_Launch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const getLaunchData = useSetAtom(launchDataAtom);
    const launchData = getLaunchData({ maniAtoms });
    return (<>
        <MenuItem_LaunchForm launchDataForm={launchData.login} isLogin={true} />
        <MenuItem_LaunchForm launchDataForm={launchData.cpass} isLogin={false} />
    </>);
}

function MenuItem_LaunchForm({ launchDataForm, isLogin }: { launchDataForm: LaunchData; isLogin: boolean; }) {
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
                    className="pl-8"
                    disabled={!launchDataForm.exe}
                    onClick={() => {
                        console.log('launch exe', launchDataForm.exe);
                        if (!launchDataForm.exe) {
                            notice.error('No executable file to launch');
                            return;
                        }
                        const rv = execFile(launchDataForm.exe);
                        if (rv) {
                            notice.error(rv);
                        }
                    }}
                >
                    {isLogin ? 'Launch Login app' : 'Launch password change app'}
                </DropdownMenuItem>
            )
        }
    </>);
}
