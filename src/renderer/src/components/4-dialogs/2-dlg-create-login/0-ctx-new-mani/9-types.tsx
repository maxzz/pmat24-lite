import { type PrimitiveAtom as PA } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store";

export type NewManiContentData = {
    maniXmlAtom: PA<string | undefined>;        // new xml string of the selected application
    fileUsAtom: PA<FileUs | undefined>;         // new fileUs of the selected application
    fileUsMasterAtom: FileUsAtom | undefined;   // fileUs to create password change form; valid only before and Saw monitor than fileUs memeber mainForCpassAtom will be used
};
