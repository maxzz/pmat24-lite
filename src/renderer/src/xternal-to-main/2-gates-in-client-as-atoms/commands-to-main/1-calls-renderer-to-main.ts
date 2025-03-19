import { type R2MParams, type TargetClientRect } from "@shared/ipc-types";
import { sendToMain } from "../3-to-main-apis";

export namespace R2MCalls {

    // menu, load files

    export function menuCommand(params: R2MParams.MenuCommand): void {
        sendToMain({ type: 'r2m:menu:command', ...params });
    }

    export function loadManifestsDialog(params: R2MParams.LoadManifestsDialog): void {
        sendToMain({ type: 'r2m:file:load-manifests-dialog', ...params });
    }

    // options, notify

    export function darkMode(params: R2MParams.DarkMode): void {
        sendToMain({ type: 'r2m:dark-mode', ...params });
    }

    export function notify(params: R2MParams.NotifyMessage): void {
        sendToMain({ type: 'r2m:notify', ...params });
    }

    // napi

    export function setNapiOptions(params: R2MParams.SetNapiOptions): void {
        sendToMain({ type: 'r2m:set-napi-options', ...params });
    }

    export function cancelDetection(): void {
        sendToMain({ type: 'r2m:cancel-detection' });
    }

    export function highlightRect(hwnd: string, rect: TargetClientRect): void {
        sendToMain({ type: 'r2m:highlight-rect', hwnd, rect });
    }

    export function setSawMode(params: R2MParams.SetSawMode): void {
        sendToMain({ type: 'r2m:set-saw-mode', ...params });
    }

    export function showHideWindow(showHide: boolean): void {
        sendToMain({ type: 'r2m:show-hide-window', showHide });
    }

    // tests

    export function loadTestManifests(): void {
        sendToMain({ type: 'r2m:file:load-test-manifests' });
    }

    export function startTestFromMain(): void {
        sendToMain({ type: 'r2m:test' });
    }
}
