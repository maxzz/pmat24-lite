import { get, set } from "idb-keyval";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { appSettings } from "../../9-ui-state/0-local-storage-app";

export function addToDirsMru(folder: PmatFolder) {
    try {
        asyncAddToDirsList(folder, hasMain());
        printRootDir(folder);
    } catch (error) {
        console.error('addToDirsMru', error);
    }
}

/**
 * MRU list
 * https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
 *      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
 *          https://github.com/jakearchibald/idb-keyval
 */
async function asyncAddToDirsList(folder: PmatFolder, isWin: boolean = false) {
    if (isWin) {
        updateMruList(appSettings.appUi.mru.win, folder);
    } else {
        let items = await get<PmatFolder[]>('pmat25-mru-web') || [];
        if(updateMruList(items, folder)) {
            set('pmat25-mru-web', items);
        }
    }
}

/**
 * Add folder to the list and remove it from the list if it is already there or update folder position in the list.
 * @returns True if the list was updated.
 */
function updateMruList(items: PmatFolder[], folder: PmatFolder): boolean {
    const idx = items.findIndex((item) => item.rpath === folder.rpath);

    if (idx === 0) {
        return false; // already in the list as first item
    }
    else if (idx >= 0) {
        items.splice(idx, 1); // remove from the list at current position
    }

    if (items.length > 10) {
        items.shift();
    }

    items.unshift(folder);
    return true;
}

// get MRU List

export async function getMruList(isWin: boolean = false): Promise<PmatFolder[]> {
    if (isWin) {
        return appSettings.appUi.mru.win;
    } else {
        return await get<PmatFolder[]>('pmat25-mru-web') || [];
    }
}

//

function printRootDir(folder: PmatFolder) {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', folder);
}
