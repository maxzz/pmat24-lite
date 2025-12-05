import { type R2MInvoke } from "@shared/ipc-types";
import { getTargetHwnd, getWindowIcon, getWindowControls, getWindowMani, getTlwInfos, getTlwScreenshots, highlightControl, highlightWindow, getWindowExtras, dndActionInit, getGeneralInfo, performCommand } from "../7-napi-calls";
import { asyncLoadWin32FilesContent } from "../2-commands-in-main/2-files/8-load-win32-files";
import { existsFileInMain, deleteFileInMain, generateUniqueFilename, revealInExplorer, saveFileInMain } from "../2-commands-in-main/2-files";
import { testInUseInMain_DeleteDir, testInUseInMain_Start, testInUseInMain_Set } from "../2-commands-in-main/3-test-inuse";
import { execFileInMain } from "../2-commands-in-main/2-files/4-exec-file";

// export async function invokeFromRendererInMain<TInvoke extends R2MInvoke.AllInvokes>(data: TInvoke): Promise<R2MInvoke.InvokeResult<TInvoke>> {
export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {

    switch (data.type) {
        // files

        case 'r2mi:load-files': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.DoLoadfiles> = await asyncLoadWin32FilesContent(data.filenames, data.allowedExt);
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

        case 'r2mi:exec-file': {
            const { fileName } = data;
            const rv: R2MInvoke.InvokeResult<R2MInvoke.ExecFile> = await execFileInMain(fileName);
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
        case 'r2mi:get-window-pos-init': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowPosInit> = dndActionInit(data.params);
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
        case 'r2mi:highlight-field': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightField> = await highlightControl(data.params);
            return rv;
        }
        case 'r2mi:highlight-target': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.HighlightTarget> = await highlightWindow(data.params);
            return rv;
        }
        case 'r2mi:get-window-extras': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetWindowExtras> = await getWindowExtras({ hwnds: data.hwnds });
            return rv;
        }

        case 'r2mi:get-general-info': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GeneralInfo> = await getGeneralInfo();
            return rv;
        }
        case 'r2mi:perform-command': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.PerformCommand> = await performCommand(data.params);
            return rv;
        }

        // test in use

        case 'r2mi:test-in-use-start': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.TestInUse_Start> = await testInUseInMain_Start(data.files);
            return rv;
        }
        case 'r2mi:test-in-use-set': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.TestInUse_Set> = await testInUseInMain_Set(data.files);
            return rv;
        }
        case 'r2mi:test-in-use-delete-dir': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.TestInUse_DeleteDir> = await testInUseInMain_DeleteDir();
            return rv;
        }

        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}
