import { atom } from "jotai";
import { Mani } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type FceItem } from "../9-types";
import { getRootFceAtoms } from "../1-fc-file-atoms";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

export const doInitFileUssRefsToFcAtom = atom(null,
    (get, set, fileUs: FileUs[]) => {
        if (!fileUs) {
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fceItemsMap = fceItems.reduce(
            (acc, item) => {
                acc.set(item.beforeEdit.dbname, item);
                return acc;
            }, new Map<string, FceItem>()
        );

        fileUs.forEach(
            (fileUs) => initFileUsRefsToFc(fileUs, fceItemsMap)
        );
    }
);

function initFileUsRefsToFc(fileUs: FileUs, fceItemsMap: FceItemsMap) {
    if (!fileUs.parsedSrc.mani) {
        return;
    }

    const mani = fileUs.parsedSrc.mani;
    const maniForms = mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.rfieldform === Mani.FORMNAME.fieldcatalog) {
                console.log('maniFormField.dbname', maniFormField.dbname);
            }
        }
    }
}

// function findDbname(fceAtoms: FceAtoms, dbname: string): FceItem | undefined {
//     return fceAtoms.allAtom.find((item) => item.fieldValue.dbname === dbname);
// }

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
