import { proxySet } from "valtio/utils";
import { FileUsCtx } from "./1-mani-atoms";

export type ChangesSet = Set<string>;

// fileUs changes

export function setManiChanges(fileUsCtx: FileUsCtx, changed: boolean, changeName: string): ChangesSet {
    
    const fileUs = fileUsCtx.fileUs;
    
    const changes = fileUs.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    //console.log('Single File Changes:', JSON.stringify([...changes.keys()]));

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.unid}`);

    return changes;
}

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();
