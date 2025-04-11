import { R2MInvoke } from "@shared/ipc-types";
import { loadWin32FilesContent } from "../2-commands-in-main/2-files/8-load-win32-files";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getWindowPos } from "../7-napi-calls";
import { getTlwInfos, getTlwScreenshots } from "../7-napi-calls/5-get-screenshots";
import { saveFileFromMain } from "../2-commands-in-main";

export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {
    switch (data.type) {
        
        // load
        
        case 'r2mi:load-files': {
            return loadWin32FilesContent(data.filenames, data.allowedExt);
        }
        // case 'r2mi:load-files2': {
        //     return loadWin32FilesContent(data.filenames);
        // }

        // napi

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
            const res = await getWindowMani(data.params);
            return res;
        }
        case 'r2mi:get-tlw-infos': {
            const res = await getTlwInfos();
            return res;
        }
        case "r2mi:get-tlw-screenshots": {
            const res = await getTlwScreenshots(data.tlwInfos);
            return res;
        }

        //

        case 'r2mi:save-file': {
            const { fileName, content } = data;
            const res = await saveFileFromMain(fileName, content);
            return res;
        }

        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
