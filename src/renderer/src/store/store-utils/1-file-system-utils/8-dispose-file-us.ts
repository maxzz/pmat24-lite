import { type Getter, type Setter, atom } from "jotai";
import { discardValues, discardValuesDeep } from "@/utils";
import { FileUsAtom, type FileUs } from "@/store/store-types";
import { type ManiAtoms, type AnyFormAtoms, type FceCtx, filesAtom } from "@/store/1-atoms";

/**
 * Discard all array of FileUs atom
 */
export const doDisposeAllFilesFileUsLinksAtom = atom(
    null,
    (get, set) => {
        const all = get(filesAtom);
        all.forEach(
            (fileUsAtom) => set(doDisposeFileUsAtomAtom, fileUsAtom)
        );
    }
);

/**
 * Discard FileUs links atom
 */
export const doDisposeFileUsAtomAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom | undefined) => {
        printDisposeFileUsAtom(fileUsAtom, get, set);

        fileUsAtom && disposeFileUs(get(fileUsAtom), get, set);
    }
);

function disposeFileUs(fileUs: FileUs, get: Getter, set: Setter) {
    disposeFileUsManiAtoms(fileUs, get, set);
    disposeFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
    discardValues(fileUs.fceAtomsForFcFile);
    discardValues(fileUs);
}

/**
 * This is used for reset and save operations
 */
export function disposeFileUsManiAtoms(fileUs: FileUs, get: Getter, set: Setter) {
    printDisposeManiAtoms(fileUs, get, set);

    let maniAtoms = get(fileUs.maniAtomsAtom) as Writeable<ManiAtoms> | undefined;
    if (maniAtoms) {
        disposeFormAtoms(maniAtoms[0]);
        disposeFormAtoms(maniAtoms[1]);
        maniAtoms[0] = undefined;
        maniAtoms[1] = undefined;
    }
}

function disposeFormAtoms(formAtoms: AnyFormAtoms | undefined) {
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

export function disposeFceCtx(fceCtx: FceCtx | undefined | null) {
    discardValues(fceCtx);
}

function printDisposeFileUsAtom(fileUsAtom: FileUsAtom | undefined, get: Getter, set: Setter) {
    if (!fileUsAtom) {
        console.trace('🏀🏀🏀🏀🏀🏀 disposeFileUsAtom: null atom');
        return;
    }

    const fileUs = get(fileUsAtom);
    if (!fileUs) {
        console.trace(`🏀🏀🏀🏀🏀🏀 disposeFileUsAtom: ${fileUsAtom.toString()}, fileUs=null`);
        return;
    }
    
    console.trace(`🏀🏀🏀🏀🏀🏀 doDisposeFileUsAtom: ${fileUsAtom.toString()}, uuid:${fileUs.fileCnt.unid}`, { fileUs });
}

function printDisposeManiAtoms(fileUs: FileUs | undefined, get: Getter, set: Setter) {
    if (!fileUs) {
        console.trace('🏀🏀🏀 disposeManiAtoms: null');
        return;
    }

    console.trace(`🏀🏀🏀 disposeManiAtoms: ${fileUs.fileCnt.unid}`, { fileUs });
}
