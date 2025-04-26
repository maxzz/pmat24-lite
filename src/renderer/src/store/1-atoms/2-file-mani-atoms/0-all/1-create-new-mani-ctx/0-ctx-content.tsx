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
        this.maniXmlStrAtom = atom<string | undefined>(undefined);
        set(doDisposeFileUsAtomAtom, newManiContent.newFileUsAtom);
        this.newFileUsAtom = undefined;

        printNewManiCtxInit();
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

function printNewManiCtxInit() {
    const atomStr = newManiContent.newFileUsAtom ? newManiContent.newFileUsAtom.toString() : null;
    console.groupCollapsed(
        `%c🎈🎈🎈 newManiCtx.init: new fileUsAtom:%c ${atomStr} %c`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

function printNewManiCtx(get: Getter) {
    const fileUs = newManiContent.newFileUsAtom && get(newManiContent.newFileUsAtom);
    const atomStr = newManiContent.newFileUsAtom ? newManiContent.newFileUsAtom.toString() : null;
    console.groupCollapsed(
        `%c🎈newManiCtx.name: new fileUsAtom:%c ${atomStr} %cuuid:${fileUs?.fileCnt?.unid}`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: gray',
        { fileUs }
    );
    console.trace();
    console.groupEnd();
}
