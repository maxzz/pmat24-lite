import { shell } from "electron";
import { iniFileOptions } from "./8-ini-file-options";
import { electronState, sessionState } from "@shell/2-electron-globals";
import { type AppWindow } from "./7-app-window-instance";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";
import { testInUseInMain_QuitWithReload } from "../../xternal-to-renderer/2-commands-in-main/3-test-inuse";

export function setAppWindowListeners(appWindow: AppWindow) {
    if (!appWindow.wnd) {
        return;
    }

    appWindow.wnd.on('ready-to-show', () => {
        if (!appWindow.wnd) {
            return;
        }

        if (iniFileOptions.options?.devTools && !appWindow.wnd.webContents.isDevToolsOpened()) {
            appWindow.wnd.webContents.toggleDevTools();
        }
        appWindow.wnd.show();
    });

    appWindow.wnd.on('close', async (event: Electron.Event) => {
        if (!appWindow.wnd) {
            return;
        }

        if (electronState.sawModeIsOn) {
            event.preventDefault();

            setSawModeOnMain(appWindow.wnd, { setOn: false, position: 0 });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
        } else {
            iniFileOptions.save(appWindow.wnd);

            event.preventDefault();

            if (sessionState.hasChanges) {
                mainToRenderer({ type: 'm2r:ask-close-from-main-with-changes' });
            } else {
                await testInUseInMain_QuitWithReload();
                setTimeout(() => appWindow.wnd!.destroy(), 100);
            }
        }
    });

    appWindow.wnd.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}
