import { type PrimitiveAtom as PA } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store";

/**
 * mainForCpassAtom: 
 *      Valid only before and during Saw monitor then fileUs.mainForCpassAtom will be used.
 *      Set before open Saw monitor.
 */
export type NewManiContentData = {
    maniXmlAtom: PA<string | undefined>;        // new xml string of the selected application
    fileUsAtom: PA<FileUs | undefined>;         // new fileUs of the selected application
    maniForCpassAtom: FileUsAtom | undefined;   // fileUs to create password change form
};
