import { atom } from "jotai";
import { type M2R } from "../../../shared/ipc-types";
import { doSetDeliveredFilesAtom } from "@/store/1-atoms/1-files";
import { buildProgressState, maniBuildState } from "@/store/state-debug";
import { finalizeFileContent, setRootFromMainFileContents } from "./commands/10-invoke-load-files";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.AllTypes) => {
        switch (data.type) {

            // load files

            case 'm2r:loaded-files': {
                const rv = data.filesCnt.map(finalizeFileContent);
                
                //console.log('entryRoot75: 6 result from call to main from loadManifestsDialog() with sendToMain()');
                setRootFromMainFileContents(rv);

                set(doSetDeliveredFilesAtom, rv);
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
                buildProgressState.buildCounter = data.progress;
                break;
            }
            case 'm2r:position-progress': {
                buildProgressState.getPosProgress = data.progress;
                break;
            }
            case 'm2r:failed-raw-content': {
                maniBuildState.buildFailedBody = data.body;
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
