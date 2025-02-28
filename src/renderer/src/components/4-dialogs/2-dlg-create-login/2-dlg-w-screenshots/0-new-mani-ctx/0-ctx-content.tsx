import { type Setter, type PrimitiveAtom as PA } from "jotai";
import { type FileUs } from "@/store";

export type CtxContent = {                       // Created content of the context regardless of current ctx state (like page, scroll, etc)
    maniXmlAtom: PA<string | undefined>;         // xml of the selected application
    fileUsAtom: PA<FileUs | undefined>;          // fileUs of the selected application
}

export function clearManiCtxManiData(ctxContent: CtxContent, set: Setter) {
    set(ctxContent.maniXmlAtom, undefined);
    set(ctxContent.fileUsAtom, undefined);
}
