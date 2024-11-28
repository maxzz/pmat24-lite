import { type Getter, type Setter, atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type FceCtx, filesAtom } from "@/store/atoms";

/**
 * Discard FileUs links atom
 */
export const doDiscardFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        discardFileUs(get, set, fileUs);
    }
);

/**
 * Discard all array of FileUs atom
 */
export const doDiscardAllFilesFileUsLinksAtom = atom(
    null,
    (get, set) => {
        const all = get(filesAtom);
        all.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                discardFileUs(get, set, fileUs);
            }
        );
    }
);

function discardFileUs(get: Getter, set: Setter, fileUs: FileUs) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        const login = maniAtoms[0];
        const cpass = maniAtoms[1];

        //TODO: break other links
    }

    if (fileUs.fceAtoms) {
        (fileUs.fceAtoms.fileUs as any) = undefined;
    }

    fileUs.fceAtomsRef = undefined;

    if (fileUs.fceAtoms) {
        if (fileUs.fceAtoms.viewFceCtx) {
            discardAllKeysValue(fileUs.fceAtoms.viewFceCtx);

            // (fileUs.fceAtoms.viewFceCtx.fceAtoms as any) = undefined;
            // (fileUs.fceAtoms.viewFceCtx.hasSelectedItemAtom as any) = undefined; // atom with scope
            // fileUs.fceAtoms.viewFceCtx = undefined;
        }
        fileUs.fceAtoms = undefined;
    }
}

//TODO: Omit<FceCtx, 'fceAtoms' | 'hasSelectedItemAtom'>

// type TypeWiithUndefinedMembeRecurcive<T> = {
//     [P in keyof T]: T[P] extends object ? TypeWiithUndefinedMembeRecurcive<T[P]> : T[P] | undefined;
// };

//type TypeWiithUndefinedMember<T, P extends keyof T> = Omit<T, P> & { [K in P]?: undefined };

//[P in keyof T]: T[P] | undefined;

// export function discardFceCtx(fceCtx: FceCtx) {
//     fceCtx.fceAtoms = undefined;
//     fceCtx.hasSelectedItemAtom = undefined;
// }


/**
 * just set all keys value to undefined
 */
export function discardAllKeysValue(obj: {}) {
    Object.keys(obj).forEach(
        (key) => {
            obj[key] = undefined;
        }
    );
}
