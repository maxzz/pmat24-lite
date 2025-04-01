import { type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom: PA<string | undefined> = atom<string | undefined>(undefined);
    fileUsAtom: PA<FileUs | undefined> = atom<FileUs | undefined>(undefined);
    fileUsMasterAtom: PA<FileUs | undefined> = atom<FileUs | undefined>(undefined);

    clear(set: Setter) {
        set(this.maniXmlAtom, undefined);
        set(this.fileUsAtom, undefined);
        set(this.fileUsMasterAtom, undefined);
    }
};

export const newManiContent = new NewManiContent();
