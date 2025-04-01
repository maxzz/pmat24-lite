import type { PrimitiveAtom as PA } from "jotai";
import type { FileUs } from "@/store";

export type NewManiContentData = {
    maniXmlAtom: PA<string | undefined>;    // new xml string of the selected application
    fileUsAtom: PA<FileUs | undefined>;     // new fileUs of the selected application
    fileUsMasterAtom: PA<FileUs | undefined>; // fileUs to create password change form
};
