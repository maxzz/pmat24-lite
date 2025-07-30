import { atom } from "jotai";
import { discardValues, discardValuesDeep } from "@/utils";
import { type FileUsAtom, type ManiAtomsAtom } from "@/store/store-types";
import { type ManiAtoms, type AnyFormCtx, type FceCtx, filesAtom } from "@/store/1-atoms";

/**
 * Discard all array of FileUs atom
 */
export const doDisposeAllFilesAtomAtom = atom(
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
        //printDisposeFileUsAtom(fileUsAtom, { get });

        if (!fileUsAtom) {
            return;
        }

        const fileUs = get(fileUsAtom);

        disposeFileUsManiAtoms(get(fileUs.maniAtomsAtom));
        set(fileUs.maniAtomsAtom, null);

        disposeFceCtx(fileUs.fceAtomsForFcFile?.viewFceCtx);
        discardValues(fileUs.fceAtomsForFcFile);
        discardValues(fileUs);
    }
);

/**
 * This is used for reset and save operations
 */
export function disposeFileUsManiAtoms(maniAtoms: ManiAtoms | null) {
    let localManiAtoms = maniAtoms as Writeable<ManiAtoms> | null;
    if (localManiAtoms) {
        disposeFormCtx(localManiAtoms[0]);
        disposeFormCtx(localManiAtoms[1]);
        localManiAtoms[0] = undefined;
        localManiAtoms[1] = undefined;
    }
}

function disposeFormCtx(formAtoms: AnyFormCtx | undefined) {
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

function printDisposeFileUsAtom(fileUsAtom: FileUsAtom | undefined, { get }: GetOnly) {
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

export function printDisposeManiAtomsAtom(maniAtomsAtom: ManiAtomsAtom | undefined) {
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
