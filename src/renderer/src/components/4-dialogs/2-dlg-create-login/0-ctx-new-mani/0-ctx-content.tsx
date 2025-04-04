import { type Setter, atom } from "jotai";
import { type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    fileUsAtom = atom<FileUs | undefined>(undefined);
    mainForCpassAtom = undefined;

    clear(set: Setter) {
        set(this.maniXmlAtom, undefined);
        set(this.fileUsAtom, undefined);
    }
};

export const newManiContent = new NewManiContent();
