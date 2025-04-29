import { ref, snapshot, subscribe } from "valtio";
import { toUnix } from "@/utils";
import { get, set } from "idb-keyval";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { isPmatFolderEmpty } from "@/store";
import { appSettings } from "../../9-ui-state/0-local-storage-app";

export function addToDirsMru(folder: PmatFolder) {
    try {
        updateMruList(appSettings.appUi.mru.folders, folder);
        printRootDir(folder, 'setRootDir');
    } catch (error) {
        console.error('addToDirsMru', error);
    }
}

/**
 * Add folder to the list and remove it from the list if it is already there or update folder position in the list.
 * @returns True if the list was updated.
 */
function updateMruList(items: PmatFolder[], folder: PmatFolder): boolean {
    if (isPmatFolderEmpty(folder)) {
        return false;
    }

    folder.fpath = toUnix(folder.fpath).toLowerCase(); // normalize fpath

    const newFolder = ref(folder); // We'll loose the handle type wo/ ref and as result cannot restore handle from indexedDB

    const idx = items.findIndex((item) => item.fpath === newFolder.fpath);

    if (idx === 0) { // already in the list as first item
        const replace = newFolder.handle && !items[0].handle; // It's kind of dangerous, we relly only on the last folder name.
        if (replace) {
            items.splice(idx, 1);
        } else {
            return false;
        }
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

    const folders = await get<PmatFolder[]>('pmat25-mru-web') || [];
    appSettings.appUi.mru.folders = folders.map(ref);

    subscribe(appSettings.appUi.mru, () => {
        const snapFoloders = snapshot(appSettings.appUi.mru).folders as PmatFolder[];
        // printMru(snapFoloders);
        set('pmat25-mru-web', snapFoloders);
    });
}
/**
 * For non electron app clear MRU list from localStorage. The list will be loaded from indexDB with FileSystemDirectoryHandles.
 * @returns 
 */
export function clearMruFromLocalStorage() {
    if (hasMain()) {
        return;
    }

    appSettings.appUi.mru.folders = [];
}

//

function printRootDir(folder: PmatFolder, title: string) {
    console.log(`%c ${title} `, 'background-color: magenta; color: white', folder);
}

function printMru(folders: PmatFolder[]) {
    folders.forEach((folder) => printRootDir(folder, 'MRU'));
}

//TODO: load MRU UI with framer and remove UI shifting

//04.29.25
//TODO: check if folder exists in electron version
