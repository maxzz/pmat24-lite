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

        if (!fileUsAtom) {
            return;
        }

        const fileUs = get(fileUsAtom);

        disposeFileUsManiAtoms(get(fileUs.maniAtomsAtom));
        set(fileUs.maniAtomsAtom, null);

        disposeFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
        discardValues(fileUs.fceAtomsForFcFile);
        //discardValues(fileUs); // <- this was the root cause of the crash. Bottom line: don't discard atom members of fileUs

        setTimeout(() => { // <- This is not working
            discardValues(fileUs);
        }, 100);
    }
);

function discardFileUsTopLevel(fileUs: FileUs, get: Getter, set: Setter) {
    const savedManiAtoms = fileUs.maniAtomsAtom;
    const savedRawCpassAtom = fileUs.rawCpassAtom;
    discardValues(fileUs);
    fileUs.maniAtomsAtom = savedManiAtoms; // should be atom(null)
    fileUs.rawCpassAtom = savedRawCpassAtom; // should be atom(null) // TODO: it should be not cpass but mani name atom
}

/**
 * This is used for reset and save operations
 */
export function disposeFileUsManiAtoms(maniAtoms: ManiAtoms | null) {
    let localManiAtoms = maniAtoms as Writeable<ManiAtoms> | null;
    if (localManiAtoms) {
        disposeFormAtoms(localManiAtoms[0]);
        disposeFormAtoms(localManiAtoms[1]);
        localManiAtoms[0] = undefined;
        localManiAtoms[1] = undefined;
    }
}

/**
 * This is used for reset and save operations
 */
export function disposeFileUsManiAtoms2(maniAtomsAtom: ManiAtomsAtom, get: Getter, set: Setter) {
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
    const fileUsStr = fileUsAtom ? fileUsAtom.toString() : 'null';
    const maniStr = fileUs?.maniAtomsAtom ? fileUs.maniAtomsAtom.toString() : 'null';

    console.groupCollapsed(`%c🏀🏀🏀 dispose fileUsAtom:%c${fileUsStr}, %cmaniAtomsAtom:%c${maniStr}`,
        fileUsAtom ? 'font-weight: normal; color: gray' : 'font-weight: normal; color: red',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        { fileUs }
    );
    console.trace();
    console.groupEnd();
}

export function printDisposeManiAtomsAtom(maniAtomsAtom: ManiAtomsAtom | undefined, get: Getter, set: Setter) {
    const atomStr = maniAtomsAtom ? maniAtomsAtom.toString() : 'null';
    console.groupCollapsed(
        `%c🏀 dispose maniAtomsAtom:%c ${atomStr}%c`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}
