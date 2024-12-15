import { proxySet } from "valtio/utils";
import { type FileUs } from "@/store/store-types";

export type ChangesSet = Set<string>;

// fileUs changes

export function setManiChanges(fileUsCtx: { fileUs: FileUs; }, changed: boolean, changeName: string): ChangesSet {

    const fileUs = fileUsCtx.fileUs;

    const changes = fileUs.fileCnt.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    //console.log('Single File Changes:', JSON.stringify([...changes.keys()]));

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.fileCnt.unid}`);

    return changes;
}

export function hasManiChange(fileUsCtx: { fileUs: FileUs; }, name: string): boolean {
    const fileUs = fileUsCtx.fileUs;
    return fileUs.fileCnt.changesSet.has(name);
}

export function hasAnyManiChange(fileUsCtx: { fileUs: FileUs; }): boolean {
    const fileUs = fileUsCtx.fileUs;
    return fileUs.fileCnt.changesSet.size > 0;
}

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();
