import { type PrimitiveAtom as PA } from "jotai";
import { type FileUsAtom } from "@/store/store-types";

/**
 * @member maniForCpassAtom -
 *  - Valid only before and during Saw monitor then fileUs.mainForCpassAtom
 *    will be used.Set before open Saw monitor.
 */
export type NewManiContentType = {
    maniXmlStrAtom: PA<string | undefined>;         // New xml string of the selected application
    newFileUsAtomAtom: PA<FileUsAtom | undefined>;  // New fileUs of the selected application
    maniForCpassAtom: FileUsAtom | undefined;       // Master fileUs atom to embed password change form into
};
