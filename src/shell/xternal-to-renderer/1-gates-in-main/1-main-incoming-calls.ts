import { Notification } from "electron";
import { type R2M } from "@shared/ipc-types";
import { electronState } from "@shell/2-electron-globals";
import { mainToRenderer } from "./3-main-to-renderer";
import { winApp } from "@shell/1-start-main-window/1-create-main-window";
import { getElectronModulePaths, highlightField } from "../7-napi-calls";
import { openFileDialogAndReply, setSawModeOnMain } from "../2-commands-in-main";

export async function callFromRendererInMain(data: R2M.AllCalls): Promise<void> {
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
            electronState.maxControls = data.state.maxControls;
            break;
        }
        case 'r2m:cancel-detection': {
            electronState.cancelDetection = true;
            break;
        }
        case 'r2m:highlight-field': {
            highlightField(data);
            break;
        }

        case 'r2m:set-saw-mode': {
            setSawModeOnMain(winApp, data);
            break;
        }

        case 'r2m:show-hide-window': {
            data.showHide ? winApp?.show() : winApp?.hide();
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
