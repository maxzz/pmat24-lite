import { atom } from "jotai";
import { type FileUsAtom, type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    fileUsAtom = atom<FileUs | undefined>(undefined);
    mainForCpassAtom: FileUsAtom | undefined = undefined;

    init() {
        this.maniXmlAtom = atom<string | undefined>(undefined);
        this.fileUsAtom = atom<FileUs | undefined>(undefined);
    }
};

export const newManiContent = new NewManiContent();
