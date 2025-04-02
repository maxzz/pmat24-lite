import { type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    fileUsAtom = atom<FileUs | undefined>(undefined);
    fileUsMasterAtom: undefined;

    clear(set: Setter) {
        set(this.maniXmlAtom, undefined);
        set(this.fileUsAtom, undefined);
        this.fileUsMasterAtom = undefined;
    }
};

export const newManiContent = new NewManiContent();
