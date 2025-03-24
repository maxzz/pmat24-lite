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
        addToDirsList(folder, hasMain());
        printRootDir(folder);
    } catch (error) {
        console.error('addToDirsMru', error);
    }
}

function printRootDir(folder: PmatFolder) {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', folder);
}

async function addToDirsList(folder: PmatFolder, isWin: boolean = false) {

    if (!isWin) {
        let currentList = await get<PmatFolder[]>('pmat25-mru-web');
        if (currentList) {
            if (currentList.find((item) => item.rpath === folder.rpath)) {
                return;
            }
            if (currentList.length > 10) {
                currentList.pop();
            }
            currentList.unshift(folder);
        } else {
            currentList = [folder];
        }
        set('pmat25-mru-web', currentList);
        return;
    }

    // const list = isWin ? appSettings.appUi.mru.win : appSettings.appUi.mru.web;

    // // check if folder is already in the list
    // const idx = list.findIndex((item) => item.rpath === folder.rpath);
    // if (idx >= 0) {
    //     list.splice(idx, 1);
    // }

    // if (list.length > 10) {
    //     list.shift();
    // }

    // // add folder in front of the list
    // list.unshift(folder);
}
