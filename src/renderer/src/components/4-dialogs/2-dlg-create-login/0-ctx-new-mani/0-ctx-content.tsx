import { atom } from "jotai";
import { type FileUsAtom, type FileUs } from "@/store";
import { type NewManiContentData } from "./9-types";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    newFileUsAtom = atom<FileUs | undefined>(undefined); //TODO: it's better to use FileUsAtom | undefined
    maniForCpassAtom: FileUsAtom | undefined = undefined;

    init() {
        this.maniXmlAtom = atom<string | undefined>(undefined);
        this.newFileUsAtom = atom<FileUs | undefined>(undefined);
    }
};

export const newManiContent = new NewManiContent();
