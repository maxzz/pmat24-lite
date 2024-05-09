import { proxySet } from "valtio/utils";
import { CreateAtomsParams } from "./1-mani-atoms";

export type ChangesSet = Set<string>;

// fileUs changes

export function setManiChanges(createAtomsParams: CreateAtomsParams, changed: boolean, changeName: string): ChangesSet {
    
    const fileUs = createAtomsParams.fileUs;
    
    const changes = fileUs.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.id}`);

    return changes;
}

// all files changes; it is important to show that some files have changes due to scrolling 

export const allFileUsChanges = proxySet<string>();
