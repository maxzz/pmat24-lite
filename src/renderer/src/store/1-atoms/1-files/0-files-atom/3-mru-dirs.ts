import { get, set } from "idb-keyval";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { appSettings } from "../../9-ui-state/0-local-storage-app";

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval

export function addToDirsMru(folder: PmatFolder) {
    try {
        asyncAddToDirsList(folder, hasMain());
        printRootDir(folder);
    } catch (error) {
        console.error('addToDirsMru', error);
    }
}

function printRootDir(folder: PmatFolder) {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', folder);
}

async function asyncAddToDirsList(folder: PmatFolder, isWin: boolean = false) {

    if (!isWin) {
        let list = await get<PmatFolder[]>('pmat25-mru-web');
        if (list) {
            const idx = list.findIndex((item) => item.rpath === folder.rpath);

            if (idx === 0) {
                return; // already in the list as first item
            } else if (idx >= 0) {
                list.splice(idx, 1); // remove from the list at current position
            }

            if (list.length > 10) {
                list.pop();
            }

            list.unshift(folder);
        } else {
            list = [folder];
        }

        set('pmat25-mru-web', list);
        return;
    } else {
        const list = appSettings.appUi.mru.win;

        // check if folder is already in the list
        const idx = list.findIndex((item) => item.rpath === folder.rpath);

        if (idx === 0) {
            return; // already in the list as first item
        } else if (idx >= 0) {
            list.splice(idx, 1); // remove from the list at current position
        }

        if (list.length > 10) {
            list.shift();
        }

        // add folder in front of the list
        list.unshift(folder);
    }
}
