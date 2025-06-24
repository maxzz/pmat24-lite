import { atom } from "jotai";
import { type M2R } from "../../../../shared/ipc-types";
import { doSetDeliveredFilesAtom } from "@/store/1-atoms/1-files";
import { stateNapiBuildMani, stateNapiAccess, stateNapiPosTracker } from "@/store/7-napi-atoms";
import { cancelSizeSmall_SawMonitorAtom } from "@/store/1-atoms/7-dialogs";
import { finalizeFileContent, getRootFromFpath } from "./commands-to-main";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.AllTypes): void => {
        switch (data.type) {

            // load files

            case 'm2r:loaded-files': {
                const deliveredFileContents = data.filesCnt.map(finalizeFileContent);
                const emptyFolder = data.emptyFolder;
                const root = emptyFolder
                    ? { fpath: emptyFolder, handle: undefined, fromMain: true }
                    : getRootFromFpath({ files: deliveredFileContents, fromMain: true });

                set(doSetDeliveredFilesAtom, { deliveredFileContents, root, noItemsJustDir: !!emptyFolder, });
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
