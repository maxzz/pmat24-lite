import { type FileUs } from "@/store/store-types";
import { type FceAtoms } from "../9-types";

let rootFcFileUs: FileUs | undefined;

export function getRootFceAtoms(): FceAtoms {
    if (!rootFcFileUs?.fceAtoms) {
        throw new Error('rootFcFileUs.fceAtoms not set');
    }
    return rootFcFileUs.fceAtoms;
}

export function setRootFcFileUs(rootFcFileUs: FileUs) {
    rootFcFileUs = rootFcFileUs;
}
