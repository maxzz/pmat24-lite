import { atom } from "jotai";
import { discardValues, discardValuesDeep } from "@/utils";
import { type FileUsAtom, type ManiAtomsAtom } from "@/store/store-types";
import { type ManiAtoms, type AnyFormCtx } from "@/store/1-file-mani-atoms";
import { type FceCtx } from "@/components/4-dialogs/4-dlg-field-catalog/a-field-catalog-atoms";
import { filesAtom } from "@/store/5-1-open-files";
import { getDropdownNamesAtom } from "@/store/1-file-mani-atoms/4-cpass-to-login-links/8-reactive-login-names";

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
        //print_DisposeFileUsAtom(fileUsAtom, { get });

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

        removeFormCtxFamilyEntry(formAtoms);

        //(formAtoms.fileUsCtx as any) = undefined; // Don't clean up file handles
        // Keep `fileUsCtx` intact. Disposing it causes downstream code to crash with
        // `Cannot read properties of undefined (reading 'formIdx')` during folder close/switch.
    }
}

/**
 * Evict the `getDropdownNamesAtom` family entries keyed by the (now stale) per-form `fileUsCtx`,
 * without otherwise disposing the form contexts.
 *
 * Used by the save/reset path, which replaces `maniAtoms` with freshly created ones but must NOT
 * run the full `disposeFileUsManiAtoms` (its `discardValues` nulling historically crashed
 * components still rendering the previous atoms). `atomFamily.remove` is safe to call at any time:
 * it only drops the cache entry, it does not unmount or destroy the live atom, so any component
 * still subscribed keeps working and simply re-creates a fresh entry on its next render.
 */
export function removeManiAtomsFamilyEntries(maniAtoms: ManiAtoms | null) {
    if (!maniAtoms) {
        return;
    }
    removeFormCtxFamilyEntry(maniAtoms[0]);
    removeFormCtxFamilyEntry(maniAtoms[1]);
}

function removeFormCtxFamilyEntry(formAtoms: AnyFormCtx | undefined) {
    // Drop the cached derived atom keyed by this `fileUsCtx` so the family map does not retain
    // stale `fileUsCtx`/`fileUs` graphs across open/close/save churn. The `fileUsCtx` object
    // itself is left intact.
    if (formAtoms?.fileUsCtx) {
        getDropdownNamesAtom.remove(formAtoms.fileUsCtx);
    }
}

export function disposeFceCtx(fceCtx: FceCtx | undefined | null) {
    discardValues(fceCtx);
}

function print_DisposeFileUsAtom(fileUsAtom: FileUsAtom | undefined, { get }: GetOnly) {
    const fileUs = fileUsAtom ? get(fileUsAtom) : undefined;
    const fileUsStr = fileUsAtom ? fileUsAtom.toString() : 'null';
    const maniStr = fileUs?.maniAtomsAtom ? fileUs.maniAtomsAtom.toString() : 'null';

    console.groupCollapsed(`%c������ dispose fileUsAtom:%c${fileUsStr}, %cmaniAtomsAtom:%c${maniStr}`,
        fileUsAtom ? 'font-weight: normal; color: gray' : 'font-weight: normal; color: red',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        { fileUs }
    );
    console.trace();
    console.groupEnd();
}

export function print_DisposeManiAtomsAtom(maniAtomsAtom: ManiAtomsAtom | undefined) {
    const atomStr = maniAtomsAtom ? maniAtomsAtom.toString() : 'null';
    console.groupCollapsed(
        `%c�� dispose maniAtomsAtom:%c ${atomStr}%c`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}
