import { invokeMainTyped } from "@/xternal-to-main";
import { LaunchData } from "../8-launch-data/9-launch-types";
import { notice } from "@/ui/local-ui/7-toaster";

export async function asyncLaunchExe(exePath: string | undefined, withMain: boolean) {
    if (!withMain) {
        notice.error('Cannot launch app without main process');
        return;
    }
    if (!exePath) {
        notice.error('There is no executable file to launch');
        return;
    }

    console.log('launch exe', exePath);

    if (!exePath) {
        notice.error('No executable file to launch');
        return;
    }
    
    const rv = await execFile(exePath);
    if (rv) {
        notice.error(rv);
    }
}

async function execFile(fileName: string): Promise<string | undefined> {
    return await invokeMainTyped({ type: 'r2mi:exec-file', fileName });
}
