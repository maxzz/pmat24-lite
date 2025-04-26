import { type PrimitiveAtom, type Getter, type Setter, atom } from "jotai";
import { discardValues, discardValuesDeep } from "@/utils";
import { type FileUsAtom, type FileUs, type ManiAtomsAtom } from "@/store/store-types";
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
    //printDisposeManiAtoms(fileUs, get, set);

    disposeFileUsManiAtoms(fileUs.maniAtomsAtom, get, set);
    disposeFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
    discardValues(fileUs.fceAtomsForFcFile);
    //discardValues(fileUs); // <- this was the root cause of the crash. Bottom line: don't discard atom members of fileUs

    setTimeout(() => { // <- This is not working
        discardValues(fileUs);
    }, 100);
}

function discardFileUsTopLevel(fileUs: FileUs, get: Getter, set: Setter) {
    const savedManiAtoms = fileUs.maniAtomsAtom;
    const savedRawCpassAtom = fileUs.rawCpassAtom;
    discardValues(fileUs);
    fileUs.maniAtomsAtom = savedManiAtoms; // should be atom(null)
    fileUs.rawCpassAtom = savedRawCpassAtom; // should be atom(null)
}

/**
 * This is used for reset and save operations
 */
export function disposeFileUsManiAtoms(maniAtomsAtom: ManiAtomsAtom, get: Getter, set: Setter) {
    let maniAtoms = get(maniAtomsAtom) as Writeable<ManiAtoms> | undefined;
    if (maniAtoms) {
        disposeFormAtoms(maniAtoms[0]);
        disposeFormAtoms(maniAtoms[1]);
        maniAtoms[0] = undefined;
        maniAtoms[1] = undefined;
        set(maniAtomsAtom, null);
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
    const fileUs = fileUsAtom ? get(fileUsAtom) : undefined;

    console.groupCollapsed(`%c🏀🏀🏀🏀🏀🏀 dispose fileUsAtom:%c${fileUsAtom ? fileUsAtom.toString(): 'null'}, %cuuid:${fileUs?.fileCnt?.unid}`,
        fileUsAtom ? 'font-weight: normal; color: gray' : 'font-weight: normal; color: red',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        { fileUs }
    );
    console.trace();
    console.groupEnd();
}

function printDisposeManiAtoms(fileUs: FileUs | undefined, get: Getter, set: Setter) {
    if (!fileUs) {
        console.trace('🏀🏀🏀 dispose maniAtoms: null');
        return;
    }

    console.groupCollapsed(`🏀 dispose maniAtoms: uuid:${fileUs.fileCnt.unid}`, { fileUs });
    console.trace();
    console.groupEnd();
}
