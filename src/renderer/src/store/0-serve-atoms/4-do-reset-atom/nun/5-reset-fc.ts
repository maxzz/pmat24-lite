import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FceItemValue } from "@/store/3-field-catalog-atoms";

// Notes:
// The reset operation is not a good idea for the main field catalog:
//  * What about showAtom vs allAtom? OK, showAtom will be recreated, but we did not change it yet.
//      * We need to get items from file fcat.names
//      * We need to get selected item uuid before udpating items
//  * What about deleted and added items?
//  * What about if selected item is not in the shown list?

export function resetFc(fileUs: FileUs, fileUsAtom: FileUsAtom, get: Getter, set: Setter) {
    const fceAtoms = fileUs.fceAtomsForFcFile;
    if (!fceAtoms) {
        return;
    }

    const items = get(fceAtoms.allAtom); // what about showAtom vs allAtom? OK, showAtom will be recreated, but we did not change it yet.

    // we need to get items from file fcat.names
    // we need to get selected item uuid before udpating items

    items.forEach(
        (item) => {
            copyFceItemValue(item.fieldValue, item.beforeEdit);
        }
    );

    // what about deleted and added items?
    // what about if selected item is not in the shown list?

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
