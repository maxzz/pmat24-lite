import { M2R } from "../../../shared/ipc-types";
import { atom } from "jotai";
import { filesContentAtom } from "@/store/atom-dropped-files";
import { buildState, clientState } from "@/store/app-state";

export const doFromMainAtom = atom(
    null,
    (get, set, data: M2R.RendererCalls) => {
        switch (data.type) {
            case 'm2r:dark-mode': {
                console.log('case dark-mode, active', data.active);
                break;
            }
            case 'm2r:reload-files': {
                console.log('m2r:reload-files');
                break;
            }
            case 'm2r:opened-files': {
                set(filesContentAtom, data.filesCnt);
                break;
            }
            case 'm2r:detection-progress': {
                buildState.buildCounter = data.progress;
                break;
            }
            case 'm2r:position-progress': {
                buildState.getPosProgress = data.progress;
                break;
            }
            case 'm2r:failed-raw-content': {
                clientState.buildFailedBody = data.body;
                break;
            }
            case 'm2r:log': {
                console.log('m2r:log', JSON.stringify(JSON.parse(data.body), null, 4));
                break;
            }
            default: {
                const really: never = data;
                throw new Error(`\nUnknown IPC-listener: ${JSON.stringify(really)}\n`);
            }
        }
    }
);
