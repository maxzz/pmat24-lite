import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FceItemValue } from "@/store/atoms/4-field-catalogs";

export function resetFc(fileUs: FileUs, fileUsAtom: FileUsAtom, get: Getter, set: Setter) {
    const fceAtoms = fileUs.fceAtomsForFcFile;
    if (!fceAtoms) {
        return;
    }

    const items = get(fceAtoms.allAtom); // what about showAtom vs allAtom? OK, showAtom will be recreated, but we did not change it yet.

    items.forEach(
        (item) => {
            copyFceItemValue(item.fieldValue, item.beforeEdit);
        }
    );

    //what about deleted and added items?
    //what about if selected item is not in the shown list?

    const fceCtx = fceAtoms.viewFceCtx;
    if (!fceCtx) {
        return;
    }

    set(fceCtx.selectedIdxStoreAtom, get(fceCtx.selectedIdxStoreAtom));

    console.log('reset fc', fileUs.fileCnt.fname);
}

export function copyFceItemValue(to: FceItemValue, from: FceItemValue) {
    to.displayname = from.displayname;
    to.dbname = from.dbname;
    to.ownernote = from.ownernote;

    // valueLife
    to.valueAs = from.valueAs;
    to.value = from.value;
    to.fType = from.fType;
    to.isRef = from.isRef;
    to.isNon = from.isNon;
}
