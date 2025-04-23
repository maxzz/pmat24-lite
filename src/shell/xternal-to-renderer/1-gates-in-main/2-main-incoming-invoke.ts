import { R2MInvoke } from "@shared/ipc-types";
import { loadWin32FilesContent } from "../2-commands-in-main/2-files/8-load-win32-files";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getWindowPos } from "../7-napi-calls";
import { getTlwInfos, getTlwScreenshots } from "../7-napi-calls/5-get-screenshots";
import { existsFileInMain, deleteFileInMain, generateUniqueFilename, revealInExplorer, saveFileInMain } from "../2-commands-in-main/2-files";

// export async function invokeFromRendererInMain<TInvoke extends R2MInvoke.AllInvokes>(data: TInvoke): Promise<R2MInvoke.InvokeResult<TInvoke>> {
export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {

    switch (data.type) {
        // files

        case 'r2mi:load-files': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.DoLoadfiles> = loadWin32FilesContent(data.filenames, data.allowedExt)
            return rv;
        }

        case 'r2mi:save-file': {
            const { fileName, content } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.SaveFile> = await saveFileInMain(fileName, content);
            return rv;
        }

        case 'r2mi:delete-file': {
            const { fileName } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.Deletefile> = await deleteFileInMain(fileName);
            return rv;
        }

        case 'r2mi:file-exists': {
            const { fileName } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.FileExists> = await existsFileInMain(fileName);
            return rv;
        }

        case 'r2mi:get-unique-filename': {
            const { fileName } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetUniqueFilename> = await generateUniqueFilename(fileName);
            return rv;
        }

        case 'r2mi:reveal-in-explorer': {
            const { fpath } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.RevealInExplorer> = await revealInExplorer(fpath);
            return rv;
        }

        // napi

        case 'r2mi:get-target-hwnd': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowHandle> = await getTargetHwnd();
            return rv;
        }
        case 'r2mi:get-window-controls': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowContent> = await getWindowControls(data.hwnd);
            return rv;
        }
        case 'r2mi:get-window-icon': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowIcon> = await getWindowIcon(data.hwnd);
            return rv;
        }
        case 'r2mi:get-window-pos': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowPos> = await getWindowPos(data.hwnd);
            return rv;
        }
        case 'r2mi:get-window-mani': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetSecondWindowMani> = await getWindowMani(data.params);
            return rv;
        }
        case 'r2mi:get-tlw-infos': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetTlwInfos> = await getTlwInfos();
            return rv;
        }
        case "r2mi:get-tlw-screenshots": {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetTlwScreenshots> = await getTlwScreenshots(data.tlwInfos);
            return rv;
        }

        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
