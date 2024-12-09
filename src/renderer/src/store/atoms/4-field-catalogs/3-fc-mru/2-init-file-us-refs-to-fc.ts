import { atom } from "jotai";
import { Mani } from "@/store/manifest";
import { FileUsAtom, type FileUs } from "@/store/store-types";
import { type FceItem } from "../9-types";
import { getRootFceAtoms } from "../1-fc-file-atoms";
import { doPreloadEditorCtxAtom } from "../../2-right-panel";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

export const doInitFileUssRefsToFcAtom = atom(null,
    (get, set, fileUsAtoms: FileUsAtom[]) => {
        if (!fileUsAtoms) {
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fceItemsMap = fceItems.reduce(
            (acc, item) => {
                acc.set(item.beforeEdit.dbname, item);
                return acc;
            }, new Map<string, FceItem>()
        );

        fileUsAtoms.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                if (!fileUs.parsedSrc.mani) {
                    return;
                }
                
                if (fileUsHasFcRef(fileUs)) {
                    set(doPreloadEditorCtxAtom, fileUsAtom);
                }
            }
        );
    }
);

function initFileUsRefsToFc(fileUs: FileUs, fceItemsMap: FceItemsMap) {
    if (!fileUs.parsedSrc.mani) {
        return;
    }

    if (!fileUsHasFcRef(fileUs)) {
        return;
    }


    //TODO: create maniAtoms for fileUs and assign FC ref to maniAtoms

}

function fileUsHasFcRef(fileUs: FileUs): boolean {
    if (!fileUs.parsedSrc.mani) {
        return false;
    }

    const maniForms = fileUs.parsedSrc.mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.rfieldform === Mani.FORMNAME.fieldcatalog) {
                return true;
            }
        }
    }

    return false;
}

function findByDbname(fceItems: FceItem[], dbname: string): FceItem | undefined {
    return fceItems.find((item) => item.fieldValue.dbname === dbname);
}

//getRootFceAtoms

export function removeLinksToFc(fileUs: FileUs) {
    if (!fileUs.parsedSrc.mani) {
        return;
    }

    const mani = fileUs.parsedSrc.mani;
    const maniForms = mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.rfieldform === Mani.FORMNAME.fieldcatalog) {
            }
        }
    }
}
