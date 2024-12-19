import { proxySet } from "valtio/utils";
import { type ChangesSet } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();

// fileUs changes

export function setFileUsChangeFlag({ fileUs }: { fileUs: FileUs; }, changed: boolean, changeName: string): ChangesSet {
    const set = fileUs.fileCnt.changesSet;
    set[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[set.size ? 'add' : 'delete'](`${fileUs.fileCnt.unid}`);

    //console.log('Single File Changes:', JSON.stringify([...changes.keys()]));
    return set;
}

export function clearFileUsChanges({ fileUs }: { fileUs: FileUs; }) {
    fileUs.fileCnt.changesSet.clear();
    allFileUsChanges.delete(`${fileUs.fileCnt.unid}`);
}

export function hasFileUsChange({ fileUs }: { fileUs: FileUs; }, name: string): boolean {
    return fileUs.fileCnt.changesSet.has(name);
}

export function hasFileUsAnyChanges({ fileUs }: { fileUs: FileUs; }): boolean {
    return fileUs.fileCnt.changesSet.size > 0;
}
