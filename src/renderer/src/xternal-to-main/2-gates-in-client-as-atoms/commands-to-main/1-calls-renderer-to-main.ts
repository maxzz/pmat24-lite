import { type R2MParams, type TargetClientRect } from "@shared/ipc-types";
import { sendToMain } from "../3-to-main-apis";

export namespace R2MCalls {

    // menu, load files

    export function menuCommand(state: R2MParams.MenuCommand): void {
        sendToMain({ type: 'r2m:menu:command', ...state });
    }

    export function loadManifestsDialog(state: R2MParams.LoadManifestsDialog): void {
        sendToMain({ type: 'r2m:file:load-manifests-dialog', ...state });
    }

    // options, notify

    export function darkMode(state: R2MParams.DarkMode): void {
        sendToMain({ type: 'r2m:dark-mode', ...state });
    }

    export function notify(message: R2MParams.NotifyMessage): void {
        sendToMain({ type: 'r2m:notify', ...message });
    }

    // napi

    export function setNapiOptions(state: R2MParams.SetNapiOptions): void {
        sendToMain({ type: 'r2m:set-napi-options', ...state });
    }

    export function cancelDetection(): void {
        sendToMain({ type: 'r2m:cancel-detection' });
    }

    export function highlightRect(hwnd: string, rect: TargetClientRect): void {
        sendToMain({ type: 'r2m:highlight-rect', hwnd, rect });
    }

    // tests

    export function loadTestManifests(): void {
        sendToMain({ type: 'r2m:file:load-test-manifests' });
    }

    export function startTestFromMain(): void {
        sendToMain({ type: 'r2m:test' });
    }

}
