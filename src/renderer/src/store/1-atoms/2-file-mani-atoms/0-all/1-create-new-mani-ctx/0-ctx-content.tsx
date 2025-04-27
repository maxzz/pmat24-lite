import { type Getter, type Setter, type PrimitiveAtom, atom } from "jotai";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/manifest";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { type NewManiContentType } from "./9-types";
import { type OFormContextProps } from "../../9-types";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";

class NewManiContent implements NewManiContentType {
    maniXmlStrAtom = atom<string | undefined>(undefined);
    newFileUsAtom: FileUsAtom | undefined = undefined;
    maniForCpassAtom: FileUsAtom | undefined = undefined;

    init(set: Setter) {
        printNewManiCtxInit();

        this.maniXmlStrAtom = atom<string | undefined>(undefined);
        set(doDisposeFileUsAtomAtom, this.newFileUsAtom); // This is wrong, the previuos operation should clean up the fileUsAtom. If atom is taken then it's not disposed, if not then it should be disposed.
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
        printNewManiCtx();

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

function printNewManiCtxInit() {
    const atomStr = newManiContent.newFileUsAtom ? newManiContent.newFileUsAtom.toString() : null;
    console.groupCollapsed(
        `%c🎈🎈🎈 newMani.ctx.init: new fileUsAtom:%c ${atomStr}%c (if OK then it should be null)`,
        newManiContent.newFileUsAtom ? 'font-weight: normal; background-color: red; color: white' : 'font-weight: normal; background-color: limegreen; color: darkgreen',
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

function printNewManiCtx() {
    const atomStr = newManiContent.newFileUsAtom ? newManiContent.newFileUsAtom.toString() : null;
    console.groupCollapsed(
        `%cnewMani.ctx.mani-name access: fileUsAtom%c ${atomStr} %c`,
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray'
    );
    console.trace();
    console.groupEnd();
}
