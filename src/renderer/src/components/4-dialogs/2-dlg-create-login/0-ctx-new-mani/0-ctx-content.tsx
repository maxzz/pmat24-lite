import { type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { type FileUs } from "@/store";

type NewManiContentData = {                      // Created content of the context regardless of current ctx state (like page, scroll, etc)
    maniXmlAtom: PA<string | undefined>;         // xml of the selected application
    fileUsAtom: PA<FileUs | undefined>;          // fileUs of the selected application
};

class NewManiContent implements NewManiContentData {
    maniXmlAtom: PA<string | undefined> = atom<string | undefined>(undefined);
    fileUsAtom: PA<FileUs | undefined> = atom<FileUs | undefined>(undefined);

    clear(set: Setter) {
        set(this.maniXmlAtom, undefined);
        set(this.fileUsAtom, undefined);
    }
};

export const newManiContent = new NewManiContent();
