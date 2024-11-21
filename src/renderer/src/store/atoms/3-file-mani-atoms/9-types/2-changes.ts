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

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();











//TODO: update fileUsCtx to fileUs only. field catalog has a different fileUsCtx
