import { invokeMainTyped } from "@/xternal-to-main";
import { notice } from "@/ui/local-ui/7-toaster";

export const errorWebVersionCannotRunApps = 'Web version cannot run apps';

export async function asyncLaunchExe(exePath: string | undefined, withMain: boolean) {
    if (!withMain) {
        notice.error(errorWebVersionCannotRunApps);
        return;
    }
    if (!exePath) {
        notice.error('There is no executable filename to launch');
        return;
    }

    const rv = await invokeMainTyped({ type: 'r2mi:exec-file', fileName: exePath });
    if (rv) {
        notice.error(rv);
    }
}
