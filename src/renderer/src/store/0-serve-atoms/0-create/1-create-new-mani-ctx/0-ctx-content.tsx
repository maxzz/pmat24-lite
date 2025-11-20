import { atom } from "jotai";
import { type RowInputStateAtom } from "@/ui/local-ui";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { type NewManiContentType } from "./9-types";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { pathToManiNameAtom } from "@/store/2-file-mani-atoms";

class NewManiContent implements NewManiContentType {
    maniXmlStrAtom = atom<string | undefined>(undefined);
    newFileUsAtomAtom = atom<FileUsAtom | undefined>(undefined);
    maniForCpassAtom: FileUsAtom | undefined = undefined;

    init(getset: GetSet) {
        const { get, set } = getset;

        this.maniXmlStrAtom = atom<string | undefined>(undefined);
        //printNewManiCtxInit(getset);
        if (get(this.newFileUsAtomAtom)) {
            throw new Error('newFileUsAtomAtom should be undefined'); // The previuos operation should clean up the newFileUsAtomAtom. If atom is taken then it's not disposed from there.
        }
        set(this.newFileUsAtomAtom, undefined);
    }

    disposeActive({ get, set }: GetSet) {
        const atomToAtom = get(newManiContent.newFileUsAtomAtom);
        set(newManiContent.newFileUsAtomAtom, undefined);
        atomToAtom && set(doDisposeFileUsAtomAtom, atomToAtom); // The previuos operation will clean up the fileUsAtom if it was saved otherwise it will be undefined.
    }
};

export const newManiContent = new NewManiContent();

export const doInitNewManiContentAtom = atom(null, (get, set) => newManiContent.init({ get, set }));

/**
 * New manifest fileUs atom.
 */
export const newManiFileUsAtom = atom<FileUs | undefined>(
    (get) => {
        const newFileUsAtom = get(newManiContent.newFileUsAtomAtom);
        return newFileUsAtom && get(newFileUsAtom);
    }
);

/**
 * New manifest display name atom. This is non-reactive field to atom, just to use it in UI when new FileUs atom created.
 */
export const newManiDispNameAtom = atom<RowInputStateAtom | undefined>(
    (get) => {
        //printNewManiCtx(get);
        const fileUs = get(newManiFileUsAtom);
        const rv = fileUs?.maniAtomsAtom && pathToManiNameAtom(get(fileUs.maniAtomsAtom));
        return rv;
    },
);

function printNewManiCtxInit({ get }: GetSet) {
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

function printNewManiCtx({ get }: GetSet) {
    const newAtom = get(newManiContent.newFileUsAtomAtom);
    const atomStr = newAtom ? newAtom.toString() : null;
    console.groupCollapsed(
        `%c  newMani.ctx.mani-name access: fileUsAtom:%c${atomStr} %c`,
        'font-weight: normal; color: forestgreen',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray'
    );
    console.trace();
    console.groupEnd();
}
