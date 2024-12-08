import { type FileUs } from "@/store/store-types";
import { FceAtoms, FceItem } from "../9-types";

export function initFileUssRefsToFc(fileUs: FileUs[]) {
    fileUs.forEach((fileUs) => initFileUsRefsToFc(fileUs));
}

function initFileUsRefsToFc(fileUs: FileUs) {
    if (!fileUs.parsedSrc.mani) {
        return;
    }

    const mani = fileUs.parsedSrc.mani;
    const maniForms = mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.dbname) {
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
            if (maniFormField.dbname) {
            }
        }
    }
}
