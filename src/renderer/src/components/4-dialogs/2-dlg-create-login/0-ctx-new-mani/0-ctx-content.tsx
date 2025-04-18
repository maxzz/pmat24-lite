import { type PrimitiveAtom, atom } from "jotai";
import { type RowInputState } from "@/ui";
import { type FileUsAtom, type FileUs, type OFormContextProps } from "@/store";
import { type NewManiContentData } from "./9-types";
import { FormIdx } from "@/store/manifest";

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

//

export const newManiDispNameAtom = atom<PrimitiveAtom<RowInputState> | null>(
    (get) => {
        const fileUs = get(newManiContent.newFileUsAtom);
        if (!fileUs) {
            return null;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return null;
        }

        const [login, cpass] = maniAtoms;
        if (!login) {
            return null;
        }

        const loginCtx: OFormContextProps | undefined = { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
        const { nameAtom } = loginCtx.oAllAtoms.options.p1General;

        return nameAtom;
    },
);
