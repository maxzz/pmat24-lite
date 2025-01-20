import { type Getter, type Setter, atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type FceCtx, filesAtom } from "@/store/1-atoms";

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

    discardFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
    discardAllKeysValue(fileUs.fceAtomsForFcFile);
    discardAllKeysValue(fileUs);
}

export function discardFceCtx(fceCtx: FceCtx | undefined | null) {
    discardAllKeysValue(fceCtx);
}

/**
 * just set all keys value to undefined
 */
export function discardAllKeysValue(obj: {} | undefined | null) {
    if (!obj) {
        return;
    }
    Object.keys(obj).forEach(
        (key) => {
            obj[key] = undefined;
        }
    );
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
