import { type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { type FileUs } from "@/store";

export type CtxContent = {                       // Created content of the context regardless of current ctx state (like page, scroll, etc)
    maniXmlAtom: PA<string | undefined>;         // xml of the selected application
    fileUsAtom: PA<FileUs | undefined>;          // fileUs of the selected application
};

export const ctxContent: CtxContent & { clear(set: Setter): void } = {
    maniXmlAtom: atom<string | undefined>(undefined),
    fileUsAtom: atom<FileUs | undefined>(undefined),

    clear(set: Setter) {
        set(this.maniXmlAtom, undefined);
        set(this.fileUsAtom, undefined);
    }
};

export function clearManiCtxManiData(ctxContent: CtxContent, set: Setter) {
    set(ctxContent.maniXmlAtom, undefined);
    set(ctxContent.fileUsAtom, undefined);
}
