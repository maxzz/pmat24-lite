import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FceItemValue } from "@/store/atoms/4-field-catalogs";

export function resetFc(fileUs: FileUs, fileUsAtom: FileUsAtom, get: Getter, set: Setter) {
    const fceAtoms = fileUs.fceAtomsForFcFile;
    if (!fceAtoms) {
        return;
    }

    const items = get(fceAtoms.allAtom);

    items.forEach(
        (item) => {
            copyFceItemValue(item.fieldValue, item.beforeEdit);
        }
    );

    set(fileUsAtom, fileUs);

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
