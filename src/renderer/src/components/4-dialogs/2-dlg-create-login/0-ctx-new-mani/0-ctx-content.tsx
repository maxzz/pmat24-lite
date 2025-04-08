import { type Setter, atom } from "jotai";
import { type FileUsAtom, type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    fileUsAtom = atom<FileUs | undefined>(undefined);
    mainForCpassAtom: FileUsAtom | undefined = undefined;

    clear(set: Setter) {
        // set(this.maniXmlAtom, undefined);
        // set(this.fileUsAtom, undefined);
        this.maniXmlAtom = atom<string | undefined>(undefined);
        this.fileUsAtom = atom<FileUs | undefined>(undefined);
    }
};

export const newManiContent = new NewManiContent();
