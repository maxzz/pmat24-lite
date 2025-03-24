import { snapshot, subscribe } from "valtio";
import { get, set } from "idb-keyval";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { appSettings } from "../../9-ui-state/0-local-storage-app";

export function addToDirsMru(folder: PmatFolder) {
    try {
        updateMruList(appSettings.appUi.mru.folders, folder);
        printRootDir(folder);
    } catch (error) {
        console.error('addToDirsMru', error);
    }
}

/**
 * Add folder to the list and remove it from the list if it is already there or update folder position in the list.
 * @returns True if the list was updated.
 */
function updateMruList(items: PmatFolder[], newFolder: PmatFolder): boolean {
    const idx = items.findIndex((item) => item.rpath === newFolder.rpath);

    if (idx === 0) { // already in the list as first item
        return false;
    }
    else if (idx >= 0) { // remove from the list at current position
        items.splice(idx, 1);
    }

    if (items.length > 10) {
        items.shift();
    }

    items.unshift(newFolder);
    return true;
}

// Initialize

/**
 * No need to subscribe for electron. electron has no directory handles.
 * 
 * MRU list
 * https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
 *      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
 *          https://github.com/jakearchibald/idb-keyval
 */
export async function initializeMruIndexDB() {
    if (hasMain()) {
        return;
    }

    appSettings.appUi.mru.folders = await get<PmatFolder[]>('pmat25-mru-web') || [];

    subscribe(appSettings.appUi.mru, () => {
        const snap = snapshot(appSettings.appUi.mru); // we loose handle type here and as result cannot restore handle from indexedDB

        console.log('appSettings.appUi.mru', snap);
        set('pmat25-mru-web', snap.folders);
    });
}

//

function printRootDir(folder: PmatFolder) {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', folder);
}
