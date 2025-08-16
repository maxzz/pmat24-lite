import { type FileUs } from "@/store/store-types";
import { type FceAtoms } from "../../9-types";

let rootFcFileUs: FileUs | undefined;

/**
 * If there are no files dropped the field catalog should not be created
 * since we don't know the folder, fc may already exist there.
 * We should show a notification to prevent any attempts to use the field catalog
 * without having a drop operation prior.
 */
export function hasRootFceAtoms(): boolean {
    return !!rootFcFileUs?.fceAtomsForFcFile;
}

export function getRootFceAtoms(): FceAtoms {
    if (!rootFcFileUs?.fceAtomsForFcFile) {
        throw new Error('root fc not set yet');
    }
    return rootFcFileUs.fceAtomsForFcFile;
}

export function setRootFcFileUs(fileUs: FileUs | undefined) {
    rootFcFileUs = fileUs;
    if (fileUs) {
        fileUs.parsedSrc.stats.isFCatRoot = true;
    }
}
