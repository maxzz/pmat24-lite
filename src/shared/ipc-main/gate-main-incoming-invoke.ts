import { M4RInvoke } from "@shared/ipc-types";
import { loadFilesContent } from "../../shell/app/utils-main/load-files";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getWindowPos, require2, addon } from "../../shell/app/napi-calls";
import { mainToRenderer } from "./ipc-main-commands";

let tempCounter = 0;

export async function invokeFromRendererToMain(data: M4RInvoke.InvokeCalls): Promise<any> {
    switch (data.type) {
        case 'r2mi:load-files': {
            return loadFilesContent(data.filenames, data.allowedExt);
        }
        case 'r2mi:load-files2': {
            return loadFilesContent(data.filenames);
        }
        case 'r2mi:get-target-hwnd': {
            // const res = await getTargetHwnd();
            // return res;
            const msg = { hwnd: `${tempCounter++}`, req: require2.cache, addon2: addon }
            mainToRenderer({ type: 'm2r:log', body: JSON.stringify(msg)});
            
            return JSON.stringify(msg);
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
