import { shell } from "electron";
import { iniFileOptions } from "./8-ini-file-options";
import { electronState, sessionState } from "@shell/2-electron-globals";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";
import { type AppWindow } from "./0-app-window";

export function setMainWindowListeners(appWindow: AppWindow) {
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

            if (sessionState.hasChanges) {
                event.preventDefault();
                mainToRenderer({ type: 'm2r:ask-close-from-main-with-changes' });
            } else {
                appWindow.wnd.destroy();
            }
        }
    });

    appWindow.wnd.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}
