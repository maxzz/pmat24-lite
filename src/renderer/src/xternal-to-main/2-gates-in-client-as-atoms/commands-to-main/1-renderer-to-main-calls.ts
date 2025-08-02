import { type R2MParams } from "@shared/ipc-types";
import { sendToMainTyped } from "../3-to-main-apis";

export namespace R2MCalls {

    // menu, load files

    export function menuCommand(params: R2MParams.MenuCommand): void {
        sendToMainTyped({ type: 'r2m:menu:command', ...params });
    }

    export function loadManifestsDialog(params: R2MParams.LoadManifestsDialog): void {
        sendToMainTyped({ type: 'r2m:file:load-manifests-dialog', ...params }); // will reply with 'm2r:loaded-files'
    }

    // options, notify

    export function darkMode(params: R2MParams.DarkMode): void {
        sendToMainTyped({ type: 'r2m:dark-mode', ...params });
    }

    export function notify(params: R2MParams.NotifyMessage): void {
        sendToMainTyped({ type: 'r2m:notify', ...params });
    }

    export function setSawPosition(params: R2MParams.SetSawPosition): void {
        sendToMainTyped({ type: 'r2m:set-saw-position', ...params });
    }

    export function setModifiedFilesState(modified: boolean): void {
        sendToMainTyped({ type: 'r2m:set-modified-files-state', modified });
    }

    export function closeWithoutChangesCheck(): void {
        sendToMainTyped({ type: 'r2m:close-without-changes-check' });
    }

    // napi

    export function setNapiOptions(params: R2MParams.SetNapiOptions): void {
        sendToMainTyped({ type: 'r2m:set-napi-options', ...params });
    }

    export function cancelDetection(): void {
        sendToMainTyped({ type: 'r2m:cancel-detection' });
    }

    export function setSawModeOnMain(params: R2MParams.SetSawMode): void {
        sendToMainTyped({ type: 'r2m:set-saw-mode', ...params });
    }

    export function showHideWindow(showHide: boolean): void {
        sendToMainTyped({ type: 'r2m:show-hide-window', showHide });
    }

    export function getWindowPosAction(params: 'move' | 'stop'): void {
        sendToMainTyped({ type: 'r2m:get-window-pos-action', params });
    }

    // tests

    export function loadTestManifests(): void {
        sendToMainTyped({ type: 'r2m:file:load-test-manifests' });
    }

    export function startTestFromMain(): void {
        sendToMainTyped({ type: 'r2m:test' });
    }

} //namespace R2MCalls
