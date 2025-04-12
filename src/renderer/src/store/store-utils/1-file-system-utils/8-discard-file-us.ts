import { type Getter, type Setter, atom } from "jotai";
import { discardValues, discardValuesDeep } from "@/utils";
import { type FileUs } from "@/store/store-types";
import { type ManiAtoms, type AnyFormAtoms, type FceCtx, filesAtom } from "@/store/1-atoms";

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
    discardValues(fileUs.fceAtomsForFcFile);
    discardValues(fileUs);
}

/**
 * This is used for reset and save operations
 */
export function discardFileUsManiAtoms(fileUs: FileUs, get: Getter, set: Setter) {
    let maniAtoms = get(fileUs.maniAtomsAtom) as Writeable<ManiAtoms> | undefined;
    if (maniAtoms) {
        discardFormAtoms(maniAtoms[0]);
        discardFormAtoms(maniAtoms[1]);
        maniAtoms[0] = undefined;
        maniAtoms[1] = undefined;
    }
}

function discardFormAtoms(formAtoms: AnyFormAtoms | undefined) {
    if (formAtoms) {
        discardValues(formAtoms.normal);
        discardValues(formAtoms.manual);
        discardValues(formAtoms.options);
        formAtoms.normal = undefined;
        formAtoms.manual = undefined;
        (formAtoms.options as any) = undefined;
        (formAtoms.fileUsCtx as any) = undefined; // Don't clean up file handles
    }
}

export function discardFceCtx(fceCtx: FceCtx | undefined | null) {
    discardValues(fceCtx);
}
