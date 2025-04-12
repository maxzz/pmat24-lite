import { type Getter, type Setter, atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type FceCtx, filesAtom, ManiAtoms } from "@/store/1-atoms";

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
                discardFileUs(fileUs, get, set);
            }
        );
    }
);

/**
 * Discard FileUs links atom
 */
export const doDiscardFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        discardFileUs(fileUs, get, set);
    }
);

function discardFileUs(fileUs: FileUs, get: Getter, set: Setter) {
    discardFileUsManiAtoms(fileUs, get, set);
    discardFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
    discardAllKeysValue(fileUs.fceAtomsForFcFile);
    discardAllKeysValue(fileUs);
}

/**
 * This is used for reset and save operations
 */
export function discardFileUsManiAtoms(fileUs: FileUs, get: Getter, set: Setter) {
    let maniAtoms = get(fileUs.maniAtomsAtom) as Writeable<ManiAtoms> | undefined;
    if (maniAtoms) {
        discardAllKeysValue(maniAtoms[0]);
        discardAllKeysValue(maniAtoms[1]);
        maniAtoms[0] = undefined;
        maniAtoms[1] = undefined;
    }
}

export function discardFceCtx(fceCtx: FceCtx | undefined | null) {
    discardAllKeysValue(fceCtx);
}

/**
 * just set all keys value to undefined at the top level
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

export function setDeepUndefined(obj: {} | undefined | null) {
    if (!obj) {
        return;
    }
    for (const key in obj) {
        if (!!obj && typeof obj[key] === 'object') {
            setDeepUndefined(obj[key]);
        } else {
            obj[key] = undefined;
        }
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
