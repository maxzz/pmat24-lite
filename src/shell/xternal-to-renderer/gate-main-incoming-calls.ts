import { Notification } from "electron";
import { R2M } from "@shared/ipc-types";
import { mainStore } from "@shell/store-main";
import { getElectronModulePaths, highlightRect } from "./7-napi-calls";
import { mainToRenderer } from "./main-to-renderer";
import { openFileDialogAndReply, setSawMode } from "./commands";
import { winApp } from "@shell/start-main-window/main-window";

export async function callFromRendererToMain(data: R2M.AllCalls): Promise<void> {
    switch (data.type) {
        case 'r2m:menu:command': {
            switch (data.what) {
                case 'exit': {
                    winApp?.close();
                    break;
                }
                case 'open-dev-tools': {
                    winApp?.webContents.openDevTools();
                    break;
                }
            }
            break;
        }

        case 'r2m:file:load-manifests-dialog': {
            openFileDialogAndReply(winApp, { openDirs: data.openDirs });
            break;
        }

        //

        case 'r2m:dark-mode': {
            data.active;
            break;
        }

        case 'r2m:notify': {
            new Notification({ title: 'My Noti', body: data.message }).show();
            break;
        }
        
        // napi

        case 'r2m:set-napi-options': {
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

        case 'r2m:set-saw-mode': {
            mainStore.sawModeIsOn = data.isOn;
            setSawMode(data.isOn);
            break;
        }

        // tests
        
        case 'r2m:file:load-test-manifests': {
            openFileDialogAndReply(winApp);
            // const loadedFiles = await mainStore.loadTestManifests();
            // mainToRenderer({ type: 'm2r:loaded-files', filesCnt: loadedFiles });
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
