import { atom } from "jotai";
import { type M2R } from "../../../../shared/ipc-types";
import { stateNapiBuildMani, stateNapiAccess, stateNapiPosTracker } from "@/store/7-napi-atoms";
import { doSetDeliveredFilesAtom } from "@/store/0-serve-atoms/1-do-set-files";
import { doQuitFromMainAtom } from "@/store/0-serve-atoms";
import { cancelSizeSmall_SawMonitorAtom } from "@/store/4-dialogs-atoms/2-create-dialog-atoms/7-2-do-window-size";
import { finalizeFileContent, getRootFromFpath } from "./commands-to-main";
import { zoomLevelAtom } from "@/store/9-ui-state/8-app-ui/6-zoom-atom";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.AllTypes): void => {
        switch (data.type) {

            // load files

            case 'm2r:loaded-files': {
                // #region agent log: m2r:loaded-files received
                fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files', message: 'm2r:loaded-files received', data: { filesCntLen: data.filesCnt?.length || 0, emptyFolderLen: data.emptyFolder?.length || 0, firstExt: (data.filesCnt?.[0]?.fname || '').split('.').pop()?.toLowerCase() || '' }, timestamp: Date.now() }) }).catch(() => { });
                // #endregion

                // #region agent log: m2r:loaded-files received (ipc fallback)
                try {
                    typeof tmApi !== 'undefined'
                        && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files:received:ipc', message: 'm2r:loaded-files received', data: { filesCntLen: data.filesCnt?.length || 0, emptyFolderLen: data.emptyFolder?.length || 0, firstExt: (data.filesCnt?.[0]?.fname || '').split('.').pop()?.toLowerCase() || '' }, timestamp: Date.now(), } }).catch(() => { });
                } catch { }
                // #endregion

                try {
                    const deliveredFileContents = data.filesCnt.map(finalizeFileContent);
                    const emptyFolder = data.emptyFolder;
                    const root = emptyFolder
                        ? { fpath: emptyFolder, handle: undefined, fromMain: true }
                        : getRootFromFpath({ files: deliveredFileContents, fromMain: true });

                    const rootBase = (root.fpath || '').replace(/[\\\/\s]+$/, '').split(/[\\\/]/).filter(Boolean).pop() || '';
                    // #region agent log: m2r:loaded-files processed
                    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files', message: 'm2r:loaded-files processed', data: { deliveredLen: deliveredFileContents.length, noItemsJustDir: !!emptyFolder, rootBase, rootFpathLen: root.fpath?.length || 0 }, timestamp: Date.now() }) }).catch(() => { });
                    // #endregion

                    // #region agent log: m2r:loaded-files processed (ipc fallback)
                    try {
                        typeof tmApi !== 'undefined'
                            && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files:processed:ipc', message: 'm2r:loaded-files processed', data: { deliveredLen: deliveredFileContents.length, noItemsJustDir: !!emptyFolder, rootBase, rootFpathLen: root.fpath?.length || 0 }, timestamp: Date.now(), } }).catch(() => { });
                    } catch { }
                    // #endregion

                    set(doSetDeliveredFilesAtom, { deliveredFileContents, root, noItemsJustDir: !!emptyFolder, error: undefined, });
                } catch (error) {
                    // #region agent log: m2r:loaded-files exception
                    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files', message: 'm2r:loaded-files exception', data: error instanceof Error ? { message: error.message, stack: error.stack } : { errorType: typeof error, error: String(error) }, timestamp: Date.now() }) }).catch(() => { });
                    // #endregion

                    // #region agent log: m2r:loaded-files exception (ipc fallback)
                    try {
                        typeof tmApi !== 'undefined'
                            && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H1', location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts:m2r:loaded-files:exception:ipc', message: 'm2r:loaded-files exception', data: error instanceof Error ? { message: error.message, stack: error.stack } : { errorType: typeof error, error: String(error) }, timestamp: Date.now(), } }).catch(() => { });
                    } catch { }
                    // #endregion
                    throw error;
                }
                break;
            }

            case 'm2r:reload-files': {
                console.log('m2r:reload-files');
                break;
            }

            // options

            case 'm2r:dark-mode': {
                console.log('case dark-mode, active', data.active);
                break;
            }

            // close sequence

            case 'm2r:ask-close-from-main-with-changes': {
                // console.log('m2r:ask-close-from-main-with-changes');
                set(doQuitFromMainAtom);
                break;
            }

            // napi

            case 'm2r:detection-progress': {
                // console.log('m2r:detection-progress', data.progress);
                stateNapiBuildMani.buildCounter = data.progress;
                break;
            }
            case 'm2r:position-progress': {
                stateNapiPosTracker.current.x = data.progress.x;
                stateNapiPosTracker.current.y = data.progress.y;
                stateNapiPosTracker.current.isInside = data.progress.isInside;
                break;
            }
            case 'm2r:failed-raw-content': {
                stateNapiAccess.buildFailedBody = data.body;
                break;
            }
            case 'm2r:saw-mode-canceled': {
                // set(sawModeOnClientAtom, { turnOn: false, canceledByMain: true });
                set(cancelSizeSmall_SawMonitorAtom);
                break;
            }

            // ui state

            case 'm2r:zoom-level-changed': {
                set(zoomLevelAtom, data.level);
                break;
            }

            // tests

            case 'm2r:log': {
                console.log('m2r:log', JSON.stringify(JSON.parse(data.body), null, 4));
                break;
            }

            // types check

            default: {
                const really: never = data;
                throw new Error(`\nUnknown IPC-listener: ${JSON.stringify(really)}\n`);
            }
        }
    }
);
