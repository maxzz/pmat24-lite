import { proxySet } from "valtio/utils";
import { type ChangesSet } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";

// All files changes. It is important to show that some files have changes due to tree view scrolling.

export const allFileUsChanges = proxySet<string>();

export const fileUsChanges = {
    set: setChangeFlag,
    setCpass: setCpassChange,   // add or delete password change form change
    clearAll: clearAllChanges,
    hasChange: hasChange,
    hasAny: hasAnyChange,
};

function setChangeFlag({ fileUs }: { fileUs: FileUs; }, changed: boolean, changeName: string): ChangesSet {
    const set = fileUs.fileCnt.changesSet;
    set[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[set.size ? 'add' : 'delete'](`${fileUs.fileCnt.unid}`);

    //console.log('Single File Changes:', JSON.stringify([...changes.keys()]));
    return set;
}

function setCpassChange({ fileUs }: { fileUs: FileUs; }, changed: boolean) {
    setChangeFlag({ fileUs }, changed, 'cpass');
}

function clearAllChanges({ fileUs }: { fileUs: FileUs; }) {
    fileUs.fileCnt.changesSet.clear();
    allFileUsChanges.delete(`${fileUs.fileCnt.unid}`);
}

function hasChange({ fileUs }: { fileUs: FileUs; }, name: string): boolean {
    return fileUs.fileCnt.changesSet.has(name);
}

function hasAnyChange({ fileUs }: { fileUs: FileUs; }): boolean {
    return fileUs.fileCnt.changesSet.size > 0;
}
