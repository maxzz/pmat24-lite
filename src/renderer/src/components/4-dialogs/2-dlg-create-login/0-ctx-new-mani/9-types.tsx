import type { PrimitiveAtom as PA } from "jotai";
import type { FileUs } from "@/store";

export type NewManiContentData = {
    maniXmlAtom: PA<string | undefined>;    // xml of the selected application
    fileUsAtom: PA<FileUs | undefined>;     // fileUs of the selected application
};
