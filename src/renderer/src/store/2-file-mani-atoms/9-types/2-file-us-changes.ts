import { proxySet } from "valtio/utils";
import { type ChangesSet } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";
import { subscribe } from "valtio";
import { hasMain, R2MCalls } from "@/xternal-to-main";

// All files changes. It is important to show that some files have changes due to tree view scrolling.

export const allFileUsChanges = proxySet<string>();

export const fileUsChanges = {
    set: setChangeFlag,
    setNewLogin: setNewLoginChange, // new login form created. cannot be removed by user. Only delete or save (will reset this flag)
    setCpass: setCpassChange,       // added or deleted password change form change
    setUnchanged: clearAllChanges,  // clear file all changes
    hasAny: hasAnyChange,           // has any changes
    hasChange,                      // has change by name
    hasCpassChange,                 // added or deleted password change form change
};

// Set/clear changes

function setChangeFlag({ fileUs }: { fileUs: FileUs; }, changed: boolean, changeName: string): ChangesSet {
    const changes = fileUs.fileCnt.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.fileCnt.unid}`);
    //printChanges(fileUs);

    return changes;
}

function setNewLoginChange({ fileUs }: { fileUs: FileUs; }) {
    setChangeFlag({ fileUs }, true, 'login');
}

function setCpassChange({ fileUs }: { fileUs: FileUs; }, changed: boolean) {
    setChangeFlag({ fileUs }, changed, 'cpass');
}

function clearAllChanges({ fileUs }: { fileUs: FileUs; }) {
    fileUs.fileCnt.changesSet.clear();
    allFileUsChanges.delete(`${fileUs.fileCnt.unid}`);
}

// Changes check

function hasAnyChange({ fileUs }: { fileUs: FileUs; }): boolean {
    return fileUs.fileCnt.changesSet.size > 0;
}

function hasChange({ fileUs }: { fileUs: FileUs; }, name: string): boolean {
    return fileUs.fileCnt.changesSet.has(name);
}

function hasCpassChange({ fileUs }: { fileUs: FileUs; }): boolean {
    return hasChange({ fileUs }, 'cpass');
}

// Notify main process about changes

subscribe(allFileUsChanges,
    () => {
        if (hasMain()) { // We have to check if main is available at module load time (mainApi is not initialized yet).
            R2MCalls.setModifiedFilesState(allFileUsChanges.size > 0);
        }
    }
);

// Utilities

function printChanges(fileUs: FileUs) {
    const changes: ChangesSet = fileUs.fileCnt.changesSet;
    console.log('🚼 File Changes:', JSON.stringify([...changes.keys()]));
}
