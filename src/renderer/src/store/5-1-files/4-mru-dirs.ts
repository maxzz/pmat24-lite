import { ref, snapshot, subscribe } from "valtio";
import { errorToString, normalizeFpath, showStack, toWindows } from "@/utils";
import { get, set } from "idb-keyval";
import { appSettings } from "@/store/9-ui-state";
import { type PmatFolder } from "./9-types";
import { isPmatFolderEmpty } from "@/store/5-1-files";

export function addToDirsMru(folder: PmatFolder) {
    try {
        updateMruList(appSettings.appUi.mru.folders, folder);
        printRootDir(folder, 'setRootDir');
    } catch (error) {
        console.error(errorToString(error));
    }
}

export function removeFromDirsMru(folder: PmatFolder) {
    try {
        removeMruListItem(appSettings.appUi.mru.folders, folder);
        //printMruList(appSettings.appUi.mru.folders);
    } catch (error) {
        console.error(errorToString(error));
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

    folder = { ...folder }; // copy because it can be ref and as result frozen

    folder.fpath = toWindows(folder.fpath).toLowerCase(); // normalize fpath

    const newFolder = ref(folder); // It should be ref() otherwise we'll loose the handle type and as result won't be able to restore handle from indexedDB

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

function removeMruListItem(items: PmatFolder[], folder: PmatFolder): boolean {
    if (isPmatFolderEmpty(folder)) {
        return false;
    }

    folder.fpath = normalizeFpath(folder.fpath);

    const idx = items.findIndex((item) => item.fpath === folder.fpath);
    if (idx >= 0) {
        items.splice(idx, 1);
        return true;
    }

    return false;
}

// Initialize

/**
 * Call this function to initialize global settings before UI is rendered.
 * This is critical to initializeMruIndexDB() that will convert appSettings.files.mru.folders to valtio refs.
 * Do nothing just load module first and the rest will be done inside module load.
 */
export function initializeMru(hasMainReal: boolean) {
    //showStack('initializeMru hasMainReal', hasMainReal);
    if (hasMainReal) {
        return;
    }

    clearMruFromLocalStorage();         // For non electron app clear MRU list from localStorage
    initializeMruIndexDB();             // Intentionally call async wo/ await

    function clearMruFromLocalStorage() {
        // For non electron app clear MRU list from localStorage.
        appSettings.appUi.mru.folders = []; // The list will be loaded from indexDB with FileSystemDirectoryHandles.
    }

    /**
     * For non electron app subscribe, for electron no need to subscribe. electron has no directory handles.
     * MRU list
     * https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
     *      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
     *          https://github.com/jakearchibald/idb-keyval
     */
    async function initializeMruIndexDB() {
        if (hasMainReal) {
            return;
        }

        const folders = await get<PmatFolder[]>('pmat25-mru-web') || [];
        appSettings.appUi.mru.folders = folders.filter(item => item.fpath).map(ref); // filter out empty folders, somehow we had rpath instead of fpath and set items as valtio refs

        subscribe(appSettings.appUi.mru, () => {
            const snapFoloders = snapshot(appSettings.appUi.mru).folders as PmatFolder[];
            //printMruList(snapFoloders);
            set('pmat25-mru-web', snapFoloders);
        });
    }
}

// Utilities

function printRootDir(folder: PmatFolder, title: string) {
    console.log(`%c ${title} `, 'background-color: magenta; color: white', folder);
}

function printMruList(folders: PmatFolder[]) {
    folders.forEach((folder) => printRootDir(folder, 'MRU'));
}
