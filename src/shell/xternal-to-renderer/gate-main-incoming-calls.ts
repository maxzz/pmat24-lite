import { Notification } from "electron";
import { M4R } from "@shared/ipc-types";
import { mainStore } from "@shell/store-main";
import { getElectronModulePaths, highlightRect } from "./calls-napi";
import { mainToRenderer } from "./main-to-renderer";
import { openFileDialog } from "./commands";
import { winApp } from "@shell/start-main-window/main-window";

export async function callFromRendererToMain(data: M4R.ToMainCalls): Promise<void> {
    switch (data.type) {
        case 'r2m:file:load-manifests-dialog': {
            openFileDialog(winApp, { openDirs: data.opendirs });
            break;
        }

        //

        case 'r2m:notify': {
            new Notification({ title: 'My Noti', body: data.message }).show();
            break;
        }
        case 'r2m:dark-mode': {
            data.active;
            break;
        }
        case 'r2m:set-client-options': {
            mainStore.maxControls = data.state.maxControls;
            break;
        }
        case 'r2m:cancel-detection': {
            mainStore.cancelDetection = true;
            break;
        }
        case 'r2m:highlight-rect': {
            highlightRect(data.hwnd, data.rect);
            break;
        }

        //
        
        case 'r2m:file:load-test-manifests': {
            openFileDialog(winApp);
            // const loadedFiles = await mainStore.loadTestManifests();
            // mainToRenderer({ type: 'm2r:opened-files', filesCnt: loadedFiles });
            break;
        }
        case 'r2m:test': {
            mainToRenderer({ type: 'm2r:log', body: getElectronModulePaths() });
            break;
        }
        
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
