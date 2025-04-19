import { type Setter, type PrimitiveAtom, atom } from "jotai";
import { type RowInputState } from "@/ui";
import { type FileUsAtom, type FileUs, type OFormContextProps, doDisposeFileUsAtomAtom } from "@/store";
import { type NewManiContentData } from "./9-types";
import { FormIdx } from "@/store/manifest";

class NewManiContent implements NewManiContentData {
    maniXmlAtom = atom<string | undefined>(undefined);
    newFileUsAtom: FileUsAtom | undefined = undefined;
    maniForCpassAtom: FileUsAtom | undefined = undefined;

    init(set: Setter) {
        this.maniXmlAtom = atom<string | undefined>(undefined);
        set(doDisposeFileUsAtomAtom, newManiContent.newFileUsAtom);
        this.newFileUsAtom = undefined;
    }
};

export const newManiContent = new NewManiContent();

/**
 * New manifest fileUs atom. This is non-reactive atom, just to use it in UI when FileUs atom was created.
 */
export const newManiFileUsAtom = atom<FileUs | undefined>(
    (get) => {
        if (!newManiContent.newFileUsAtom) {
            return undefined;
        }
        return get(newManiContent.newFileUsAtom);
    }
);

/**
 * New manifest display name atom. This is non-reactive atom, just to use it in UI when FileUs atom was created.
 */
export const newManiDispNameAtom = atom<PrimitiveAtom<RowInputState> | null>(
    (get) => {
        const fileUs = get(newManiFileUsAtom);
        if (!fileUs) {
            return null;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        const login = maniAtoms?.[FormIdx.login];
        if (!login) {
            return null;
        }

        const loginCtx: OFormContextProps | undefined = { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
        const { nameAtom } = loginCtx.oAllAtoms.options.p1General;

        return nameAtom;
    },
);
