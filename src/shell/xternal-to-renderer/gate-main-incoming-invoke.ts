import { R2MInvoke } from "@shared/ipc-types";
import { loadFilesContent } from "@shell/utils-main/load-files";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getWindowPos } from "./calls-napi";

export async function invokeFromRendererToMain(data: R2MInvoke.InvokeCalls): Promise<any> {
    switch (data.type) {
        case 'r2mi:load-files': {
            return loadFilesContent(data.filenames, data.allowedExt);
        }
        case 'r2mi:load-files2': {
            return loadFilesContent(data.filenames);
        }
        case 'r2mi:get-target-hwnd': {
            const res = await getTargetHwnd();
            return res;
        }
        case 'r2mi:get-window-controls': {
            const res = await getWindowControls(data.hwnd);
            return res;
        }
        case 'r2mi:get-window-icon': {
            const res = await getWindowIcon(data.hwnd);
            return res;
        }
        case 'r2mi:get-window-pos': {
            const res = await getWindowPos(data.hwnd);
            return res;
        }
        case 'r2mi:get-window-mani': {
            const res = await getWindowMani(data.hwnd, data.wantXml);
            return res;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
