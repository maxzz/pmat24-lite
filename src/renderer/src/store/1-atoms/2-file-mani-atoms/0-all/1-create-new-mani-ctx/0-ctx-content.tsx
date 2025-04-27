import { type Getter, type Setter, type PrimitiveAtom, atom } from "jotai";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { type NewManiContentType } from "./9-types";
import { type OFormContextProps } from "../../9-types";

class NewManiContent implements NewManiContentType {
    maniXmlStrAtom = atom<string | undefined>(undefined);
    newFileUsAtomAtom = atom<FileUsAtom | undefined>(undefined);
    maniForCpassAtom: FileUsAtom | undefined = undefined;

    init(get: Getter, set: Setter) {
        printNewManiCtxInit(get);

        this.maniXmlStrAtom = atom<string | undefined>(undefined);

        if (get(this.newFileUsAtomAtom)) {
            throw new Error('newFileUsAtomAtom should be undefined');
            // The previuos operation should clean up the newFileUsAtomAtom. If atom is taken then it's not disposed from there.
            //set(doDisposeFileUsAtomAtom, this.newFileUsAtom); // This is wrong, the previuos operation should clean up the fileUsAtom. If atom is taken then it's not disposed, if not then it should be disposed.
        }
        set(this.newFileUsAtomAtom, undefined);
    }
};

export const newManiContent = new NewManiContent();

export const doInitNewManiContentAtom = atom(null,
    (get, set) => {
        newManiContent.init(get, set);
    }
);

/**
 * New manifest fileUs atom. This is non-reactive atom, just to use it in UI when FileUs atom was created.
 */
export const newManiFileUsAtom = atom<FileUs | undefined>(
    (get) => {
        const newFileUsAtom = get(newManiContent.newFileUsAtomAtom);
        if (!newFileUsAtom) {
            return undefined;
        }
        return get(newFileUsAtom);
    }
);

/**
 * New manifest display name atom. This is non-reactive atom, just to use it in UI when FileUs atom was created.
 */
export const newManiDispNameAtom = atom<PrimitiveAtom<RowInputState> | null>(
    (get) => {
        printNewManiCtx(get);

        const fileUs = get(newManiFileUsAtom);
        if (!fileUs || !fileUs.maniAtomsAtom) {
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

function printNewManiCtxInit(get: Getter) {
    const newAtom = get(newManiContent.newFileUsAtomAtom);
    const atomStr = newAtom ? newAtom.toString() : null;
    console.groupCollapsed(
        `%c🎈🎈🎈 newMani.ctx.init: new fileUsAtom:%c ${atomStr}%c (if OK then it should be null)`,
        newAtom ? 'font-weight: normal; background-color: red; color: white' : 'font-weight: normal; background-color: limegreen; color: darkgreen',
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

function printNewManiCtx(get: Getter) {
    const newAtom = get(newManiContent.newFileUsAtomAtom);
    const atomStr = newAtom ? newAtom.toString() : null;
    console.groupCollapsed(
        `%cnewMani.ctx.mani-name access: fileUsAtom%c ${atomStr} %c`,
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray'
    );
    console.trace();
    console.groupEnd();
}
