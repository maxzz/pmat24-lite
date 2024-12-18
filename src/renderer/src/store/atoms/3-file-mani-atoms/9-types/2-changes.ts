import { proxySet } from "valtio/utils";
import { type ChangesSet } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";

// fileUs changes

export function setFileUsChangeFlag(fileUsCtx: { fileUs: FileUs; }, changed: boolean, changeName: string): ChangesSet {
    const fileUs = fileUsCtx.fileUs;

    const changes = fileUs.fileCnt.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.fileCnt.unid}`);

    //console.log('Single File Changes:', JSON.stringify([...changes.keys()]));
    return changes;
}

export function clearFileUsChanges(fileUsCtx: { fileUs: FileUs; }) {
    const fileUs = fileUsCtx.fileUs;

    fileUs.fileCnt.changesSet.clear();

    allFileUsChanges.delete(`${fileUs.fileCnt.unid}`);
}

export function hasFileUsChange(fileUsCtx: { fileUs: FileUs; }, name: string): boolean {
    const fileUs = fileUsCtx.fileUs;
    return fileUs.fileCnt.changesSet.has(name);
}

export function hasFileUsAnyChanges(fileUsCtx: { fileUs: FileUs; }): boolean {
    const fileUs = fileUsCtx.fileUs;
    return fileUs.fileCnt.changesSet.size > 0;
}

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();
